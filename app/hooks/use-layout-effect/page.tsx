// app/hooks/use-layout-effect/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import LayoutEffectTutorial from "@/hooks/LayoutEffectTutorial";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={s.inlineCode}>{children}</code>
);
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p style={s.sectionLabel}>{children}</p>
);
const Note = ({ children }: { children: React.ReactNode }) => (
  <div style={s.note}>{children}</div>
);
const CodeBlock = ({ code }: { code: string }) => (
  <pre style={s.pre as React.CSSProperties}>
    <code>{code}</code>
  </pre>
);
const StepCard = ({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div style={s.stepCard}>
    <div style={s.stepHeader}>
      <div style={s.stepNum}>{num}</div>
      <span style={s.stepTitle}>{title}</span>
    </div>
    {children}
  </div>
);

export default function UseLayoutEffectPage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>
      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useLayoutEffect
      </motion.h1>
      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        Identical to <Code>useEffect</Code> but fires <em>synchronously</em>{" "}
        after React updates the DOM — before the browser has had a chance to
        paint. Use it when you need to read layout or prevent a visual flicker.
      </motion.p>

      <Divider accent delay={0.2} />

      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — The difference</SectionLabel>

        <StepCard num="01" title="Execution order">
          <CodeBlock
            code={`// Order of execution on mount:
// 1. React renders JSX → updates DOM
// 2. useLayoutEffect fires  ← synchronous, blocks paint
// 3. Browser paints the screen
// 4. useEffect fires        ← async, after paint`}
          />
          <Note>
            Because <Code>useLayoutEffect</Code> blocks painting, avoid
            long-running work inside it. Use it only for DOM measurements and
            synchronous mutations that must happen before the user sees
            anything.
          </Note>
        </StepCard>

        <StepCard num="02" title="When to use useLayoutEffect">
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}>Use useLayoutEffect</th>
                <th style={s.th as React.CSSProperties}>Use useEffect</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Reading DOM dimensions (getBoundingClientRect)",
                  "Data fetching",
                ],
                [
                  "Preventing layout flicker on initial render",
                  "Subscriptions & event listeners",
                ],
                [
                  "Synchronising animations with DOM state",
                  "Timers & intervals",
                ],
              ].map(([layout, effect], i) => (
                <tr key={i}>
                  <td style={{ ...s.td, color: C.purple }}>{layout}</td>
                  <td style={{ ...s.td, color: C.textMid }}>{effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      <motion.div {...fadeUp(0)}>
        <SectionLabel>02 — Live demo</SectionLabel>
        <div
          style={{
            ...s.stepCard,
            background: C.surfaceTint,
            border: `1px solid ${C.purpleBorder}`,
          }}
        >
          <div style={s.stepHeader}>
            <div style={s.stepNum}>↓</div>
            <span style={s.stepTitle}>LayoutEffectTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            <Code>useLayoutEffect</Code> reads the input value before{" "}
            <Code>useEffect</Code> sets it to "HELLO". The execution log shows
            the order clearly.
          </p>
          <div
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: "10px",
              padding: "1.5rem",
              boxShadow: C.shadow,
            }}
          >
            <LayoutEffectTutorial />
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next: <strong>useImperativeHandle</strong> — expose a custom API from
          a child component to its parent via ref.
        </Note>
      </motion.div>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
