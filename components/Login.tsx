// components/Login.tsx
"use client";

import React, { useContext } from "react";
import { AppContext } from "@/hooks/ContextTutorial";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function Login() {
  const ctx = useContext(AppContext);
  if (!ctx) return null;
  const { setUsername } = ctx;

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        placeholder="Enter username..."
        onChange={(e) => setUsername(e.target.value)}
        style={{
          fontFamily: MONO,
          fontSize: "13px",
          color: C.text,
          background: C.surfaceTint,
          border: `1px solid ${C.purpleBorder}`,
          borderRadius: "8px",
          padding: "8px 14px",
          outline: "none",
          width: "180px",
        }}
      />
    </div>
  );
}
