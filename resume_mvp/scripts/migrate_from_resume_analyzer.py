"""Migration helpers to bring reusable components from upstream Resume-analyzer."""
import os

README = '''
This script outlines manual steps to migrate reusable code from the upstream Resume-analyzer repository into this MVP.

Steps:
1. Copy `utils/text_extraction.py` -> `resume_mvp/ingest/parsers.py` (PDF parsing reused).
2. Copy `utils/text_splitter.py` logic -> `resume_mvp/ingest/chunker.py`.
3. Migrate `utils/data_ingestion.py` embedding batching into `resume_mvp/embeddings/embedder.py`.
4. Wrap Pinecone client code into `resume_mvp/vectorstore/pinecone_adapter.py`.
5. Remove recruiter search UI and functions (perform_recruiter_search) — not needed for MVP.

This file is informational and does not execute automated migration.
'''

if __name__ == '__main__':
    print(README)
