from typing import List, Dict, Any


class VectorStoreInterface:
    """Abstract interface for a vector store adapter."""

    def upsert(self, ids: List[str], vectors: List[List[float]], metadata: List[Dict[str, Any]], namespace: str = None):
        raise NotImplementedError()

    def query(self, query_vector: List[float], top_k: int = 5, namespace: str = None):
        raise NotImplementedError()
