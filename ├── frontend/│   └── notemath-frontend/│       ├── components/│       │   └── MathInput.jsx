import { useEffect, useRef } from "react";
import "mathlive";

/*
This component creates a math keyboard.
User types math → we convert it to LaTeX.
*/

export default function MathInput({ onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    const mf = ref.current;
    if (!mf) return;

    // Listen when user types math
    mf.addEventListener("input", () => {
      const latex = mf.getValue("latex");
      onChange(latex);
    });
  }, [onChange]);

  return (
    <math-field
      ref={ref}
      style={{
        width: "100%",
        fontSize: "1.4rem",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    />
  );
}
