"""Resume editing and suggestion generation."""
import json
from typing import Dict, Any, List, Optional
from .llm_client import LLMClient


class ResumeEditor:
    """Generate editing suggestions and apply JSON patches."""

    def __init__(self, llm_client: LLMClient):
        self.llm = llm_client

    def suggest_improvements(self, resume_json: Dict[str, Any], area: str) -> Dict[str, Any]:
        """Generate LLM-based improvement suggestions for a resume section."""
        current_text = resume_json.get(area, "")
        if not current_text:
            return {"suggestion": f"No {area} section found to improve.", "patch": None}

        prompt = f"""You are a professional resume editor. Improve the following {area} section to make it more compelling for job applications. Keep it concise and impactful.

Current {area}:
{current_text}

Provide an improved version that is:
- More action-oriented
- Highlight achievements
- Use industry keywords
- Professional tone

Return ONLY the improved text, no explanation."""

        improved = self.llm.ask(prompt)
        
        # Create a JSON patch
        patch = {
            "op": "replace",
            "path": f"/{area}",
            "value": improved,
            "original": current_text
        }

        return {
            "suggestion": improved,
            "patch": patch,
            "area": area
        }

    def rewrite_section(self, resume_json: Dict[str, Any], section: str, instruction: str) -> Dict[str, Any]:
        """Rewrite a section based on user instruction."""
        current = resume_json.get(section, "")
        if not current:
            return {"error": f"Section '{section}' not found"}

        prompt = f"""You are a professional resume writer. {instruction}

Current section:
{current}

Return the rewritten section. Keep it professional and impactful. Return ONLY the rewritten text."""

        rewritten = self.llm.ask(prompt)
        patch = {
            "op": "replace",
            "path": f"/{section}",
            "value": rewritten,
            "original": current
        }

        return {
            "rewritten": rewritten,
            "patch": patch
        }

    def make_ats_friendly(self, resume_json: Dict[str, Any]) -> Dict[str, Any]:
        """Suggest ATS-friendly improvements."""
        patches = []

        # Simple rules-based suggestions
        suggestions = []

        # Check for objective statement
        summary = resume_json.get("summary", "")
        if summary and "objective" not in summary.lower():
            suggestions.append("Consider adding your career objective or professional summary at the top.")

        # Check skills formatting
        skills = resume_json.get("skills", [])
        if isinstance(skills, list) and len(skills) < 5:
            suggestions.append("Add more relevant skills (recommend 5-10 key skills).")

        # Check experience section
        experience = resume_json.get("experience", "")
        if experience and not any(char in experience for char in ['•', '-', '*']):
            suggestions.append("Use bullet points in experience section for better formatting.")

        return {
            "suggestions": suggestions,
            "recommendation": "Implement these suggestions for better ATS parsing."
        }

    def apply_patch(self, resume_json: Dict[str, Any], patch: Dict[str, Any]) -> Dict[str, Any]:
        """Apply a JSON patch to resume."""
        try:
            if patch["op"] == "replace":
                key = patch["path"].lstrip("/")
                resume_json[key] = patch["value"]
                return {"success": True, "message": f"Updated {key}", "resume": resume_json}
            elif patch["op"] == "add":
                key = patch["path"].lstrip("/")
                resume_json[key] = patch["value"]
                return {"success": True, "message": f"Added {key}", "resume": resume_json}
            else:
                return {"success": False, "error": f"Unknown operation: {patch['op']}"}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def generate_edit_suggestions(self, resume_json: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate multiple improvement suggestions."""
        suggestions = []

        for area in ["summary", "experience", "projects"]:
            if resume_json.get(area):
                result = self.suggest_improvements(resume_json, area)
                if result.get("patch"):
                    suggestions.append(result)

        return suggestions
