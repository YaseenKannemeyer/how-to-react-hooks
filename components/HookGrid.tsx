// components/HookGrid.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import HookCard from "@/components/HookCard";
import { HOOKS } from "@/data/hooks.data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function HookGrid() {
  return (
    <div id="hook-grid" style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>All hooks</span>
      </motion.div>

      <motion.h2
        {...fadeUp(0.07)}
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
          fontWeight: 400,
          color: C.text,
          lineHeight: 1.2,
          marginBottom: "1rem",
        }}
      >
        Choose a hook
      </motion.h2>

      <motion.p {...fadeUp(0.13)} style={s.subtitle}>
        Each guide covers the mental model, common pitfalls, and a live
        interactive demo — so you understand not just the API, but the{" "}
        <em>why</em>.
      </motion.p>

      <Divider accent delay={0.2} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "14px",
          marginTop: "1rem",
        }}
      >
        {HOOKS.map((hook, i) => (
          <HookCard key={hook.slug} hook={hook} index={i} />
        ))}
      </div>

      <div style={{ height: "4rem" }} />
    </div>
  );
}
