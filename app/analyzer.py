from app.llm import call_llm

def analyze_text(text: str):
    prompt = f"""
Analyze the following text and extract:

1. A concise summary
2. Key points
3. Assumptions made
4. Risks or limitations
5. Actionable takeaways

Return results clearly separated.

TEXT:
{text}
"""

    output = call_llm(prompt)

    return {
        "summary": output,
        "key_points": [],
        "assumptions": [],
        "risks_or_limitations": [],
        "actionable_takeaways": []
    }
