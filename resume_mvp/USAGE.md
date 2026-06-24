# Resume Analyzer MVP - Setup & Usage Guide

## Quick Start

### 1. Install Dependencies

```bash
cd SkillWyn
pip install -r resume_mvp/requirements.txt
```

### 2. Set Environment Variables (Optional for Groq/Pinecone)

```bash
# For Groq LLM (recommended for MVP)
export GROQ_API_KEY="your_groq_api_key"

# For Pinecone (optional; uses FAISS for local dev by default)
export PINECONE_API_KEY="your_pinecone_api_key"
```

### 3. Run API Server

```bash
uvicorn resume_mvp.api.app:app --reload --port 8000
```

Server starts at `http://localhost:8000`

## API Endpoints

### Upload Resume
```bash
curl -X POST "http://localhost:8000/upload" \
  -F "file=@resume.pdf"
```
Response:
```json
{
  "resume_id": "uuid",
  "filename": "resume.pdf",
  "resume": {
    "summary": "...",
    "experience": "...",
    "projects": "...",
    "skills": ["Python", "Java"],
    "education": "..."
  }
}
```

### Chat About Resume
```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "uuid",
    "message": "Improve my professional summary"
  }'
```

### ATS Analysis
```bash
curl -X POST "http://localhost:8000/ats_analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "uuid"
  }'
```

### Resume Score
```bash
curl -X POST "http://localhost:8000/score" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "uuid"
  }'
```

### Match Against Job Description
```bash
curl -X POST "http://localhost:8000/match_jd" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "uuid",
    "jd_text": "Looking for Python developer with 5+ years experience..."
  }'
```

### Export as PDF
```bash
curl -X GET "http://localhost:8000/export/uuid.pdf" \
  -o resume.pdf
```

### Export as JSON
```bash
curl -X GET "http://localhost:8000/export/uuid.json"
```

### Get Resume Data
```bash
curl -X GET "http://localhost:8000/resume/uuid"
```

### Health Check
```bash
curl -X GET "http://localhost:8000/health"
```

## Features Implemented

### 1. Upload & Parsing ✅
- PDF parsing (PyMuPDF)
- DOCX parsing (python-docx)
- OCR fallback (Tesseract)

### 2. Section Extraction ✅
- Summary
- Experience
- Projects
- Skills
- Education

### 3. Vector Storage ✅
- Local FAISS (dev default)
- Pinecone adapter (production)
- Pluggable interface

### 4. Embeddings ✅
- Sentence Transformers (all-MiniLM-L6-v2)
- 384-dimensional vectors
- Pluggable embedder interface

### 5. LLM Integration ✅
- Groq API (llama-3.1-8b-instant)
- Conversational interface
- OpenAI-compatible API

### 6. RAG (Retrieval-Augmented Generation) ✅
- Single-resume retrieval
- Context-aware QA
- Source attribution

### 7. ATS Analysis ✅
- Completeness checks
- Formatting analysis
- Keyword coverage
- Contact info validation

### 8. Resume Scoring ✅
- Completeness (25 points)
- ATS Friendliness (20 points)
- Content Quality (30 points)
- Formatting (15 points)
- Keyword Coverage (10 points)

### 9. Conversational Editing ✅
- Suggest improvements
- Rewrite sections
- Apply JSON patches
- Make ATS-friendly

### 10. Export ✅
- PDF export (ReportLab)
- JSON export
- Download support

## Running Tests

```bash
cd SkillWyn
pytest resume_mvp/tests/test_core.py -v
```

## Architecture

```
resume_mvp/
├── ingest/              # Parsing & extraction
│   ├── parsers.py       # PDF, DOCX, OCR
│   ├── chunker.py       # Text chunking
│   └── extractor.py     # Section extraction
├── embeddings/          # Embeddings
│   └── embedder.py      # SentenceTransformer wrapper
├── vectorstore/         # Vector DB adapters
│   ├── store_interface.py
│   ├── faiss_adapter.py
│   └── pinecone_adapter.py
├── llm/                 # LLM & RAG
│   ├── llm_client.py    # Groq/OpenAI client
│   ├── rag.py           # Retrieval & QA
│   └── editor.py        # Conversational editor
├── analysis/            # ATS & Scoring
│   ├── ats.py           # ATS compliance
│   └── scorer.py        # Resume scoring
├── api/                 # FastAPI
│   ├── app.py           # Main endpoints
│   └── export.py        # PDF/JSON export
├── schema/              # Data models
│   └── resume_schema.py
├── tests/               # Unit tests
│   └── test_core.py
└── config.py            # Configuration
```

## Common Use Cases

### 1. Improve Summary
```python
message = "Improve my professional summary to be more impactful"
# Chat endpoint will use LLM to suggest improvements
```

### 2. ATS Optimization
```python
# Call /ats_analyze endpoint to get ATS report
# Then call /improve endpoint for specific section
```

### 3. Job Matching
```python
jd = "Looking for Python engineer with Django, AWS, and 5+ years experience"
# Call /match_jd to see how well resume matches
```

### 4. Resume PDF Export
```python
# Call /export/{resume_id}.pdf to download formatted PDF
```

## Performance Notes

- **Local dev**: Uses FAISS (no API calls needed)
- **Production**: Use Pinecone + Groq for reliability
- **Embeddings**: ~384 dims, inference time ~100ms
- **LLM calls**: Groq ~1-2 seconds per call

## Troubleshooting

### LLM Not Available
- Check `GROQ_API_KEY` environment variable
- Verify Groq API key is valid
- Check `/health` endpoint

### PDF Export Failing
- Install `reportlab`: `pip install reportlab`
- Check PDF content is valid

### Embeddings Not Working
- Install `sentence-transformers`: `pip install sentence-transformers`
- First download may take time (~400MB model)

## Future Enhancements

1. Multi-language support
2. Advanced NER for section extraction
3. Cover letter generation
4. LinkedIn profile optimization
5. Interview prep suggestions
6. Salary negotiation insights
7. Career path recommendations
