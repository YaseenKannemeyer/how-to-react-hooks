// app/hooks/use-ref/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import RefTutorial from "@/hooks/RefTutorial";

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

export default function UseRefPage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>
      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useRef
      </motion.h1>
      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        Persist a mutable value across renders without triggering a re-render.
        Most commonly used to access DOM elements directly, but also handy for
        storing any value you need to keep around without it affecting the UI.
      </motion.p>

      <Divider accent delay={0.2} />

      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <StepCard num="01" title="The signature">
          <CodeBlock
            code={`const ref = useRef(initialValue);

// ref.current → the mutable value
// Changing ref.current does NOT trigger a re-render`}
          />
          <Note>
            Unlike state, mutating <Code>ref.current</Code> is intentional and
            doesn't cause a re-render. It's just a plain JavaScript object with
            a <Code>current</Code> property.
          </Note>
        </StepCard>

        <StepCard num="02" title="Two main use cases">
          <CodeBlock
            code={`// 1. Access a DOM element
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} />
inputRef.current.focus(); // direct DOM access

// 2. Store a value that persists but doesn't affect UI
const countRef = useRef(0);
countRef.current += 1; // no re-render`}
          />
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      <motion.div {...fadeUp(0)}>
        <SectionLabel>02 — useRef vs useState</SectionLabel>

        <StepCard num="03" title="Key differences">
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}></th>
                <th style={s.th as React.CSSProperties}>useState</th>
                <th style={s.th as React.CSSProperties}>useRef</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Triggers re-render", "✓ yes", "✗ no"],
                ["Value persists across renders", "✓ yes", "✓ yes"],
                ["Mutable directly", "✗ use setter", "✓ ref.current"],
                ["Use for UI values", "✓ yes", "✗ no"],
                ["Use for DOM access", "✗ no", "✓ yes"],
              ].map(([label, state, ref], i) => (
                <tr key={i}>
                  <td style={{ ...s.td, color: C.textMid, fontWeight: 600 }}>
                    {label}
                  </td>
                  <td style={{ ...s.td, color: C.purple }}>{state}</td>
                  <td style={{ ...s.td, color: C.purpleDim }}>{ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      <motion.div {...fadeUp(0)}>
        <SectionLabel>03 — Live demo</SectionLabel>
        <div
          style={{
            ...s.stepCard,
            background: C.surfaceTint,
            border: `1px solid ${C.purpleBorder}`,
          }}
        >
          <div style={s.stepHeader}>
            <div style={s.stepNum}>↓</div>
            <span style={s.stepTitle}>RefTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            Type a name and click the button. The heading updates by reading
            directly from the DOM via <Code>inputRef.current</Code> — no state
            involved, no re-render triggered by the ref itself.
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
            <RefTutorial />
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next: <strong>useContext</strong> — consume shared state anywhere in
          the tree without prop drilling.
        </Note>
      </motion.div>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
