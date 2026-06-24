"""PDF export and rendering."""
import io
from typing import Dict, Any

# Ensure reportlab symbol exists even if import fails
reportlab = None
try:
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
    reportlab = True
except Exception:
    reportlab = None


class PDFExporter:
    """Export resume JSON to PDF."""

    def __init__(self):
        if not reportlab:
            raise RuntimeError("reportlab is required for PDF export")

    def render_pdf(self, resume_json: Dict[str, Any], filename: str = "resume.pdf") -> bytes:
        """Render resume to PDF bytes."""
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch)
        story = []

        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=14,
            textColor=colors.HexColor('#1f4788'),
            spaceAfter=12,
            alignment=TA_LEFT,
            fontName='Helvetica-Bold'
        )

        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=11,
            textColor=colors.HexColor('#1f4788'),
            spaceAfter=8,
            spaceBefore=8,
            fontName='Helvetica-Bold',
            borderColor=colors.HexColor('#cccccc'),
            borderWidth=1,
            borderPadding=5
        )

        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['BodyText'],
            fontSize=9,
            alignment=TA_JUSTIFY,
            spaceAfter=6
        )

        # Title/Header
        story.append(Paragraph("RESUME", title_style))
        story.append(Spacer(1, 0.1*inch))

        # Summary
        if resume_json.get("summary"):
            story.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
            story.append(Paragraph(resume_json["summary"], body_style))
            story.append(Spacer(1, 0.1*inch))

        # Skills
        if resume_json.get("skills"):
            story.append(Paragraph("SKILLS", heading_style))
            skills_text = ", ".join(resume_json["skills"])
            story.append(Paragraph(skills_text, body_style))
            story.append(Spacer(1, 0.1*inch))

        # Experience
        if resume_json.get("experience"):
            story.append(Paragraph("EXPERIENCE", heading_style))
            exp_text = resume_json["experience"].replace('\n', '<br/>')
            story.append(Paragraph(exp_text, body_style))
            story.append(Spacer(1, 0.1*inch))

        # Education
        if resume_json.get("education"):
            story.append(Paragraph("EDUCATION", heading_style))
            edu_text = resume_json["education"].replace('\n', '<br/>')
            story.append(Paragraph(edu_text, body_style))
            story.append(Spacer(1, 0.1*inch))

        # Projects
        if resume_json.get("projects"):
            story.append(Paragraph("PROJECTS", heading_style))
            proj_text = resume_json["projects"].replace('\n', '<br/>')
            story.append(Paragraph(proj_text, body_style))

        # Build PDF
        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()

    def export_json(self, resume_json: Dict[str, Any]) -> str:
        """Export resume as JSON string."""
        return json.dumps(resume_json, indent=2)


import json
