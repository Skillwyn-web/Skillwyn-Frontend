"""Demo script showing how to use the Resume Analyzer MVP API."""
import requests
import json

BASE_URL = "http://localhost:8000"

def demo():
    print("=" * 60)
    print("Resume Analyzer MVP - Demo")
    print("=" * 60)
    
    # 1. Health check
    print("\n1. Health Check")
    resp = requests.get(f"{BASE_URL}/health")
    print(json.dumps(resp.json(), indent=2))
    
    # 2. Upload resume
    print("\n2. Upload Resume")
    with open("sample_resume.pdf", "rb") as f:
        files = {"file": f}
        resp = requests.post(f"{BASE_URL}/upload", files=files)
    
    if resp.status_code != 200:
        print(f"Error: {resp.text}")
        return
    
    data = resp.json()
    resume_id = data["resume_id"]
    print(f"Resume ID: {resume_id}")
    print(f"Filename: {data['filename']}")
    print(f"Resume Data:\n{json.dumps(data['resume'], indent=2)}")
    
    # 3. Chat
    print("\n3. Chat - Improve Summary")
    resp = requests.post(f"{BASE_URL}/chat", json={
        "resume_id": resume_id,
        "message": "How can I improve my professional summary?"
    })
    print(json.dumps(resp.json(), indent=2))
    
    # 4. ATS Analysis
    print("\n4. ATS Analysis")
    resp = requests.post(f"{BASE_URL}/ats_analyze", json={
        "resume_id": resume_id
    })
    print(json.dumps(resp.json(), indent=2))
    
    # 5. Resume Score
    print("\n5. Resume Score")
    resp = requests.post(f"{BASE_URL}/score", json={
        "resume_id": resume_id
    })
    print(json.dumps(resp.json(), indent=2))
    
    # 6. JD Matching
    print("\n6. JD Matching")
    jd = """
    We are looking for a Senior Software Engineer with:
    - 5+ years of experience
    - Proficiency in Python and JavaScript
    - Experience with AWS and Docker
    - Leadership experience
    - Strong communication skills
    """
    resp = requests.post(f"{BASE_URL}/match_jd", json={
        "resume_id": resume_id,
        "jd_text": jd
    })
    print(json.dumps(resp.json(), indent=2))
    
    # 7. Export PDF
    print("\n7. Export PDF")
    resp = requests.get(f"{BASE_URL}/export/{resume_id}.pdf")
    if resp.status_code == 200:
        with open("exported_resume.pdf", "wb") as f:
            f.write(resp.content)
        print("PDF exported to: exported_resume.pdf")
    else:
        print(f"Error: {resp.text}")
    
    # 8. Export JSON
    print("\n8. Export JSON")
    resp = requests.get(f"{BASE_URL}/export/{resume_id}.json")
    with open("exported_resume.json", "w") as f:
        json.dump(resp.json(), f, indent=2)
    print("JSON exported to: exported_resume.json")
    
    print("\n" + "=" * 60)
    print("Demo Complete!")
    print("=" * 60)

if __name__ == "__main__":
    print("Starting demo...")
    print("Make sure the API server is running: uvicorn resume_mvp.api.app:app --reload")
    try:
        demo()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to API server.")
        print("Please start the server first: uvicorn resume_mvp.api.app:app --reload")
    except FileNotFoundError:
        print("Error: sample_resume.pdf not found in current directory.")
        print("Please provide a resume PDF file named 'sample_resume.pdf'")
    except Exception as e:
        print(f"Error: {e}")
