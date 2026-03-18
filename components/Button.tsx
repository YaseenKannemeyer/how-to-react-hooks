// components/Button.tsx
"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export interface ButtonHandle {
  alterToggle: () => void;
}

const Button = forwardRef<ButtonHandle>((_, ref) => {
  const [toggle, setToggle] = useState(false);

  useImperativeHandle(ref, () => ({
    alterToggle() {
      setToggle((prev) => !prev);
    },
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <button
        onClick={() => setToggle((prev) => !prev)}
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
        }}
      >
        Button (child)
      </button>
      {toggle && (
        <span style={{
          fontSize: "12px",
          fontFamily: MONO,
          color: C.purpleDim,
          background: C.surfaceTint,
          border: `1px solid ${C.border}`,
          borderRadius: "6px",
          padding: "4px 12px",
        }}>
          Toggle is ON
        </span>
      )}
    </div>
  );
});

Button.displayName = "Button";
export default Button;
