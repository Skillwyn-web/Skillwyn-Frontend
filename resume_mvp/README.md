# Resume Analyzer MVP 🚀

A candidate-facing AI Resume Analyzer with section extraction, ATS analysis, conversational editing, and PDF export.

## ✨ Features

- **Upload & Parse**: PDF, DOCX, or image OCR
- **Section Extraction**: Summary, Experience, Projects, Skills, Education
- **AI Chat**: Conversational resume improvements powered by Groq/Llama
- **ATS Analysis**: Compliance checks and scoring
- **Resume Score**: Multi-factor scoring (completeness, quality, ATS, formatting, keywords)
- **JD Matching**: Compare resume against job descriptions
- **Smart Editing**: LLM-generated suggestions with JSON patch support
- **Export**: PDF and JSON formats
- **RAG Retrieval**: Context-aware Q&A using embeddings (FAISS/Pinecone)

## 🏗️ Architecture

```
Resume Upload → Parse → Extract Sections → AI Analysis
     ↓
   Store in Vector DB (FAISS/Pinecone)
     ↓
RAG Retrieval ← Embed Query ← User Chat
     ↓
LLM Response + Edit Suggestions
     ↓
Export PDF/JSON
```

## 📦 Tech Stack

- **Parsing**: PyMuPDF, python-docx, Tesseract OCR
- **Embeddings**: Sentence Transformers (all-MiniLM-L6-v2)
- **Vector DB**: FAISS (local) / Pinecone (cloud)
- **LLM**: Groq (llama-3.1-8b-instant)
- **API**: FastAPI
- **Export**: ReportLab (PDF)

## 🚀 Quick Start

### 1. Install

```bash
pip install -r resume_mvp/requirements.txt
```

### 2. Set Environment Variables (optional)

```bash
export GROQ_API_KEY="your_groq_key"
export PINECONE_API_KEY="your_pinecone_key"  # optional
```

### 3. Run API

```bash
uvicorn resume_mvp.api.app:app --reload
```

Server at `http://localhost:8000`

### 4. Upload & Analyze

```bash
curl -X POST "http://localhost:8000/upload" \
  -F "file=@resume.pdf"
```

See [USAGE.md](USAGE.md) for complete API documentation.

## 📚 Project Structure

```
resume_mvp/
├── ingest/                # Parsing & extraction
│   ├── parsers.py         # PDF/DOCX/OCR parsing
│   ├── chunker.py         # Text chunking
│   └── extractor.py       # Section extraction
├── embeddings/            # Embedding generation
│   └── embedder.py        # SentenceTransformer wrapper
├── vectorstore/           # Vector storage adapters
│   ├── store_interface.py # Abstract interface
│   ├── faiss_adapter.py   # Local FAISS
│   └── pinecone_adapter.py # Cloud Pinecone
├── llm/                   # LLM & RAG
│   ├── llm_client.py      # Groq/OpenAI client
│   ├── rag.py             # Retrieval & QA
│   └── editor.py          # Conversational editor
├── analysis/              # ATS & scoring
│   ├── ats.py             # ATS compliance
│   └── scorer.py          # Resume scoring
├── api/                   # FastAPI endpoints
│   ├── app.py             # Main application
│   └── export.py          # PDF/JSON export
├── schema/                # Data models
│   └── resume_schema.py   # Resume dataclass
├── tests/                 # Unit tests
│   └── test_core.py       # Core tests
├── config.py              # Configuration
├── demo.py                # Demo script
├── requirements.txt       # Dependencies
├── Dockerfile             # Docker container
├── docker-compose.yml     # Docker Compose
└── USAGE.md               # API documentation
```

## 🔧 API Endpoints

### Resume Management
- `POST /upload` - Upload and parse resume
- `GET /resume/{resume_id}` - Get resume data
- `GET /export/{resume_id}.pdf` - Export as PDF
- `GET /export/{resume_id}.json` - Export as JSON

### Analysis & Feedback
- `POST /ats_analyze` - Run ATS compliance checks
- `POST /score` - Calculate resume score
- `POST /match_jd` - Match against job description

### Conversation & Editing
- `POST /chat` - Chat about improvements
- `POST /improve` - Get improvement suggestions
- `POST /apply_patch` - Apply edit patches

### Health
- `GET /health` - Service status

## 🧪 Testing

```bash
pytest resume_mvp/tests/test_core.py -v
```

## 🐳 Docker

### Build & Run

```bash
docker-compose up --build
```

## 📝 Example Usage

### Upload Resume
```python
curl -X POST http://localhost:8000/upload \
  -F "file=@my_resume.pdf"
```

### Chat for Improvements
```python
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "uuid-here",
    "message": "How can I improve my experience section?"
  }'
```

### Get ATS Score
```python
curl -X POST http://localhost:8000/ats_analyze \
  -H "Content-Type: application/json" \
  -d '{"resume_id": "uuid-here"}'
```

### Match Job Description
```python
curl -X POST http://localhost:8000/match_jd \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "uuid-here",
    "jd_text": "Looking for Python engineer with AWS experience..."
  }'
```

## 🎯 Features Implementation Status

- ✅ PDF/DOCX/OCR Parsing
- ✅ Section Extraction
- ✅ Text Chunking & Embeddings
- ✅ Vector Storage (FAISS + Pinecone)
- ✅ LLM Integration (Groq)
- ✅ RAG Retrieval & QA
- ✅ ATS Analysis
- ✅ Resume Scoring
- ✅ Conversational Editing
- ✅ PDF Export
- ✅ FastAPI Endpoints
- ✅ Unit Tests
- ✅ Docker Support

## 🚀 Performance

- Local FAISS: No external API calls
- Embedding inference: ~100ms
- LLM response: ~1-2 seconds (Groq)
- PDF generation: ~500ms

## 🔐 Privacy & Security

- By default uses local FAISS (no cloud uploads)
- Resume data stored in-memory (MVP)
- Optional Pinecone for production
- All LLM calls go through Groq API

## 📖 Documentation

See [USAGE.md](USAGE.md) for:
- Complete API reference
- cURL examples
- Environment setup
- Troubleshooting
- Deployment guide

## 🔗 Reused Components

From upstream `Resume-analyzer` repository:
- PDF extraction logic (PyMuPDF)
- Text chunking patterns (LangChain)
- Embedding generation (Sentence Transformers)
- Pinecone integration patterns
- Groq LLM client setup
- RAG orchestration flow

## 📋 Migration from Resume-analyzer

This MVP replaces recruiter-focused features with candidate-facing tools:
- ❌ Removed: Multi-resume search, candidate ranking
- ✅ Added: Single-resume RAG, conversational editing, PDF export
- ✅ Enhanced: ATS analysis, resume scoring, JD matching

## 📄 License

MIT

## 👨‍💻 Contributing

Contributions welcome! Areas for improvement:
- Advanced NER for section extraction
- Multi-language support
- Cover letter generation
- Interview prep suggestions
- Career path recommendations

## 📞 Support

For issues or questions, see [USAGE.md](USAGE.md) troubleshooting section or open an issue.

