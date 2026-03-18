// components/BlogNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { C } from "@/components/styles";
import { HOOKS } from "@/data/hooks.data";

const MONO = "'Overpass Mono', 'Courier New', monospace";

export default function BlogNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Hide sidebar on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .blog-nav { display: none !important; }
          main { margin-left: 0 !important; }
        }
      `}</style>

      <nav
        className="blog-nav"
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
          style={{ textDecoration: "none", padding: "0 1.5rem", marginBottom: "2rem", display: "block" }}
        >
          <span style={{
            fontSize: "11px",
            fontFamily: MONO,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.purple,
          }}>
            How to React
          </span>
          <span style={{
            display: "block",
            fontSize: "9px",
            fontFamily: MONO,
            color: C.textMuted,
            letterSpacing: "0.08em",
            marginTop: "2px",
          }}>
            Hooks · visual guide
          </span>
        </Link>

        {/* Section label */}
        <p style={{
          fontSize: "8px",
          fontFamily: MONO,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: C.textMuted,
          padding: "0 1.5rem",
          marginBottom: "0.5rem",
        }}>
          Hooks
        </p>

        {/* Hook links */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {HOOKS.map((hook) => {
            const href = `/hooks/${hook.slug}`;
            const active = pathname === href;

            return (
              <li key={hook.slug}>
                {hook.status === "published" ? (
                  <Link href={href} style={{ textDecoration: "none" }}>
                    <NavItem name={hook.name} number={hook.number} active={active} published />
                  </Link>
                ) : (
                  <NavItem name={hook.name} number={hook.number} active={false} published={false} />
                )}
              </li>
            );
          })}
        </ul>

        <div style={{ flex: 1 }} />

        <p style={{
          fontSize: "9px",
          fontFamily: MONO,
          color: C.textFaint,
          padding: "0 1.5rem",
          letterSpacing: "0.06em",
          lineHeight: 1.6,
        }}>
          Flip status to "published"<br />in hooks.data.ts to add more.
        </p>
      </nav>
    </>
  );
}

function NavItem({
  name, number, active, published,
}: {
  name: string;
  number: string;
  active: boolean;
  published: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px 1.5rem",
        background: active ? C.purpleLight : "transparent",
        borderRight: active ? `2px solid ${C.purple}` : "2px solid transparent",
        cursor: published ? "pointer" : "default",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => {
        if (published && !active)
          (e.currentTarget as HTMLDivElement).style.background = C.purpleLight + "80";
      }}
      onMouseLeave={(e) => {
        if (!active)
          (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      <code style={{
        fontSize: "12px",
        fontFamily: "'Overpass Mono', monospace",
        fontWeight: active ? 700 : 500,
        color: active ? C.purple : published ? C.textMid : C.textFaint,
      }}>
        {name}
      </code>
      <span style={{
        fontSize: "9px",
        fontFamily: "'Overpass Mono', monospace",
        color: active ? C.purpleDim : C.textFaint,
        letterSpacing: "0.06em",
      }}>
        {number}
      </span>
    </div>
  );
}
