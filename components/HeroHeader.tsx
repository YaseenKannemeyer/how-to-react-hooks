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

const HOOK_NAMES = [
  "useState",
  "useEffect",
  "useRef",
  "useContext",
  "useReducer",
  "useMemo",
  "useCallback",
  "useId",
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
        opacity: 0.04 + Math.random() * 0.07,
        size: 11 + Math.random() * 5,
      })),
    );
  }, [count]);
  return particles;
}

function HookTicker() {
  const [index, setIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % HOOK_NAMES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: "block",
        position: "relative",
        height: "1.25em",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {HOOK_NAMES.map((name, i) => (
        <motion.span
          key={name}
          initial={{ y: "100%", opacity: 0 }}
          animate={
            i === index
              ? { y: "0%", opacity: 1 }
              : i === (index - 1 + HOOK_NAMES.length) % HOOK_NAMES.length
                ? { y: "-100%", opacity: 0 }
                : { y: "100%", opacity: 0 }
          }
          transition={
            shouldReduce
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
          }
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "block",
            textAlign: "center",
            fontFamily: MONO,
            color: C.purple,
            fontWeight: 700,
          }}
        >
          {name}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroHeader({
  authorName = "Yaseen",
}: {
  authorName?: string;
}) {
  const particles = useParticles(16);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

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
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: C.bg,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {/* Background grid */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <pattern
              id="grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke={C.purpleMid}
                strokeWidth="0.5"
                opacity="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, ${C.bg} 100%)`,
          }}
        />
      </motion.div>

      {/* Floating code fragments */}
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

      {/* Brackets — desktop only */}
      <style>{`
        .hero-bracket { display: none; }
        @media (min-width: 900px) { .hero-bracket { display: block; } }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>

      <motion.span
        className="hero-bracket"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.18, x: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: 0.6,
        }}
        style={{
          fontFamily: MONO,
          fontSize: "clamp(4rem, 10vw, 8rem)",
          color: C.purple,
          lineHeight: 1,
          userSelect: "none",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "1.5rem",
        }}
      >
        {"{"}
      </motion.span>

      <motion.span
        className="hero-bracket"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.18, x: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: 0.6,
        }}
        style={{
          fontFamily: MONO,
          fontSize: "clamp(4rem, 10vw, 8rem)",
          color: C.purple,
          lineHeight: 1,
          userSelect: "none",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          right: "1.5rem",
        }}
      >
        {"}"}
      </motion.span>

      {/* Hero content */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "2rem clamp(1.5rem, 8vw, 6rem)",
          width: "100%",
          maxWidth: "860px",
          boxSizing: "border-box",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.1,
          }}
          style={{ marginBottom: "2rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: MONO,
              color: C.purple,
              background: C.purpleLight,
              border: `1px solid ${C.purpleBorder}`,
              borderRadius: "999px",
              padding: "5px 16px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: C.purple,
                flexShrink: 0,
                animation: "heroPulse 2s ease-in-out infinite",
              }}
            />
            Visual guide · React 18+
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2rem, 7vw, 5rem)",
              fontWeight: 400,
              color: C.text,
              lineHeight: 1.1,
              margin: "0 0 0.4em",
              letterSpacing: "-0.01em",
            }}
          >
            How to React
          </h1>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2rem, 7vw, 5rem)",
              fontWeight: 400,
              color: C.text,
              lineHeight: 1.1,
              margin: "0 0 1em",
              letterSpacing: "-0.01em",
            }}
          >
            <HookTicker />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            color: C.textMid,
            lineHeight: 1.8,
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
          }}
        >
          Deep-dive visual guides to every React hook — working examples, real
          pitfalls, and the mental models that finally make them click.
        </motion.p>

        {/* Author + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.48,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: C.purpleLight,
                border: `1.5px solid ${C.purpleBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "13px",
                color: C.purple,
                flexShrink: 0,
              }}
            >
              {authorName.charAt(0).toUpperCase()}
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: "12px",
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
                  fontSize: "10px",
                  color: C.textMuted,
                  margin: 0,
                  letterSpacing: "0.06em",
                }}
              >
                Author
              </p>
            </div>
          </div>

          {/* Dot divider */}
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: C.purpleMid,
              flexShrink: 0,
            }}
          />

          {/* CTA */}
          <button
            onClick={scrollToHooks}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: MONO,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: C.bg,
              background: C.purple,
              border: "none",
              borderRadius: "999px",
              padding: "10px 24px",
              cursor: "pointer",
              transition: "background 0.18s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                C.purpleDeep;
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                C.purple;
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            Explore hooks
            <span style={{ fontSize: "14px", lineHeight: 1 }}>↓</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: `linear-gradient(to bottom, transparent, ${C.bg})`,
          pointerEvents: "none",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "20px",
            height: "32px",
            borderRadius: "999px",
            border: `1.5px solid ${C.purpleBorder}`,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "4px 0",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "8px",
              borderRadius: "999px",
              background: C.purple,
              opacity: 0.7,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
