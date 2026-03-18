// hooks/ReducerTutorial.tsx
"use client";

import React, { useReducer } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

interface State {
  count: number;
  showText: boolean;
}

type Action =
  | { type: "INCREMENT" }
  | { type: "toggleShowText" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "toggleShowText":
      return { ...state, showText: !state.showText };
    default:
      return state;
  }
};

export default function ReducerTutorial() {
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <span style={{ fontSize: "2.5rem", fontWeight: 700, color: C.purple, lineHeight: 1 }}>
        {state.count}
      </span>

      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "toggleShowText" });
        }}
        style={{
          fontFamily: MONO,
          fontSize: "12px",
          fontWeight: 600,
          color: C.bg,
          background: C.purple,
          border: "none",
          borderRadius: "8px",
          padding: "8px 20px",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = C.purpleDeep)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = C.purple)}
      >
        Increment + toggle text
      </button>

      {state.showText && (
        <p style={{ fontSize: "13px", color: C.textMid, textAlign: "center", maxWidth: "260px", lineHeight: 1.6, margin: 0 }}>
          This text toggles with every click — dispatched alongside the increment.
        </p>
      )}
    </div>
  );
}
