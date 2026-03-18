// hooks/RefTutorial.tsx
"use client";

import React, { useRef } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function RefTutorial() {
  const inputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const onClick = () => {
    if (!inputRef.current || !headingRef.current) return;
    headingRef.current.innerText = inputRef.current.value || "Yaseen";
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <h2
        ref={headingRef}
        style={{ fontSize: "1.5rem", fontWeight: 700, color: C.purple, margin: 0 }}
      >
        Yaseen
      </h2>

      <input
        ref={inputRef}
        placeholder="Enter a name..."
        style={{
          fontFamily: MONO,
          fontSize: "13px",
          color: C.text,
          background: C.surfaceTint,
          border: `1px solid ${C.purpleBorder}`,
          borderRadius: "8px",
          padding: "8px 14px",
          outline: "none",
          width: "200px",
        }}
        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = C.purple)}
        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = C.purpleBorder)}
      />

      <button
        onClick={onClick}
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
        Change name
      </button>

      <p style={{ fontSize: "11px", color: C.textMuted, margin: 0, textAlign: "center" }}>
        No re-render — useRef reads the DOM directly
      </p>
    </div>
  );
}
