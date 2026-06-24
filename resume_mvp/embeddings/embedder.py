from typing import List
from ..config import EMBEDDING_MODEL

try:
    from sentence_transformers import SentenceTransformer
except Exception:
    SentenceTransformer = None


class Embedder:
    def __init__(self, model_name: str = EMBEDDING_MODEL):
        if not SentenceTransformer:
            raise RuntimeError("sentence-transformers is required for embeddings")
        self.model = SentenceTransformer(model_name)

    def encode(self, texts: List[str]) -> List[List[float]]:
        return self.model.encode(texts).tolist()
