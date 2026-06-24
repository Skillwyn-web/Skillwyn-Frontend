from typing import List, Dict, Any, Optional

from ..vectorstore.store_interface import VectorStoreInterface
from ..embeddings.embedder import Embedder
from .llm_client import LLMClient


class RAG:
    def __init__(self, vectorstore: VectorStoreInterface, embedder: Embedder, llm_client: LLMClient):
        self.vs = vectorstore
        self.embedder = embedder
        self.llm = llm_client

    def answer_for_resume(self, resume_id: str, query: str, k: int = 5) -> Dict[str, Any]:
        """Retrieve relevant resume sections and answer question using LLM."""
        try:
            # Embed query
            query_embedding = self.embedder.encode([query])[0]
            
            # Retrieve top k relevant chunks
            results = self.vs.query(query_vector=query_embedding, top_k=k, namespace=resume_id)
            
            if not results:
                return {
                    "answer": "No relevant information found in the resume.",
                    "sources": []
                }
            
            # Build context from retrieved chunks
            context_parts = []
            sources = []
            for r in results:
                if 'metadata' in r and 'text' in r['metadata']:
                    context_parts.append(r['metadata']['text'])
                    sources.append({
                        'id': r.get('id', ''),
                        'score': r.get('score', 0),
                        'source': r['metadata'].get('source', 'Unknown')
                    })
            
            context = "\n\n".join(context_parts[:3])  # Use top 3
            
            # Build prompt
            prompt = f"""You are a helpful resume assistant. Answer the user's question based on the resume context provided.

Resume Context:
{context}

Question: {query}

Provide a clear, concise answer."""
            
            answer = self.llm.ask(prompt)
            
            return {
                "answer": answer,
                "sources": sources
            }
        except Exception as e:
            return {
                "answer": f"Error processing question: {str(e)}",
                "sources": []
            }
