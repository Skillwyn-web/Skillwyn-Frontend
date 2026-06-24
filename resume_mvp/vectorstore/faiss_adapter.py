import numpy as np
from typing import List, Dict, Any
from .store_interface import VectorStoreInterface

try:
    import faiss
except Exception:
    faiss = None


class FaissAdapter(VectorStoreInterface):
    def __init__(self, dim: int):
        self.dim = dim
        self.ids = []
        self.vectors = None
        self.metadatas = []
        if faiss:
            self.index = faiss.IndexFlatIP(dim)
        else:
            self.index = None

    def upsert(self, ids: List[str], vectors: List[List[float]], metadata: List[Dict[str, Any]], namespace: str = None):
        vecs = np.array(vectors).astype('float32')
        # normalize for cosine using inner product on normalized vectors
        norms = np.linalg.norm(vecs, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        vecs = vecs / norms

        if self.index:
            if self.vectors is None:
                self.index.add(vecs)
                self.vectors = vecs
            else:
                self.index.add(vecs)
                self.vectors = np.vstack([self.vectors, vecs])
        else:
            self.vectors = vecs if self.vectors is None else np.vstack([self.vectors, vecs])

        self.ids.extend(ids)
        self.metadatas.extend(metadata)

    def query(self, query_vector: List[float], top_k: int = 5, namespace: str = None):
        import numpy as np
        q = np.array(query_vector).astype('float32')
        q = q / (np.linalg.norm(q) + 1e-10)
        if self.index and self.vectors is not None:
            D, I = self.index.search(np.expand_dims(q, 0), top_k)
            results = []
            for dist, idx in zip(D[0], I[0]):
                if idx < 0 or idx >= len(self.ids):
                    continue
                results.append({
                    'id': self.ids[idx],
                    'score': float(dist),
                    'metadata': self.metadatas[idx]
                })
            return results

        # fallback linear search
        if self.vectors is None:
            return []
        sims = (self.vectors @ q).tolist()
        idxs = np.argsort(sims)[::-1][:top_k]
        return [{'id': self.ids[i], 'score': float(sims[i]), 'metadata': self.metadatas[i]} for i in idxs]
