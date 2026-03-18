// hooks/LayoutEffectTutorial.tsx
"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function LayoutEffectTutorial() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [log, setLog] = useState<string[]>([]);

  useLayoutEffect(() => {
    // Fires synchronously after DOM paint — before browser has shown anything
    const val = inputRef.current?.value ?? "";
    setLog((prev) => [...prev, `useLayoutEffect read: "${val}"`]);
  }, []);

  useEffect(() => {
    // Fires after paint — sets the value AFTER layoutEffect already read ""
    if (inputRef.current) {
      inputRef.current.value = "HELLO";
    }
    setLog((prev) => [...prev, `useEffect set input to: "HELLO"`]);
  }, []);

  return (
    <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <input
        ref={inputRef}
        placeholder="Watch the log below..."
        style={{
          fontFamily: MONO,
          fontSize: "13px",
          color: C.text,
          background: C.surfaceTint,
          border: `1px solid ${C.purpleBorder}`,
          borderRadius: "8px",
          padding: "8px 14px",
          outline: "none",
          width: "220px",
        }}
      />

      <div style={{
        width: "100%",
        maxWidth: "320px",
        background: C.surfaceTint,
        border: `1px solid ${C.border}`,
        borderRadius: "8px",
        padding: "10px 14px",
      }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textMuted, margin: "0 0 8px" }}>
          Execution log
        </p>
        {log.map((entry, i) => (
          <p key={i} style={{
            fontSize: "11px",
            color: i === 0 ? C.purple : C.purpleDim,
            margin: "4px 0",
            lineHeight: 1.5,
          }}>
            {i + 1}. {entry}
          </p>
        ))}
      </div>

      <p style={{ fontSize: "11px", color: C.textMuted, margin: 0, textAlign: "center", maxWidth: "280px", lineHeight: 1.6 }}>
        useLayoutEffect fires before the browser paints — it read the empty value before useEffect set "HELLO"
      </p>
    </div>
  );
}
