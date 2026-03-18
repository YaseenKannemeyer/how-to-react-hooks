// components/User.tsx
"use client";

import React, { useContext } from "react";
import { AppContext } from "@/hooks/ContextTutorial";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function User() {
  const ctx = useContext(AppContext);
  if (!ctx) return null;
  const { username } = ctx;

  return (
    <div style={{
      fontFamily: MONO,
      fontSize: "13px",
      color: C.purpleDim,
      background: C.surfaceTint,
      border: `1px solid ${C.border}`,
      borderRadius: "8px",
      padding: "8px 14px",
      minWidth: "180px",
      textAlign: "center",
    }}>
      {username ? <>Logged in as <strong style={{ color: C.purple }}>{username}</strong></> : "Not logged in"}
    </div>
  );
}
