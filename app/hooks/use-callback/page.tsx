// app/hooks/use-callback/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import CallbackTutorial from "@/hooks/CallbackTutorial";

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

export default function UseCallbackPage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>
      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useCallback
      </motion.h1>
      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        Cache a function definition so it keeps the same reference between
        renders. Essential when passing callbacks to optimised child components
        that rely on reference equality to skip re-renders.
      </motion.p>

      <Divider accent delay={0.2} />

      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <StepCard num="01" title="The signature">
          <CodeBlock
            code={`const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // recreate only when a or b changes`}
          />
          <Note>
            <Code>useCallback(fn, deps)</Code> is equivalent to{" "}
            <Code>useMemo(() ={">"} fn, deps)</Code> — it memoizes the function
            itself rather than its return value.
          </Note>
        </StepCard>

        <StepCard num="02" title="Why it matters — referential equality">
          <p style={s.stepBody}>
            Every render creates a new function instance. Without{" "}
            <Code>useCallback</Code>, a child wrapped in <Code>React.memo</Code>{" "}
            will still re-render because the function prop is technically a
            different object each time, even if the logic is identical.
          </p>
          <CodeBlock
            code={`// Without useCallback — new function every render
const handleClick = () => doSomething(data);

// With useCallback — same reference until 'data' changes
const handleClick = useCallback(
  () => doSomething(data),
  [data]
);`}
          />
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
            <span style={s.stepTitle}>CallbackTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            Toggle re-renders the parent but the Child keeps the same function
            reference — check your browser console to see that Child only logs
            when data actually changes.
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
            <CallbackTutorial />
          </div>
        </div>
      </motion.div>

      <Divider delay={0.1} />

      <motion.div {...fadeUp(0)}>
        <SectionLabel>03 — useMemo vs useCallback</SectionLabel>
        <div style={s.stepCard}>
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}>Hook</th>
                <th style={s.th as React.CSSProperties}>Caches</th>
                <th style={s.th as React.CSSProperties}>Returns</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["useMemo", "Result of a function call", "A value"],
                ["useCallback", "The function itself", "A function"],
              ].map(([hook, caches, returns], i) => (
                <tr key={i}>
                  <td style={{ ...s.td, color: C.purple, fontWeight: 600 }}>
                    {hook}
                  </td>
                  <td style={s.td}>{caches}</td>
                  <td style={s.td}>{returns}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next: <strong>useLayoutEffect</strong> — like useEffect but fires
          synchronously before the browser paints.
        </Note>
      </motion.div>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
