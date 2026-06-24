import os
from typing import List, Dict, Any
from .store_interface import VectorStoreInterface

try:
    from pinecone import Pinecone, ServerlessSpec
except Exception:
    Pinecone = None

from ..config import PINECONE_API_KEY


class PineconeAdapter(VectorStoreInterface):
    def __init__(self, index_name: str, dim: int):
        if not Pinecone:
            raise RuntimeError("pinecone-client required for PineconeAdapter")
        if not PINECONE_API_KEY:
            raise RuntimeError("PINECONE_API_KEY not configured")
        self.pc = Pinecone(api_key=PINECONE_API_KEY)
        self.index_name = index_name
        self.dim = dim
        if not self.pc.has_index(index_name):
            self.pc.create_index(name=index_name, dimension=dim, metric="cosine", spec=ServerlessSpec(cloud="aws", region="us-east-1"))
        self.index = self.pc.Index(index_name)

    def upsert(self, ids: List[str], vectors: List[List[float]], metadata: List[Dict[str, Any]], namespace: str = None):
        vectors_to_upsert = list(zip(ids, vectors, metadata))
        self.index.upsert(vectors=vectors_to_upsert, namespace=namespace)

    def query(self, query_vector: List[float], top_k: int = 5, namespace: str = None):
        res = self.index.query(vector=query_vector, top_k=top_k, include_metadata=True, namespace=namespace)
        out = []
        for m in res.matches:
            out.append({'id': m.id, 'score': m.score, 'metadata': m.metadata})
        return out
