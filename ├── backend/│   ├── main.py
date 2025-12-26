# ---------- IMPORTS ----------
from fastapi import FastAPI
from pydantic import BaseModel
from sympy import symbols, integrate
from sympy.parsing.latex import parse_latex

# ---------- APP INIT ----------
app = FastAPI()

# symbolic variable (NOT a number)
x = symbols("x")

# ---------- INPUT FORMAT ----------
# expected JSON:
# { "latex": "\\int x^2 dx" }
class Input(BaseModel):
    latex: str

# ---------- HEALTH CHECK ----------
@app.get("/")
def root():
    return {"status": "NoteMath backend running"}

# ---------- CORE SOLVER ----------
@app.post("/solve")
def solve(data: Input):
    try:
        # remove integral sign and dx
        # because SymPy integrates expressions, not symbols
        cleaned = (
            data.latex
            .replace("\\int", "")
            .replace("dx", "")
            .strip()
        )

        # convert LaTeX → SymPy expression
        expr = parse_latex(cleaned)

        # integrate with respect to x
        result = integrate(expr, x)

        return {
            "steps": [
                f"Given the integral {data.latex}",
                "Identify the power of x",
                "Increase the power by 1",
                "Divide by the new power",
                "Add constant of integration C"
            ],
            "answer": f"{result} + C"
        }

    except Exception as e:
        return {
            "error": "Invalid or unsupported expression"
        }
