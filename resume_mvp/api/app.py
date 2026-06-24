from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import io
import json
import os

from ..ingest.parsers import parse_resume
from ..ingest.chunker import split_text_into_chunks
from ..extractor import extract_sections
from ..analysis.ats import ATSAnalyzer
from ..analysis.scorer import ResumeScorer
from ..api.export import PDFExporter

app = FastAPI(title="Resume Analyzer MVP")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "*"  # Allow all origins for development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for resumes for MVP
RESUMES = {}
CONVERSATIONS = {}

# Initialize heavier RAG/LLM services only when explicitly enabled.
# Upload, ATS analysis, score, JD match, and JSON export do not need embeddings.
embedder = None
vectorstore = None
rag = None
editor = None

if os.getenv("RESUME_MVP_ENABLE_RAG") == "1":
    try:
        from ..embeddings.embedder import Embedder
        from ..vectorstore.faiss_adapter import FaissAdapter
        from ..llm.llm_client import LLMClient
        from ..llm.rag import RAG
        from ..llm.editor import ResumeEditor

        embedder = Embedder()
        vectorstore = FaissAdapter(dim=384)
        llm_client = LLMClient()
        rag = RAG(vectorstore, embedder, llm_client)
        editor = ResumeEditor(llm_client)
    except Exception as e:
        print(f"Warning: Some services not initialized: {e}")

ats_analyzer = ATSAnalyzer()
scorer = ResumeScorer()
pdf_exporter = PDFExporter() if PDFExporter else None


class ChatRequest(BaseModel):
    resume_id: str
    message: str


class ATSRequest(BaseModel):
    resume_id: str


class JDMatchRequest(BaseModel):
    resume_id: str
    jd_text: str


class EditRequest(BaseModel):
    resume_id: str
    section: str
    instruction: str


@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """Upload resume and extract sections."""
    if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"]:
        raise HTTPException(status_code=400, detail="Unsupported file type (PDF/DOCX only)")

    try:
        contents = await file.read()
        bio = io.BytesIO(contents)
        bio.filename = file.filename
        text = parse_resume(bio)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Parse error: {str(e)}")

    # Extract sections
    resume_json = extract_sections(text)
    resume_id = str(uuid.uuid4())
    
    # Store resume
    RESUMES[resume_id] = {
        "id": resume_id,
        "filename": file.filename,
        "resume": resume_json
    }
    
    # Initialize conversation
    CONVERSATIONS[resume_id] = []
    
    # Generate embeddings and store if embedder available
    if embedder and vectorstore:
        try:
            chunks = split_text_into_chunks(text)
            embeddings = embedder.encode(chunks)
            ids = [f"{resume_id}_{i}" for i in range(len(chunks))]
            metadata = [{"text": chunk, "source": file.filename} for chunk in chunks]
            vectorstore.upsert(ids=ids, vectors=embeddings, metadata=metadata, namespace=resume_id)
        except Exception as e:
            print(f"Warning: Could not store embeddings: {e}")
    
    return JSONResponse({
        "resume_id": resume_id,
        "filename": file.filename,
        "resume": resume_json,
        "message": "Resume uploaded and processed"
    })


@app.post("/chat")
async def chat(request: ChatRequest):
    """Chat about resume improvements."""
    if request.resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    resume = RESUMES[request.resume_id]["resume"]
    
    # Store in conversation history
    CONVERSATIONS[request.resume_id].append({"role": "user", "content": request.message})
    
    # Try to use RAG if available
    if rag:
        try:
            result = rag.answer_for_resume(request.resume_id, request.message)
            answer = result.get("answer", "")
        except Exception as e:
            answer = f"I can help with: improve summary, rewrite sections, ATS analysis. Error: {str(e)}"
    else:
        # Fallback responses
        msg_lower = request.message.lower()
        if "improve" in msg_lower and "summary" in msg_lower:
            answer = f"Current summary:\n{resume.get('summary', '')}\n\nConsider adding: key achievements, years of experience, expertise areas."
        elif "rewrite" in msg_lower:
            answer = "I can help rewrite any section. Which section would you like to improve? (summary, experience, projects)"
        elif "ats" in msg_lower:
            answer = "Run the /ats_analyze endpoint for detailed ATS feedback."
        elif "match" in msg_lower:
            answer = "Use /match_jd endpoint to compare against a job description."
        else:
            answer = "I can help with: improve summary, rewrite sections, ATS analysis, JD matching. What would you like?"
    
    CONVERSATIONS[request.resume_id].append({"role": "assistant", "content": answer})
    
    return JSONResponse({
        "answer": answer,
        "conversation": CONVERSATIONS[request.resume_id][-6:]  # Last 3 exchanges
    })


@app.post("/ats_analyze")
async def ats_analyze(request: ATSRequest):
    """Analyze resume for ATS compliance."""
    if request.resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    resume = RESUMES[request.resume_id]["resume"]
    report = ats_analyzer.analyze(resume)
    
    return JSONResponse(report)


@app.post("/score")
async def score_resume(request: ATSRequest):
    """Calculate resume score."""
    if request.resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    resume = RESUMES[request.resume_id]["resume"]
    ats_report = ats_analyzer.analyze(resume)
    score_result = scorer.score(resume, ats_report)
    
    return JSONResponse(score_result)


@app.post("/match_jd")
async def match_jd(request: JDMatchRequest):
    """Match resume against job description."""
    if request.resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    resume = RESUMES[request.resume_id]["resume"]
    result = ats_analyzer.match_jd(resume, request.jd_text)
    
    return JSONResponse(result)


@app.post("/improve")
async def suggest_improvements(request: EditRequest):
    """Get improvement suggestions for a section."""
    if request.resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if not editor:
        raise HTTPException(status_code=503, detail="LLM service not available")
    
    resume = RESUMES[request.resume_id]["resume"]
    result = editor.rewrite_section(resume, request.section, request.instruction)
    
    return JSONResponse(result)


@app.post("/apply_patch")
async def apply_patch(resume_id: str, patch: dict):
    """Apply an edit patch to resume."""
    if resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if not editor:
        raise HTTPException(status_code=503, detail="Editor service not available")
    
    resume = RESUMES[resume_id]["resume"]
    result = editor.apply_patch(resume, patch)
    
    if result.get("success"):
        RESUMES[resume_id]["resume"] = result["resume"]
    
    return JSONResponse(result)


@app.get("/export/{resume_id}.pdf")
async def export_pdf(resume_id: str):
    """Export resume as PDF."""
    if resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if not pdf_exporter:
        raise HTTPException(status_code=503, detail="PDF export not available")
    
    resume = RESUMES[resume_id]["resume"]
    
    try:
        pdf_bytes = pdf_exporter.render_pdf(resume, filename=f"{RESUMES[resume_id]['filename']}.pdf")
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=resume.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF export failed: {str(e)}")


@app.get("/export/{resume_id}.json")
async def export_json(resume_id: str):
    """Export resume as JSON."""
    if resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    resume = RESUMES[resume_id]["resume"]
    return JSONResponse(resume)


@app.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    """Get resume data."""
    if resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return JSONResponse({
        "id": resume_id,
        "filename": RESUMES[resume_id]["filename"],
        "resume": RESUMES[resume_id]["resume"]
    })


@app.get("/health")
async def health():
    """Health check."""
    return JSONResponse({
        "status": "healthy",
        "services": {
            "embedder": "available" if embedder else "unavailable",
            "llm": "available" if rag else "unavailable",
            "pdf_exporter": "available" if pdf_exporter else "unavailable"
        }
    })
