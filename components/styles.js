// components/styles.js
// Design tokens + shared inline style objects for the React Hooks blog.
// Import: import { s, C, Divider } from "@/components/styles";

"use client";

import { motion } from "framer-motion";

export const C = {
  bg: "#ffffff",
  surface: "#ffffff",
  surfaceTint: "#f3f0fb",
  purple: "#5b21b6",
  purpleDeep: "#3b0764",
  purpleLight: "#ede9fe",
  purpleMid: "#ddd6fe",
  purpleDim: "#7c3aed",
  purpleBorder: "#c4b5fd",
  purpleHover: "#4c1d95",
  text: "#1a1523",
  textMid: "#4c4069",
  textMuted: "#8b7aa8",
  textFaint: "#c4b5fd",
  codeBg: "#f3f0fb",
  codeText: "#3b0764",
  codeBorder: "#ddd6fe",
  codeComment: "#7c3aed",
  border: "#e8e1f5",
  borderMid: "#ddd6fe",
  shadow: "0 1px 4px rgba(91,33,182,0.07), 0 4px 16px rgba(91,33,182,0.05)",
  shadowHover:
    "0 4px 16px rgba(91,33,182,0.14), 0 8px 32px rgba(91,33,182,0.08)",
};

const MONO = "'Overpass Mono', 'Courier New', monospace";

// Animated divider — draws itself in from the left on mount.
// <Divider />          subtle line
// <Divider accent />   deep purple gradient, use after headings
// <Divider delay={0.3} /> staggered entrance
export function Divider({ width = "100%", delay = 0, accent = false }) {
  return (
    <div style={{ margin: "2.5rem 0", overflow: "hidden" }}>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        style={{
          height: "1.5px",
          background: accent
            ? `linear-gradient(to right, ${C.purple}, ${C.purpleLight})`
            : `linear-gradient(to right, ${C.purpleMid}, ${C.bg})`,
          borderRadius: "999px",
        }}
      />
    </div>
  );
}

export const s = {
  section: {
    minHeight: "100vh",
    background: C.bg,
    color: C.text,
    fontFamily: "Georgia, 'Times New Roman', serif",
    padding: "4rem 2rem",
    maxWidth: "860px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    fontSize: "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: C.purple,
    background: C.purpleLight,
    border: `1px solid ${C.purpleBorder}`,
    borderRadius: "999px",
    padding: "4px 14px",
    marginBottom: "1.5rem",
    fontFamily: MONO,
    fontWeight: 500,
  },
  h1: {
    fontSize: "clamp(2rem, 6vw, 4rem)",
    fontWeight: 400,
    color: C.text,
    lineHeight: 1.15,
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.05rem",
    color: C.textMid,
    lineHeight: 1.8,
    maxWidth: "560px",
    marginBottom: "3.5rem",
  },
  divider: {
    height: "1px",
    background: C.border,
    margin: "2.5rem 0",
  },
  sectionLabel: {
    fontSize: "9px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: C.purpleDim,
    marginBottom: "1rem",
    fontFamily: MONO,
    fontWeight: 600,
  },
  stepCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: "12px",
    padding: "1.25rem 1.5rem",
    marginBottom: "0.75rem",
    boxShadow: C.shadow,
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "0.75rem",
  },
  stepNum: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: C.purpleLight,
    color: C.purple,
    fontSize: "11px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontFamily: MONO,
    border: `1px solid ${C.purpleBorder}`,
  },
  stepTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: C.text,
    fontFamily: MONO,
  },
  stepBody: {
    fontSize: "13px",
    color: C.textMid,
    lineHeight: 1.75,
    marginBottom: "0.75rem",
  },
  pre: {
    background: C.codeBg,
    border: `1px solid ${C.codeBorder}`,
    borderRadius: "10px",
    padding: "1rem 1.25rem",
    fontSize: "12px",
    color: C.codeText,
    fontFamily: MONO,
    overflowX: "auto",
    lineHeight: 1.75,
    margin: "0.5rem 0",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
  },
  inlineCode: {
    background: C.purpleLight,
    border: `1px solid ${C.purpleMid}`,
    borderRadius: "5px",
    padding: "1px 7px",
    fontSize: "12px",
    fontFamily: MONO,
    color: C.purple,
    fontWeight: 500,
  },
  bullet: {
    fontSize: "13px",
    color: C.textMid,
    lineHeight: 1.9,
    paddingLeft: "1.25rem",
    marginTop: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
    fontFamily: MONO,
    marginTop: "0.5rem",
  },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: "9px",
    color: C.purpleDim,
    borderBottom: `1px solid ${C.border}`,
    fontFamily: MONO,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: C.surfaceTint,
  },
  td: {
    padding: "10px 12px",
    borderBottom: `1px solid ${C.border}`,
    verticalAlign: "top",
    lineHeight: 1.5,
    color: C.textMid,
  },
  note: {
    background: C.purpleLight,
    borderLeft: `3px solid ${C.purple}`,
    borderRadius: "0 10px 10px 0",
    padding: "0.875rem 1.1rem",
    fontSize: "12px",
    color: C.textMid,
    fontFamily: MONO,
    lineHeight: 1.8,
    marginTop: "0.875rem",
  },
};
