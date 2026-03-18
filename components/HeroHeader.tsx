// components/HeroHeader.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { C } from "@/components/styles";

const MONO = "'Overpass Mono', 'Courier New', monospace";
const SERIF = "'Lora', Georgia, serif";

// ── Floating code fragments ────────────────────────────────────
const CODE_FRAGMENTS = [
  "useState(0)",
  "useEffect(() => {",
  "}, [deps])",
  "useRef(null)",
  "useCallback(",
  "useMemo(() =>",
  "useContext(Ctx)",
  "useReducer(",
  "dispatch({",
  "const [state,",
  "setState(",
  "return () => {",
  "cleanup()",
  "[ ]",
  "prev => prev + 1",
  "event.target.value",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  text: string;
  opacity: number;
  size: number;
}

function useParticles(count: number): Particle[] {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 18 + Math.random() * 24,
        delay: Math.random() * -30,
        text: CODE_FRAGMENTS[i % CODE_FRAGMENTS.length],
        opacity: 0.035 + Math.random() * 0.055,
        size: 11 + Math.random() * 4,
      })),
    );
  }, [count]);
  return particles;
}

// ── Word-by-word reveal ────────────────────────────────────────
function WordReveal({
  text,
  delay = 0,
  color,
  style = {},
}: {
  text: string;
  delay?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            marginRight: "0.26em",
          }}
        >
          <motion.span
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1] as const,
                    delay: delay + i * 0.08,
                  }
            }
            style={{
              display: "inline-block",
              color: color ?? C.text,
              ...style,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function HeroHeader({
  authorName = "Yaseen",
}: {
  authorName?: string;
}) {
  const particles = useParticles(18);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  const scrollToHooks = () => {
    document
      .getElementById("hook-grid")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: C.bg,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* ── Background grid + vignette ── */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <svg
          aria-hidden="true"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, opacity: 0.04 }}
        >
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke={C.purple}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 90% 90% at 40% 55%, transparent 25%, ${C.bg} 100%)`,
          }}
        />
      </motion.div>

      {/* ── Floating fragments ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: "110vh" }}
            animate={{ y: "-20vh" }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontFamily: MONO,
              fontSize: `${p.size}px`,
              color: C.purple,
              opacity: p.opacity,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {p.text}
          </motion.span>
        ))}
      </div>

      {/* ── Content ── */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          position: "relative",
          zIndex: 10,
          padding: "0 clamp(1.75rem, 7vw, 5rem)",
          maxWidth: "900px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* ── Top meta row ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "3rem",
          }}
        >
          {/* Live dot */}
          <motion.span
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: C.purple,
              flexShrink: 0,
              display: "inline-block",
            }}
          />

          {/* Label chips */}
          {["React 18+", "Visual Guide", "16 Hooks"].map((label, i) => (
            <React.Fragment key={label}>
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: MONO,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: i === 0 ? C.purple : C.textMuted,
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {label}
              </span>
              {i < 2 && (
                <span
                  style={{
                    fontSize: "10px",
                    color: C.purpleMid,
                    fontFamily: MONO,
                  }}
                >
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ── Top rule ── */}
        <div style={{ marginBottom: "2.25rem", overflow: "hidden" }}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: 0.2,
            }}
            style={{
              height: "1px",
              background: `linear-gradient(to right, ${C.purple}, ${C.purpleLight}, transparent)`,
            }}
          />
        </div>

        {/* ── Main heading ── */}
        <h1
          style={{
            fontSize: "clamp(2.8rem, 7.5vw, 6rem)",
            fontFamily: SERIF,
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            margin: "0 0 0.15em",
            color: C.text,
          }}
        >
          <span style={{ display: "block" }}>
            <WordReveal text="Master every" delay={0.35} />
          </span>
          <span style={{ display: "block" }}>
            <WordReveal text="React" delay={0.52} color={C.textMid} />{" "}
            <WordReveal
              text="Hook."
              delay={0.6}
              color={C.purple}
              style={{
                fontStyle: "normal",
                fontFamily: MONO,
                fontSize: "0.78em",
                letterSpacing: "-0.04em",
                fontWeight: 600,
              }}
            />
          </span>
        </h1>

        {/* ── Sub rule ── */}
        <div style={{ margin: "2rem 0 1.75rem", overflow: "hidden" }}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "35%" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
            style={{ height: "1px", background: C.purpleBorder }}
          />
        </div>

        {/* ── Subtitle ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.0 }}
          style={{
            fontSize: "14px",
            fontFamily: MONO,
            color: C.textMid,
            lineHeight: 1.9,
            maxWidth: "480px",
            margin: "0 0 2.75rem",
            letterSpacing: "0.01em",
          }}
        >
          From <span style={{ color: C.text, fontWeight: 600 }}>useState</span>{" "}
          to{" "}
          <span style={{ color: C.text, fontWeight: 600 }}>
            useImperativeHandle,
          </span>{" "}
          every hook explained with working examples, pitfalls, and the mental
          models that make them click.
        </motion.p>

        {/* ── Button row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* Primary CTA */}
          <button
            onClick={scrollToHooks}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: MONO,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ffffff",
              background: C.purple,
              border: `1.5px solid ${C.purple}`,
              borderRadius: "4px",
              padding: "12px 28px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = C.purpleDeep;
              el.style.borderColor = C.purpleDeep;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = `0 8px 24px rgba(91,33,182,0.35)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = C.purple;
              el.style.borderColor = C.purple;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            Start learning
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>

        {/* ── Author tag — bottom left, subtle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "3.5rem",
            paddingTop: "2rem",
            borderTop: `1px solid ${C.border}`,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: C.purpleLight,
              border: `1px solid ${C.purpleBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: "11px",
              color: C.purple,
              flexShrink: 0,
            }}
          >
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                fontWeight: 600,
                color: C.text,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {authorName}
            </p>
            <p
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                color: C.textMuted,
                margin: 0,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Author · React 18+ · Next.js App Router
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Bottom fade ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: `linear-gradient(to bottom, transparent, ${C.bg})`,
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </div>
  );
}
