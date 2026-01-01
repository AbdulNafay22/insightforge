# 🧠 InsightForge

**InsightForge** is a full-stack, local AI-powered study assistant that transforms raw academic text into clear summaries, key points, and revision questions — all **without relying on cloud APIs**.

Built for students who want fast, private, and reliable AI help while studying.

---

## 🚀 Features

- ✨ AI-generated **summaries** of complex topics  
- 🧩 Automatically extracted **key points**
- 📊 Difficulty estimation (Easy / Medium / Hard)
- ❓ Smart **revision questions** for exam prep
- 🔒 **Runs locally** using Ollama (no data leaves your machine)
- ⚡ FastAPI backend + Vite + React frontend

---

## 🛠 Tech Stack

### Backend
- **Python**
- **FastAPI**
- **Ollama (LLaMA 3.2 1B)**
- RESTful API design

### Frontend
- **React**
- **Vite**
- **Modern CSS**
- Fetch-based API communication

---

## 🧪 How It Works

1. User pastes study material into the web interface  
2. Frontend sends text to FastAPI backend  
3. Backend prompts a local LLM via Ollama  
4. Structured JSON response is returned  
5. Frontend renders:
   - Summary
   - Key points
   - Difficulty
   - Revision questions

---

## ▶️ Running Locally

### Backend
```bash
pip install -r requirements.txt
uvicorn main:app --reload
