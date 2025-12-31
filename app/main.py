from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.llm import analyze_text_with_llm

app = FastAPI(
    title="InsightForge",
    version="1.0.0",
    description="AI-powered study assistant using local LLMs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    text: str

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    try:
        return analyze_text_with_llm(req.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
