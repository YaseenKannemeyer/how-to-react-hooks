// hooks/EffectTutorial.tsx
"use client";

import React, { useEffect, useState } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function EffectTutorial() {
  const [data, setData] = useState<string>("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((json) => {
        setData(json[0].email);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

      {/* Fetched data */}
      <div style={{
        background: C.surfaceTint,
        border: `1px solid ${C.border}`,
        borderRadius: "8px",
        padding: "10px 16px",
        fontSize: "12px",
        color: C.purpleDim,
        maxWidth: "280px",
        textAlign: "center",
        wordBreak: "break-all",
      }}>
        {loading ? (
          <span style={{ color: C.textMuted }}>Fetching…</span>
        ) : (
          <><span style={{ color: C.textMuted }}>email: </span>{data}</>
        )}
      </div>

      {/* Counter */}
      <span style={{ fontSize: "2.5rem", fontWeight: 700, color: C.purple, lineHeight: 1 }}>
        {count}
      </span>

      <button
        onClick={() => setCount((prev) => prev + 1)}
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
        Increment counter
      </button>

      <p style={{ fontSize: "11px", color: C.textMuted, margin: 0, textAlign: "center" }}>
        Counter re-renders the component — the fetch does not re-run (empty deps [])
      </p>
    </div>
  );
}
