import json
import re
import requests
from typing import Dict, Any

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2:1b"

def analyze_text_with_llm(text: str) -> Dict[str, Any]:
    prompt = f"""Analyze this educational text and return a JSON object.

Text to analyze:
{text}

Create a JSON response with these fields:
1. "summary": Write a clear 1-2 sentence summary
2. "key_points": List 3-5 important concepts as complete sentences
3. "difficulty": Choose ONE option: "easy", "medium", or "hard"
4. "revision_questions": Write 2-3 test questions about the content

Return ONLY valid JSON in this format:
{{
  "summary": "your summary text",
  "key_points": ["complete sentence 1", "complete sentence 2", "complete sentence 3"],
  "difficulty": "medium",
  "revision_questions": ["Question 1?", "Question 2?"]
}}"""

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False,
                "format": "json",
                "options": {
                    "temperature": 0.3,  # Lower = more consistent
                    "num_predict": 600   # Allow enough tokens
                }
            },
            timeout=120
        )
        response.raise_for_status()
        
        data = response.json()
        raw_output = data.get("response", "").strip()

        print("\n--- RAW LLM OUTPUT ---")
        print(raw_output)
        print("--- END OUTPUT ---\n")

        try:
            parsed = json.loads(raw_output)
            
            # Fix difficulty if it's not one of the valid options
            if parsed.get("difficulty") not in ["easy", "medium", "hard"]:
                parsed["difficulty"] = "medium"
            
            return parsed
        except json.JSONDecodeError:
            json_match = re.search(r'\{(?:[^{}]|(?:\{[^{}]*\}))*\}', raw_output)
            
            if not json_match:
                raise ValueError(f"No valid JSON found in output: {raw_output[:200]}")
            
            json_str = json_match.group()
            json_str = re.sub(r'^```json\s*|\s*```$', '', json_str, flags=re.MULTILINE)
            
            parsed = json.loads(json_str)
            
            # Fix difficulty if needed
            if parsed.get("difficulty") not in ["easy", "medium", "hard"]:
                parsed["difficulty"] = "medium"
            
            return parsed
            
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        raise ValueError(f"Failed to connect to Ollama: {str(e)}")
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        raise ValueError(f"Invalid JSON from model: {raw_output[:200]}")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise