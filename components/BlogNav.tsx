// components/BlogNav.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { C } from "@/components/styles";
import { HOOKS } from "@/data/hooks.data";

const MONO = "'Overpass Mono', 'Courier New', monospace";

// Group hooks by published status for display
const PUBLISHED = HOOKS.filter((h) => h.status === "published");
const COMING_SOON = HOOKS.filter((h) => h.status === "coming-soon");

// ── Desktop nav item with animated hover ──────────────────────
function NavItem({
  hook,
  active,
}: {
  hook: (typeof HOOKS)[number];
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const published = hook.status === "published";
  const href = `/hooks/${hook.slug}`;

  const showHighlight = active || hovered;
  const labelColor = active
    ? C.purple
    : hovered && published
      ? C.purpleDeep
      : C.textMuted;
  const dotColor = active
    ? C.purple
    : hovered && published
      ? C.purpleDim
      : C.purpleBorder;

  const inner = (
    <div
      onMouseEnter={() => published && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "4px 10px 4px 12px",
        borderRadius: "6px",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: published ? "pointer" : "default",
        opacity: published ? 1 : 0.4,
      }}
    >
      {/* Sliding background */}
      <motion.div
        animate={{
          x: showHighlight && published ? "0%" : "-100%",
          opacity: showHighlight && published ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          position: "absolute",
          inset: 0,
          background: active ? C.purpleLight : C.surfaceTint,
          borderRadius: "6px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Active left bar */}
      <motion.div
        animate={{
          opacity: active ? 1 : hovered && published ? 0.4 : 0,
          scaleY: active ? 1 : hovered && published ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.18 }}
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: "2.5px",
          background: active ? C.purple : C.purpleDim,
          borderRadius: "999px",
          transformOrigin: "center",
          zIndex: 1,
        }}
      />

      {/* Dot */}
      <motion.div
        animate={{
          background: dotColor,
          scale: active ? 1.15 : hovered && published ? 1 : 0.65,
        }}
        transition={{ duration: 0.18 }}
        style={{
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          flexShrink: 0,
          zIndex: 1,
          position: "relative",
        }}
      />

      {/* Label */}
      <motion.span
        animate={{
          color: labelColor,
          x: hovered && !active && published ? 2 : 0,
        }}
        transition={{ duration: 0.18 }}
        style={{
          fontSize: "11px",
          fontFamily: MONO,
          fontWeight: active ? 600 : hovered && published ? 500 : 400,
          whiteSpace: "nowrap",
          zIndex: 1,
          position: "relative",
          flex: 1,
        }}
      >
        {hook.name}
      </motion.span>

      {/* Number */}
      <span
        style={{
          fontSize: "9px",
          fontFamily: MONO,
          color: active ? C.purpleDim : C.textFaint,
          letterSpacing: "0.06em",
          zIndex: 1,
          position: "relative",
        }}
      >
        {hook.number}
      </span>
    </div>
  );

  return published ? (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  );
}

// ── Desktop sidebar ───────────────────────────────────────────
function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "220px",
        height: "100vh",
        background: C.surfaceTint,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        padding: "2rem 0 1.5rem",
        zIndex: 100,
        overflowY: "auto",
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        style={{
          textDecoration: "none",
          padding: "0 1.5rem",
          marginBottom: "2rem",
          display: "block",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontFamily: MONO,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.purple,
            display: "block",
          }}
        >
          How to React
        </span>
        <span
          style={{
            fontSize: "9px",
            fontFamily: MONO,
            color: C.textMuted,
            letterSpacing: "0.08em",
            marginTop: "2px",
            display: "block",
          }}
        >
          Hooks · visual guide
        </span>
        <div
          style={{
            height: "1.5px",
            background: `linear-gradient(to right, ${C.purpleMid}, transparent)`,
            marginTop: "10px",
            borderRadius: "999px",
          }}
        />
      </Link>

      {/* Published hooks */}
      <div style={{ marginBottom: "1rem" }}>
        <p
          style={{
            fontSize: "8px",
            fontFamily: MONO,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.purpleBorder,
            padding: "0 1.5rem",
            marginBottom: "0.4rem",
          }}
        >
          Published
        </p>
        {PUBLISHED.map((hook) => (
          <NavItem
            key={hook.slug}
            hook={hook}
            active={pathname === `/hooks/${hook.slug}`}
          />
        ))}
      </div>

      {/* Coming soon hooks */}
      <div>
        <p
          style={{
            fontSize: "8px",
            fontFamily: MONO,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.purpleBorder,
            padding: "0 1.5rem",
            marginBottom: "0.4rem",
          }}
        >
          Coming soon
        </p>
        {COMING_SOON.map((hook) => (
          <NavItem key={hook.slug} hook={hook} active={false} />
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Footer */}
      <p
        style={{
          fontSize: "9px",
          fontFamily: MONO,
          color: C.textFaint,
          padding: "0 1.5rem",
          letterSpacing: "0.06em",
          lineHeight: 1.6,
        }}
      >
        React 18+ · Next.js App Router
      </p>
    </nav>
  );
}

// ── Mobile bottom sheet ───────────────────────────────────────
function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  const activeHook = HOOKS.find((h) => pathname === `/hooks/${h.slug}`);
  const isHome = pathname === "/";

  return (
    <>
      {/* Floating pill trigger */}
      <motion.div
        onClick={() => setOpen((o) => !o)}
        whileHover={{
          scale: 1.02,
          boxShadow: `0 6px 24px rgba(91,33,182,0.18)`,
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: C.surface,
          border: `1px solid ${C.purpleMid}`,
          borderRadius: "999px",
          padding: "9px 20px",
          cursor: "pointer",
          boxShadow: C.shadowHover,
          userSelect: "none",
        }}
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ fontSize: "8px", color: C.purpleDim, lineHeight: 1 }}
        >
          ▲
        </motion.span>
        <span
          style={{
            fontSize: "11px",
            color: C.textMid,
            fontFamily: MONO,
            whiteSpace: "nowrap",
          }}
        >
          {activeHook?.name ?? (isHome ? "Home" : "Navigate")}
        </span>
        <motion.div
          animate={{ background: open ? C.purpleDim : C.purple }}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
      </motion.div>

      {/* Backdrop + sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(91,33,182,0.07)",
                backdropFilter: "blur(3px)",
                zIndex: 90,
              }}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 95,
                background: C.surface,
                borderTop: `2px solid ${C.purpleMid}`,
                borderRadius: "20px 20px 0 0",
                padding: "1rem 1.5rem 3.5rem",
                maxHeight: "72vh",
                overflowY: "auto",
                boxShadow: `0 -8px 40px rgba(91,33,182,0.1)`,
              }}
            >
              {/* Drag handle */}
              <div
                style={{
                  width: "36px",
                  height: "3px",
                  borderRadius: "999px",
                  background: C.purpleMid,
                  margin: "0 auto 1.5rem",
                }}
              />

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: "12px",
                      fontWeight: 700,
                      color: C.purple,
                      margin: 0,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    How to React
                  </p>
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: "9px",
                      color: C.textMuted,
                      margin: "2px 0 0",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Hooks · visual guide
                  </p>
                </div>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    color: C.purple,
                    textDecoration: "none",
                    background: C.purpleLight,
                    border: `1px solid ${C.purpleBorder}`,
                    borderRadius: "6px",
                    padding: "4px 10px",
                    letterSpacing: "0.06em",
                  }}
                >
                  Home
                </Link>
              </div>

              {/* Published */}
              <p
                style={{
                  fontSize: "8px",
                  fontFamily: MONO,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.purpleBorder,
                  marginBottom: "0.75rem",
                }}
              >
                Published
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "1.5rem",
                }}
              >
                {PUBLISHED.map((hook) => {
                  const isActive = pathname === `/hooks/${hook.slug}`;
                  return (
                    <motion.div
                      key={hook.slug}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={`/hooks/${hook.slug}`}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: isActive ? C.purpleLight : C.surfaceTint,
                          border: `1px solid ${isActive ? C.purple : C.border}`,
                          color: isActive ? C.purple : C.textMid,
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontFamily: MONO,
                          fontWeight: isActive ? 600 : 400,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isActive && (
                          <span
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: C.purple,
                              flexShrink: 0,
                              display: "inline-block",
                            }}
                          />
                        )}
                        {hook.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Coming soon */}
              <p
                style={{
                  fontSize: "8px",
                  fontFamily: MONO,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.purpleBorder,
                  marginBottom: "0.75rem",
                }}
              >
                Coming soon
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {COMING_SOON.map((hook) => (
                  <span
                    key={hook.slug}
                    style={{
                      display: "inline-block",
                      background: C.surfaceTint,
                      border: `1px solid ${C.border}`,
                      color: C.textFaint,
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontFamily: MONO,
                      opacity: 0.6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {hook.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function BlogNav() {
  const pathname = usePathname() ?? "/";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? (
    <MobileNav pathname={pathname} />
  ) : (
    <DesktopNav pathname={pathname} />
  );
}
