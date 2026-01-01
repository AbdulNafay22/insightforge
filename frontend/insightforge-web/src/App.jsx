import { useState } from "react";
import './App.css';

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze text. Make sure the backend is running!");
    } finally {
      setLoading(false);
    }
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "#10b981",
      medium: "#f59e0b", 
      hard: "#ef4444"
    };
    return colors[difficulty] || "#6366f1";
  };

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <span className="logo-icon">🧠</span>
          <h1>InsightForge</h1>
        </div>
        <p className="tagline">Transform your study materials with AI-powered insights</p>
      </div>

      <div className="input-section">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your study material here... (e.g., textbook paragraphs, lecture notes, articles)"
          rows={8}
          className="text-input"
        />
        
        <button 
          onClick={analyze} 
          disabled={loading || !text}
          className="analyze-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              <span>✨</span>
              Analyze Text
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="results">
          <div className="result-card summary-card">
            <div className="card-header">
              <span className="card-icon">📝</span>
              <h2>Summary</h2>
            </div>
            <p className="summary-text">{result.summary}</p>
          </div>

          <div className="result-card difficulty-card">
            <div className="card-header">
              <span className="card-icon">🎯</span>
              <h2>Difficulty Level</h2>
            </div>
            <div 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(result.difficulty) }}
            >
              {result.difficulty?.toUpperCase()}
            </div>
          </div>

          <div className="result-card">
            <div className="card-header">
              <span className="card-icon">💡</span>
              <h2>Key Points</h2>
            </div>
            <ul className="key-points-list">
              {result.key_points?.map((point, i) => (
                <li key={i} className="key-point-item">
                  <span className="bullet">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="result-card">
            <div className="card-header">
              <span className="card-icon">❓</span>
              <h2>Revision Questions</h2>
            </div>
            <div className="questions-list">
              {result.revision_questions?.map((q, i) => (
                <div key={i} className="question-item">
                  <span className="question-number">{i + 1}</span>
                  <p>{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="empty-state">
          <span className="empty-icon">📚</span>
          <h3>Ready to learn smarter?</h3>
          <p>Paste your study material above and click "Analyze Text" to get started!</p>
        </div>
      )}
    </div>
  );
}