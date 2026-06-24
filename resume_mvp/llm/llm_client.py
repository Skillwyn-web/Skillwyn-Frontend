import os
from typing import Optional

try:
    from openai import OpenAI
except Exception:
    OpenAI = None

from ..config import GROQ_API_KEY


class LLMClient:
    def __init__(self, groq_key: Optional[str] = None):
        key = groq_key or GROQ_API_KEY
        if not key:
            raise RuntimeError("GROQ_API_KEY is not configured")
        if not OpenAI:
            raise RuntimeError("openai package is required for LLMClient")
        self.client = OpenAI(api_key=key, base_url="https://api.groq.com/openai/v1")

    def ask(self, prompt: str, model: str = "llama-3.1-8b-instant", temperature: float = 0.3) -> str:
        try:
            resp = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "You are a helpful resume assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=temperature
            )
            return resp.choices[0].message.content.strip()
        except Exception as e:
            return f"Error calling LLM: {e}"
