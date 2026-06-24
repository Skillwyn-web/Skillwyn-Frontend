"""Resume scoring engine."""
from typing import Dict, Any


class ResumeScorer:
    """Calculate overall resume score based on multiple factors."""

    def __init__(self):
        self.weights = {
            "completeness": 0.25,
            "ats_friendliness": 0.20,
            "content_quality": 0.30,
            "formatting": 0.15,
            "keyword_coverage": 0.10
        }

    def score(self, resume_json: Dict[str, Any], ats_report: Dict[str, Any] = None) -> Dict[str, Any]:
        """Calculate overall resume score."""
        scores = {}

        # Completeness (0-25 points)
        completeness = self._score_completeness(resume_json)
        scores["completeness"] = completeness

        # ATS Friendliness (0-20 points)
        if ats_report:
            ats_score = min(20, ats_report.get("score", 0) * 0.2)
        else:
            ats_score = 10
        scores["ats_friendliness"] = ats_score

        # Content Quality (0-30 points)
        content_quality = self._score_content_quality(resume_json)
        scores["content_quality"] = content_quality

        # Formatting (0-15 points)
        formatting = self._score_formatting(resume_json)
        scores["formatting"] = formatting

        # Keyword Coverage (0-10 points)
        keyword_coverage = self._score_keyword_coverage(resume_json)
        scores["keyword_coverage"] = keyword_coverage

        # Calculate weighted total
        total = sum(score * self.weights[key] for key, score in scores.items())

        return {
            "overall_score": int(total),
            "breakdown": scores,
            "grade": self._get_grade(int(total)),
            "suggestions": self._get_suggestions(scores, resume_json)
        }

    def _score_completeness(self, resume_json: Dict[str, Any]) -> int:
        """Score based on section completeness."""
        sections = ["summary", "experience", "education", "skills"]
        present = sum(1 for s in sections if resume_json.get(s))
        return int((present / len(sections)) * 25)

    def _score_content_quality(self, resume_json: Dict[str, Any]) -> int:
        """Score based on content depth."""
        raw_text = resume_json.get("raw_text", "")
        word_count = len(raw_text.split())

        if word_count < 200:
            return 5
        elif word_count < 500:
            return 15
        elif word_count < 1500:
            return 25
        else:
            return 30

    def _score_formatting(self, resume_json: Dict[str, Any]) -> int:
        """Score based on formatting indicators."""
        raw_text = resume_json.get("raw_text", "")
        bullets = raw_text.count("•") + raw_text.count("-") + raw_text.count("*")
        lines = len(raw_text.split('\n'))

        if bullets > 5 and lines > 20:
            return 15
        elif bullets > 0 and lines > 10:
            return 10
        else:
            return 5

    def _score_keyword_coverage(self, resume_json: Dict[str, Any]) -> int:
        """Score based on industry keywords."""
        raw_text = resume_json.get("raw_text", "").lower()
        keywords = [
            'achieved', 'led', 'implemented', 'developed', 'managed', 'improved',
            'designed', 'created', 'launched', 'increased', 'reduced', 'optimized'
        ]
        matches = sum(1 for kw in keywords if kw in raw_text)
        return int((matches / len(keywords)) * 10)

    def _get_grade(self, score: int) -> str:
        """Convert score to letter grade."""
        if score >= 90:
            return "A"
        elif score >= 80:
            return "B"
        elif score >= 70:
            return "C"
        elif score >= 60:
            return "D"
        else:
            return "F"

    def _get_suggestions(self, scores: Dict[str, int], resume_json: Dict[str, Any]) -> list:
        """Generate improvement suggestions."""
        suggestions = []

        if scores["completeness"] < 20:
            suggestions.append("Add missing sections (summary, experience, education, or skills)")

        if scores["content_quality"] < 20:
            suggestions.append("Expand your resume content with more details and achievements")

        if scores["formatting"] < 10:
            suggestions.append("Use bullet points to improve formatting and readability")

        if scores["keyword_coverage"] < 8:
            suggestions.append("Use action verbs (achieved, led, implemented) to strengthen your resume")

        if scores["ats_friendliness"] < 15:
            suggestions.append("Simplify formatting to improve ATS compatibility")

        return suggestions
