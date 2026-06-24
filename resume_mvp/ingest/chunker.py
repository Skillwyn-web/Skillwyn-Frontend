try:
    from langchain.text_splitter import RecursiveCharacterTextSplitter
except Exception:
    RecursiveCharacterTextSplitter = None

from ..config import DEFAULT_CHUNK_SIZE, DEFAULT_CHUNK_OVERLAP


def split_text_into_chunks(text: str, chunk_size: int = DEFAULT_CHUNK_SIZE, chunk_overlap: int = DEFAULT_CHUNK_OVERLAP):
    if RecursiveCharacterTextSplitter:
        splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        return splitter.split_text(text)

    # Fallback naive splitter
    chunks = []
    i = 0
    while i < len(text):
        end = min(i + chunk_size, len(text))
        chunks.append(text[i:end])
        i = end - chunk_overlap
        if i < 0:
            i = 0
    return chunks
