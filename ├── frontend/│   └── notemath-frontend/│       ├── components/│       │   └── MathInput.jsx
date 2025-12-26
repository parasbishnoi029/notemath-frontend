import { useEffect, useRef } from "react";
import "mathlive";

export default function MathInput({ onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    const mf = ref.current;
    if (!mf) return;

    mf.addEventListener("input", () => {
      onChange(mf.getValue("latex"));
    });
  }, [onChange]);

  return (
    <math-field
      ref={ref}
      style={{
        width: "100%",
        fontSize: "1.5rem",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    />
  );
}
