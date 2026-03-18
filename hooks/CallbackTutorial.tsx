// hooks/CallbackTutorial.tsx
"use client";

import React, { useCallback, useState } from "react";
import Child from "@/components/Child";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function CallbackTutorial() {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState("Yo, please star the repo!");
  const [renderCount, setRenderCount] = useState(0);

  const returnComment = useCallback(
    (name: string) => data + name,
    [data]
  );

  return (
    <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

      <Child returnComment={returnComment} />

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => { setToggle((prev) => !prev); setRenderCount((prev) => prev + 1); }}
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            fontWeight: 600,
            color: C.purple,
            background: C.purpleLight,
            border: `1px solid ${C.purpleBorder}`,
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Toggle (re-render parent)
        </button>

        <button
          onClick={() => { setData("New message!"); setRenderCount((prev) => prev + 1); }}
          style={{
            fontFamily: MONO,
            fontSize: "12px",
            fontWeight: 600,
            color: C.bg,
            background: C.purple,
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Change data
        </button>
      </div>

      {toggle && (
        <span style={{ fontSize: "12px", color: C.purpleDim }}>toggled</span>
      )}

      <p style={{ fontSize: "11px", color: C.textMuted, margin: 0, textAlign: "center", maxWidth: "280px", lineHeight: 1.6 }}>
        Toggle re-renders parent but Child keeps the same function reference — check console for re-render logs
      </p>
    </div>
  );
}
