"""Tests for parsers, extractors, embedder, and API."""
import pytest
import json
from io import BytesIO

# Test parsers
from resume_mvp.ingest.parsers import extract_text_from_docx, parse_resume
from resume_mvp.extractor import extract_sections
from resume_mvp.ingest.chunker import split_text_into_chunks
from resume_mvp.embeddings.embedder import Embedder
from resume_mvp.analysis.ats import ATSAnalyzer
from resume_mvp.analysis.scorer import ResumeScorer


class TestExtractor:
    def test_extract_sections_basic(self):
        text = """
        SUMMARY
        Experienced engineer with 5 years in Python.
        
        EXPERIENCE
        - Senior Engineer at TechCorp (2020-2023)
        - Developed microservices
        
        SKILLS
        Python, JavaScript, Docker, Kubernetes
        
        EDUCATION
        BS Computer Science, University of State
        """
        result = extract_sections(text)
        assert "summary" in result
        assert "experience" in result
        assert "skills" in result
        assert "education" in result
        assert len(result["skills"]) > 0

    def test_extract_sections_skills_parsing(self):
        text = """
        SKILLS
        Python, Java, C++, Docker, AWS
        """
        result = extract_sections(text)
        skills = result["skills"]
        assert "Python" in skills or "python" in str(skills).lower()
        assert len(skills) >= 3


class TestChunker:
    def test_split_text_basic(self):
        text = "A" * 1000
        chunks = split_text_into_chunks(text, chunk_size=100, chunk_overlap=10)
        assert len(chunks) > 1
        assert len(chunks[0]) <= 100

    def test_split_preserves_content(self):
        text = "Hello world. " * 100
        chunks = split_text_into_chunks(text)
        rejoined = "".join(chunks)
        # Allow some small differences due to overlap
        assert len(rejoined) >= len(text) * 0.9


class TestEmbedder:
    @pytest.mark.skipif(True, reason="Requires sentence-transformers library")
    def test_embedder_encode(self):
        embedder = Embedder()
        texts = ["Hello world", "Python coding"]
        embeddings = embedder.encode(texts)
        assert len(embeddings) == 2
        assert all(len(e) == 384 for e in embeddings)  # all-MiniLM-L6-v2 dim


class TestATSAnalyzer:
    def test_ats_analyze_complete_resume(self):
        resume = {
            "summary": "Experienced engineer",
            "experience": "Senior Role at Company",
            "education": "BS in CS",
            "skills": ["Python", "Java"],
            "raw_text": "Contact: test@example.com 555-123-4567 Experienced engineer with 5 years experience"
        }
        analyzer = ATSAnalyzer()
        report = analyzer.analyze(resume)
        assert "score" in report
        assert "issues" in report
        assert "warnings" in report
        assert report["score"] > 50

    def test_ats_analyze_incomplete(self):
        resume = {
            "summary": "",
            "experience": "",
            "education": "",
            "skills": [],
            "raw_text": "minimal text"
        }
        analyzer = ATSAnalyzer()
        report = analyzer.analyze(resume)
        assert report["score"] < 30
        assert len(report["issues"]) > 0

    def test_jd_matching(self):
        resume = {
            "raw_text": "Python Django REST API Database management leadership"
        }
        jd = "Looking for Python developer with Django and REST API experience"
        analyzer = ATSAnalyzer()
        result = analyzer.match_jd(resume, jd)
        assert "match_score" in result
        assert result["match_score"] > 0


class TestResumeScorer:
    def test_score_complete_resume(self):
        resume = {
            "summary": "Experienced engineer with 5 years background",
            "experience": "Senior Role - Led team of 5 engineers",
            "education": "BS Computer Science",
            "skills": ["Python", "Java", "AWS"],
            "raw_text": "Achieved 50% performance improvement. Led deployment of microservices. Implemented CI/CD pipeline. Reduced costs by 30%."
        }
        scorer = ResumeScorer()
        result = scorer.score(resume)
        assert "overall_score" in result
        assert "grade" in result
        assert result["overall_score"] > 50
        assert result["grade"] in ["A", "B", "C", "D", "F"]

    def test_score_breakdown(self):
        resume = {
            "summary": "Engineer",
            "experience": "",
            "education": "",
            "skills": [],
            "raw_text": "short text"
        }
        scorer = ResumeScorer()
        result = scorer.score(resume)
        assert "breakdown" in result
        assert all(k in result["breakdown"] for k in ["completeness", "ats_friendliness", "content_quality"])


class TestIntegration:
    def test_full_pipeline(self):
        """Test upload -> extract -> analyze -> score pipeline."""
        # Create a sample resume
        sample_resume = """
        PROFESSIONAL SUMMARY
        Experienced Software Engineer with 6 years in full-stack development and cloud technologies.
        
        EXPERIENCE
        Senior Software Engineer | TechCorp Inc | 2021-2024
        - Led development of microservices architecture serving 1M+ users
        - Implemented CI/CD pipeline reducing deployment time by 60%
        - Mentored team of 5 junior engineers
        
        EDUCATION
        Bachelor of Science in Computer Science
        University of Technology, 2018
        
        SKILLS
        Python, JavaScript, Docker, Kubernetes, AWS, PostgreSQL, React, Node.js
        
        Contact: john.doe@email.com | 555-123-4567
        """
        
        # Extract sections
        sections = extract_sections(sample_resume)
        assert sections["summary"]
        assert sections["experience"]
        assert len(sections["skills"]) > 3
        
        # Analyze ATS
        analyzer = ATSAnalyzer()
        ats_report = analyzer.analyze(sections)
        assert ats_report["score"] > 60
        
        # Score
        scorer = ResumeScorer()
        score_result = scorer.score(sections, ats_report)
        assert score_result["overall_score"] > 70


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
