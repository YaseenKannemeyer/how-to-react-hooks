// hooks/StateTutorial.tsx
"use client";

import React, { useState } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function StateTutorial() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState("Yaseen");

  const increment = () => setCounter((prev) => prev + 1);
  const decrement = () => setCounter((prev) => prev - 1);
  const reset = () => setCounter(0);

  return (
    <div style={{ fontFamily: MONO }}>

      {/* Counter */}
      <div style={{
        marginBottom: "1.5rem",
        paddingBottom: "1.5rem",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <p style={{
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.textMuted,
          marginBottom: "0.75rem",
        }}>
          Counter
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: C.purple,
            minWidth: "60px",
            textAlign: "center",
            lineHeight: 1,
          }}>
            {counter}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { label: "−", action: decrement },
              { label: "+", action: increment },
              { label: "reset", action: reset },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                style={{
                  fontFamily: MONO,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: C.purple,
                  background: C.purpleLight,
                  border: `1px solid ${C.purpleBorder}`,
                  borderRadius: "8px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  transition: "background 0.15s, transform 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = C.purpleMid;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = C.purpleLight;
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Controlled input */}
      <div>
        <p style={{
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.textMuted,
          marginBottom: "0.75rem",
        }}>
          Controlled input
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
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
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = C.purple;
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLInputElement).style.borderColor = C.purpleBorder;
            }}
          />
          <span style={{ fontSize: "11px", color: C.textMuted }}>→</span>
          <span style={{
            fontSize: "13px",
            color: C.purple,
            fontWeight: 600,
            minWidth: "80px",
          }}>
            {inputValue || <span style={{ color: C.textFaint, fontStyle: "italic" }}>empty</span>}
          </span>
        </div>
      </div>
    </div>
  );
}
