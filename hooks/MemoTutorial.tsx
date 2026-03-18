// hooks/MemoTutorial.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

interface Comment {
  name: string;
  email: string;
}

const findLongestName = (comments: Comment[] | null): string => {
  if (!comments) return "";
  let longest = "";
  for (const c of comments) {
    if (c.name.length > longest.length) longest = c.name;
  }
  return longest;
};

export default function MemoTutorial() {
  const [data, setData] = useState<Comment[] | null>(null);
  const [toggle, setToggle] = useState(false);
  const [computeCount, setComputeCount] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const longestName = useMemo(() => {
    setComputeCount((prev) => prev + 1);
    return findLongestName(data);
  }, [data]);

  return (
    <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

      <div style={{
        background: C.surfaceTint,
        border: `1px solid ${C.border}`,
        borderRadius: "8px",
        padding: "10px 16px",
        maxWidth: "300px",
        textAlign: "center",
        fontSize: "12px",
        color: C.textMid,
        lineHeight: 1.6,
        wordBreak: "break-word",
      }}>
        {data ? (
          <><span style={{ color: C.textMuted }}>Longest name: </span>
          <strong style={{ color: C.purple }}>{longestName}</strong></>
        ) : (
          <span style={{ color: C.textMuted }}>Fetching comments…</span>
        )}
      </div>

      <div style={{
        fontSize: "11px",
        color: C.textMuted,
        background: C.purpleLight,
        border: `1px solid ${C.purpleBorder}`,
        borderRadius: "6px",
        padding: "4px 12px",
      }}>
        Computed <strong style={{ color: C.purple }}>{computeCount}</strong> time(s)
      </div>

      <button
        onClick={() => setToggle((prev) => !prev)}
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
        Toggle (re-render)
      </button>

      {toggle && (
        <span style={{ fontSize: "12px", color: C.purpleDim }}>
          Toggled — but compute count didn't increase ✓
        </span>
      )}
    </div>
  );
}
