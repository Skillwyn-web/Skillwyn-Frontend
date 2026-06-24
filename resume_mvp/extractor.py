import re
from typing import Dict, Any

SECTION_HEADERS = ["summary", "experience", "projects", "skills", "education", "work experience", "professional summary"]


def simple_section_split(text: str) -> Dict[str, str]:
    # Lowercase for header matching but keep original text for outputs
    lines = text.splitlines()
    current = "other"
    sections: Dict[str, list] = {h: [] for h in SECTION_HEADERS}
    sections["other"] = []

    header_pattern = re.compile(r"^\s*(?P<header>[A-Za-z ]{2,40})\s*[:\-]?$")

    for line in lines:
        m = header_pattern.match(line.strip())
        if m:
            h = m.group("header").strip().lower()
            # find closest known header
            for known in SECTION_HEADERS:
                if known in h:
                    current = known
                    break
            else:
                current = "other"
            continue

        sections.setdefault(current, []).append(line)

    # join
    out = {k: "\n".join(v).strip() for k, v in sections.items()}
    # Ensure keys exist
    for key in ["summary", "experience", "projects", "skills", "education"]:
        out.setdefault(key, "")

    return out


def extract_sections(text: str) -> Dict[str, Any]:
    """Return a canonical resume dict with required sections."""
    sections = simple_section_split(text)

    # Basic normalization for skills: comma split if needed
    skills_text = sections.get("skills", "")
    skills = []
    if skills_text:
        # split by commas or newlines
        parts = re.split(r"[,\n]\s*", skills_text)
        skills = [p.strip() for p in parts if p.strip()]

    resume = {
        "summary": sections.get("summary", ""),
        "experience": sections.get("experience", ""),
        "projects": sections.get("projects", ""),
        "skills": skills,
        "education": sections.get("education", ""),
        "raw_text": text,
    }

    return resume
