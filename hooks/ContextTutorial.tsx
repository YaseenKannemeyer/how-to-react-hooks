// hooks/ContextTutorial.tsx
"use client";

import React, { useState, createContext } from "react";
import Login from "@/components/Login";
import User from "@/components/User";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";

interface AppContextType {
  username: string;
  setUsername: (val: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export default function ContextTutorial() {
  const [username, setUsername] = useState("");

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      <div style={{ fontFamily: MONO, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

        <div style={{
          background: C.surfaceTint,
          border: `1px solid ${C.border}`,
          borderRadius: "8px",
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          maxWidth: "280px",
        }}>
          <p style={{ fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: C.textMuted, margin: 0 }}>
            AppContext.Provider
          </p>

          <div style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: "6px",
            padding: "10px 14px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.textMuted, margin: 0 }}>
              Login (child)
            </p>
            <Login />
          </div>

          <div style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: "6px",
            padding: "10px 14px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.textMuted, margin: 0 }}>
              User (child)
            </p>
            <User />
          </div>
        </div>

        <p style={{ fontSize: "11px", color: C.textMuted, margin: 0, textAlign: "center", maxWidth: "280px", lineHeight: 1.6 }}>
          No props passed between Login and User — they both read from context
        </p>
      </div>
    </AppContext.Provider>
  );
}
