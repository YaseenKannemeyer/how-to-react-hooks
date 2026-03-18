// app/hooks/use-memo/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import MemoTutorial from "@/hooks/MemoTutorial";

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

export default function UseMemoPage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>
      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useMemo
      </motion.h1>
      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        Cache the result of an expensive calculation. <Code>useMemo</Code> only
        recomputes when its dependencies change, every other render returns the
        cached value instantly.
      </motion.p>

      <Divider accent delay={0.2} />

      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <StepCard num="01" title="The signature">
          <CodeBlock
            code={`const value = useMemo(() => {
  return expensiveCalculation(data);
}, [data]); // recompute only when 'data' changes`}
          />
          <Note>
            <Code>useMemo</Code> returns a <strong>value</strong>. Compare with{" "}
            <Code>useCallback</Code> which returns a <strong>function</strong>.
            Don't overuse it — only memoize genuinely expensive operations.
          </Note>
        </StepCard>

        <StepCard num="02" title="When to use it">
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}>Good use case</th>
                <th style={s.th as React.CSSProperties}>Bad use case</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Filtering/sorting large arrays", "Simple arithmetic"],
                ["Expensive derived calculations", "String concatenation"],
                [
                  "Stable object reference for child props",
                  "Values that change every render anyway",
                ],
              ].map(([good, bad], i) => (
                <tr key={i}>
                  <td style={{ ...s.td, color: C.purple }}>{good}</td>
                  <td style={{ ...s.td, color: C.textMuted }}>{bad}</td>
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
            <span style={s.stepTitle}>MemoTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            The app fetches 500 comments and finds the longest name. Click
            Toggle to re-render — the compute count doesn't increase because{" "}
            <Code>data</Code> hasn't changed.
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
            <MemoTutorial />
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next: <strong>useCallback</strong> — memoize functions so child
          components don't re-render unnecessarily.
        </Note>
      </motion.div>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
