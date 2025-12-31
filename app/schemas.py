from pydantic import BaseModel
from typing import List


class AnalyzeRequest(BaseModel):
    text: str


class AnalyzeResponse(BaseModel):
    summary: str
    key_points: List[str]
    difficulty: str
    revision_questions: List[str]
