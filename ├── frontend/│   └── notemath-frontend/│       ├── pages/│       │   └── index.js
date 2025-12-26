import { useState } from "react";
import axios from "axios";
import MathInput from "../components/MathInput";

import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [latex, setLatex] = useState("");
  const [steps, setSteps] = useState([]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const solveMath = async () => {
    try {
      setError("");

      const res = await axios.post(`${API_URL}/solve`, {
        latex,
      });

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      setSteps(res.data.steps);
      setAnswer(res.data.answer);
    } catch {
      setError("Backend not reachable");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h1>📘 NoteMath</h1>

      <p>Type math using keyboard or symbols</p>

      <MathInput onChange={setLatex} />

      <h3>Preview</h3>
      {latex && <BlockMath math={latex} />}

      <button
        onClick={solveMath}
        style={{ marginTop: "15px", padding: "10px" }}
      >
        Solve
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {steps.length > 0 && (
        <>
          <h3>Steps</h3>
          {steps.map((s, i) => (
            <p key={i}>
              {i + 1}. {s}
            </p>
          ))}
        </>
      )}

      {answer && (
        <>
          <h3>Final Answer</h3>
          <BlockMath math={answer} />
        </>
      )}
    </div>
  );
}
