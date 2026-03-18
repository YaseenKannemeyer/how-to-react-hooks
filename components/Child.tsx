// components/Child.tsx
"use client";

import React, { useEffect } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

interface ChildProps {
  returnComment: (name: string) => string;
}

export default function Child({ returnComment }: ChildProps) {
  useEffect(() => {
    console.log("Child re-rendered");
  });

  return (
    <div style={{
      fontFamily: MONO,
      fontSize: "13px",
      color: C.textMid,
      background: C.surfaceTint,
      border: `1px solid ${C.border}`,
      borderRadius: "8px",
      padding: "10px 16px",
      maxWidth: "280px",
      textAlign: "center",
      lineHeight: 1.6,
    }}>
      {returnComment(" — thanks!")}
    </div>
  );
}
