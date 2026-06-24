from dataclasses import dataclass, field
from typing import List, Dict, Any


@dataclass
class Resume:
    id: str
    source_filename: str
    raw_text: str
    summary: str = ""
    experience: str = ""
    projects: str = ""
    skills: List[str] = field(default_factory=list)
    education: str = ""
    metadata: Dict[str, Any] = field(default_factory=dict)
