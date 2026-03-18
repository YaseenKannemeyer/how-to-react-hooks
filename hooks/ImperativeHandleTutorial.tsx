// hooks/ImperativeHandleTutorial.tsx
"use client";

import React, { useRef } from "react";
import Button, { ButtonHandle } from "@/components/Button";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function ImperativeHandleTutorial() {
  const buttonRef = useRef<ButtonHandle>(null);

  return (
    <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

      <button
        onClick={() => buttonRef.current?.alterToggle()}
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
        Trigger from parent
      </button>

      <div style={{
        width: "100%",
        maxWidth: "280px",
        background: C.surfaceTint,
        border: `1px solid ${C.border}`,
        borderRadius: "8px",
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}>
        <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textMuted, margin: 0 }}>
          Child component
        </p>
        <Button ref={buttonRef} />
      </div>

      <p style={{ fontSize: "11px", color: C.textMuted, margin: 0, textAlign: "center", maxWidth: "280px", lineHeight: 1.6 }}>
        The parent calls <code style={{ color: C.purple }}>alterToggle()</code> on the child via ref — without prop drilling
      </p>
    </div>
  );
}
