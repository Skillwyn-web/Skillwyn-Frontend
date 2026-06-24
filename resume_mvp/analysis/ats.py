"""ATS (Applicant Tracking System) analysis and scoring engine."""
import re
from typing import Dict, Any, List


class ATSAnalyzer:
    """Rules-based ATS compliance checker and scorer."""

    def __init__(self):
        self.checks = []

    def analyze(self, resume_json: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze resume for ATS friendliness and return report + score."""
        report = {
            "score": 0,
            "issues": [],
            "warnings": [],
            "passed": []
        }

        raw_text = resume_json.get("raw_text", "")
        sections = {
            "summary": resume_json.get("summary", ""),
            "experience": resume_json.get("experience", ""),
            "projects": resume_json.get("projects", ""),
            "skills": resume_json.get("skills", []),
            "education": resume_json.get("education", "")
        }

        # Run checks
        points = 0

        # Check 1: Has summary
        if sections["summary"].strip():
            report["passed"].append("✓ Professional summary present")
            points += 10
        else:
            report["issues"].append("✗ Missing professional summary")

        # Check 2: Has experience
        if sections["experience"].strip():
            report["passed"].append("✓ Work experience section found")
            points += 15
        else:
            report["issues"].append("✗ Missing work experience section")

        # Check 3: Has education
        if sections["education"].strip():
            report["passed"].append("✓ Education section present")
            points += 10
        else:
            report["issues"].append("✗ Missing education section")

        # Check 4: Has skills
        if sections["skills"] and len(sections["skills"]) > 0:
            report["passed"].append(f"✓ {len(sections['skills'])} skills listed")
            points += 10
        else:
            report["issues"].append("✗ No skills listed")

        # Check 5: Contact info presence
        email_found = bool(re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', raw_text))
        phone_found = bool(re.search(r'\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b', raw_text))
        
        if email_found:
            report["passed"].append("✓ Email address found")
            points += 5
        else:
            report["warnings"].append("⚠ Email address not detected")

        if phone_found:
            report["passed"].append("✓ Phone number found")
            points += 5
        else:
            report["warnings"].append("⚠ Phone number not detected")

        # Check 6: Length check
        word_count = len(raw_text.split())
        if 300 <= word_count <= 2000:
            report["passed"].append(f"✓ Optimal length ({word_count} words)")
            points += 10
        elif word_count < 300:
            report["warnings"].append(f"⚠ Resume too short ({word_count} words, recommended 300+)")
        else:
            report["warnings"].append(f"⚠ Resume too long ({word_count} words, recommended < 2000)")

        # Check 7: Special character/formatting issues
        if re.search(r'[©®™§¶†‡‰¡¿€£¥]', raw_text):
            report["warnings"].append("⚠ Special characters detected (may cause ATS issues)")
        else:
            report["passed"].append("✓ No problematic special characters")
            points += 5

        # Check 8: Dates format
        has_dates = bool(re.search(r'\b(20\d{2}|19\d{2})\b', raw_text))
        if has_dates:
            report["passed"].append("✓ Dates found in standard format")
            points += 5
        else:
            report["warnings"].append("⚠ No dates detected")

        # Check 9: Keywords presence (basic)
        ats_keywords = ['experience', 'skills', 'education', 'achievement', 'responsibility', 'bachelor', 'master']
        keyword_matches = sum(1 for kw in ats_keywords if kw.lower() in raw_text.lower())
        if keyword_matches >= 4:
            report["passed"].append(f"✓ ATS keywords detected ({keyword_matches}/9)")
            points += 10
        else:
            report["warnings"].append(f"⚠ Limited ATS keywords ({keyword_matches}/9)")

        report["score"] = min(100, points)
        return report

    def match_jd(self, resume_json: Dict[str, Any], jd_text: str) -> Dict[str, Any]:
        """Simple JD matching: extract keywords and compare."""
        resume_text = resume_json.get("raw_text", "").lower()
        jd_lower = jd_text.lower()

        # Extract skills-like keywords from JD (words between 3-15 chars)
        jd_keywords = set(re.findall(r'\b[a-z]{3,15}\b', jd_lower))
        # Common stop words to filter
        stop_words = {'the', 'and', 'for', 'with', 'from', 'that', 'have', 'will', 'your', 'should', 'about', 'can', 'are', 'our', 'experience'}
        jd_keywords = jd_keywords - stop_words

        # Find matches in resume
        matches = []
        for kw in jd_keywords:
            if kw in resume_text:
                matches.append(kw)

        match_score = int((len(matches) / len(jd_keywords)) * 100) if jd_keywords else 0
        return {
            "match_score": match_score,
            "matched_keywords": matches[:20],  # Top 20
            "missing_keywords": list(jd_keywords - set(matches))[:20],
            "total_jd_keywords": len(jd_keywords)
        }
