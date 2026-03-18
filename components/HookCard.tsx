// components/HookCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { C } from "@/components/styles";
import type { HookEntry } from "@/data/hooks.data";

const MONO = "'Overpass Mono', 'Courier New', monospace";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function HookCard({
  hook,
  index,
}: {
  hook: HookEntry;
  index: number;
}) {
  const published = hook.status === "published";

  const card = (
    <motion.div
      {...fadeUp(index * 0.06)}
      whileHover={published ? { y: -3 } : {}}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: "14px",
        padding: "1.5rem 1.75rem",
        boxShadow: C.shadow,
        cursor: published ? "pointer" : "default",
        opacity: published ? 1 : 0.52,
        transition: "box-shadow 0.2s, transform 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (published)
          (e.currentTarget as HTMLDivElement).style.boxShadow = C.shadowHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = C.shadow;
      }}
    >
      {/* Number watermark */}
      <span
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "1.25rem",
          fontSize: "10px",
          fontFamily: MONO,
          color: C.textFaint,
          letterSpacing: "0.1em",
        }}
      >
        {hook.number}
      </span>

      {/* Hook name + badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "0.85rem",
        }}
      >
        <code
          style={{
            fontSize: "14px",
            fontFamily: MONO,
            fontWeight: 700,
            color: published ? C.purple : C.textMuted,
          }}
        >
          {hook.name}
        </code>
        {!published && (
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: MONO,
              color: C.textMuted,
              background: C.surfaceTint,
              border: `1px solid ${C.border}`,
              borderRadius: "999px",
              padding: "2px 10px",
            }}
          >
            coming soon
          </span>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "13px",
          color: C.textMid,
          lineHeight: 1.75,
          fontFamily: "Georgia, serif",
          margin: 0,
        }}
      >
        {hook.description}
      </p>

      {/* Read arrow */}
      {published && (
        <p
          style={{
            marginTop: "1rem",
            marginBottom: 0,
            fontSize: "11px",
            fontFamily: MONO,
            color: C.purpleDim,
            letterSpacing: "0.05em",
          }}
        >
          Read →
        </p>
      )}
    </motion.div>
  );

  return published ? (
    <Link href={`/hooks/${hook.slug}`} style={{ textDecoration: "none" }}>
      {card}
    </Link>
  ) : (
    card
  );
}
