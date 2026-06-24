# Resume Analyzer MVP - API Quick Reference

## Server Setup

```bash
# Install
pip install -r resume_mvp/requirements.txt

# Run
uvicorn resume_mvp.api.app:app --reload

# Server: http://localhost:8000
# Docs: http://localhost:8000/docs
```

## Core Workflow

```
1. Upload → resume_id
2. Chat → insights & suggestions
3. Analyze → ATS score, resume score, JD match
4. Edit → apply improvements
5. Export → PDF or JSON
```

## Quick Reference

### Upload Resume
```bash
curl -X POST "http://localhost:8000/upload" \
  -F "file=@resume.pdf"
```
Returns: `resume_id`, `resume` (JSON)

### Chat
```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "xxx",
    "message": "Improve my summary"
  }'
```
Returns: `answer` (LLM response), `conversation` history

### ATS Analysis
```bash
curl -X POST "http://localhost:8000/ats_analyze" \
  -H "Content-Type: application/json" \
  -d '{"resume_id": "xxx"}'
```
Returns: `score`, `issues`, `warnings`, `passed`

### Resume Score
```bash
curl -X POST "http://localhost:8000/score" \
  -H "Content-Type: application/json" \
  -d '{"resume_id": "xxx"}'
```
Returns: `overall_score`, `grade` (A-F), `breakdown`, `suggestions`

### JD Matching
```bash
curl -X POST "http://localhost:8000/match_jd" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "xxx",
    "jd_text": "Looking for Python engineer..."
  }'
```
Returns: `match_score` (%), `matched_keywords`, `missing_keywords`

### Improve Section
```bash
curl -X POST "http://localhost:8000/improve" \
  -H "Content-Type: application/json" \
  -d '{
    "resume_id": "xxx",
    "section": "summary",
    "instruction": "Make it more impactful"
  }'
```
Returns: `rewritten` text, `patch` (JSON patch)

### Apply Edit
```bash
curl -X POST "http://localhost:8000/apply_patch" \
  -H "Content-Type: application/json" \
  -d '?resume_id=xxx' \
  -d '{
    "op": "replace",
    "path": "/summary",
    "value": "new summary text",
    "original": "old summary"
  }'
```
Returns: `success`, `resume` (updated)

### Export PDF
```bash
curl -X GET "http://localhost:8000/export/xxx.pdf" \
  -o resume.pdf
```

### Export JSON
```bash
curl -X GET "http://localhost:8000/export/xxx.json"
```

### Get Resume Data
```bash
curl -X GET "http://localhost:8000/resume/xxx"
```

### Health Check
```bash
curl -X GET "http://localhost:8000/health"
```
Returns: `status`, `services` availability

## Python Client Example

```python
import requests
import json

BASE = "http://localhost:8000"

# Upload
with open("resume.pdf", "rb") as f:
    resp = requests.post(f"{BASE}/upload", files={"file": f})
    rid = resp.json()["resume_id"]

# Chat
chat = requests.post(f"{BASE}/chat", json={
    "resume_id": rid,
    "message": "How can I improve?"
})
print(chat.json()["answer"])

# Analyze
ats = requests.post(f"{BASE}/ats_analyze", json={"resume_id": rid})
print(f"ATS Score: {ats.json()['score']}")

# Score
score = requests.post(f"{BASE}/score", json={"resume_id": rid})
print(f"Overall Score: {score.json()['overall_score']}/100")

# Export
pdf = requests.get(f"{BASE}/export/{rid}.pdf")
with open("resume.pdf", "wb") as f:
    f.write(pdf.content)
```

## Response Format

All endpoints return JSON:
```json
{
  "key": "value",
  "status": "success|error"
}
```

## Error Codes

- `200` ✅ Success
- `400` ❌ Bad request (missing/invalid parameter)
- `404` ❌ Resume not found
- `503` ❌ Service unavailable (LLM/embedder not ready)
- `500` ❌ Server error

## Common Chat Messages

- "Improve my professional summary"
- "Rewrite my experience section"
- "Make this ATS friendly"
- "How well does this match the job posting?"
- "What's missing from my resume?"
- "Make my skills section better"

## Resume JSON Structure

```json
{
  "id": "resume_id",
  "summary": "...",
  "experience": "...",
  "projects": "...",
  "skills": ["Python", "Java"],
  "education": "...",
  "raw_text": "...",
  "metadata": {}
}
```

## Environment Variables

```bash
GROQ_API_KEY="your_api_key"           # Required for LLM
PINECONE_API_KEY="your_api_key"       # Optional
EMBEDDING_MODEL="all-MiniLM-L6-v2"    # Default
CHUNK_SIZE="800"                       # Default
CHUNK_OVERLAP="80"                     # Default
```

## Service Dependencies

| Service | Default | Alternative |
|---------|---------|-------------|
| Embedder | SentenceTransformers | OpenAI Embeddings |
| Vector DB | FAISS (local) | Pinecone (cloud) |
| LLM | Groq (llama-3.1-8b) | OpenAI/Claude |
| PDF Export | ReportLab | Native PDF libs |

## Performance Tips

1. **Local dev**: Use FAISS (no API overhead)
2. **Batch operations**: Process multiple resumes sequentially
3. **Caching**: Embed once, query multiple times
4. **Large resumes**: Increase chunk size for speed
5. **Reduce k**: Use `k=3` for faster retrieval

## Troubleshooting

| Issue | Solution |
|-------|----------|
| LLM not responding | Check `GROQ_API_KEY`, test `/health` |
| Embeddings slow | First run downloads model (~400MB) |
| PDF export fails | Install `reportlab: pip install reportlab` |
| Memory issues | Reduce batch size or resume size |
| Parsing error | Try PDF validation, ensure file not corrupted |

## Rate Limits (Production)

Recommended per-user limits:
- 100 uploads/day
- 1000 chat messages/day
- 100 exports/day
- 10 concurrent connections

## Security Headers (Production)

Add to FastAPI app:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)
```

## Monitoring Commands

```bash
# Check service health
curl http://localhost:8000/health

# View API docs
open http://localhost:8000/docs

# Check logs
tail -f logs/app.log
```

## Integration Example

### React Frontend
```javascript
const uploadResume = async (file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  return res.json();
};

const chat = async (resumeId, message) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_id: resumeId, message })
  });
  return res.json();
};
```

---
**Status**: ✅ Production-ready MVP
**Last Updated**: 2026-06-21
**Version**: 1.0.0
