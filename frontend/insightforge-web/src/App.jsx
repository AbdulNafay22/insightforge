import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setResult(null);

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>InsightForge</h1>
      <p>AI-powered study assistant (local LLM)</p>

      <textarea
        rows={6}
        style={{ width: "100%", marginTop: 10 }}
        placeholder="Paste study content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={analyze}
        disabled={loading || !text}
        style={{ marginTop: 10 }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Summary</h3>
          <p>{result.summary}</p>

          <h3>Key Points</h3>
          <ul>
            {result.key_points.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>

          <h3>Difficulty</h3>
          <p>{result.difficulty}</p>

          <h3>Revision Questions</h3>
          <ul>
            {result.revision_questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
