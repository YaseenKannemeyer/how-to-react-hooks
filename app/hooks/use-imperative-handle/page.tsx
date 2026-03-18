// app/hooks/use-imperative-handle/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import ImperativeHandleTutorial from "@/hooks/ImperativeHandleTutorial";

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

export default function UseImperativeHandlePage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>

      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useImperativeHandle
      </motion.h1>

      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        Customise what a parent sees when it holds a <Code>ref</Code> to your
        component. Instead of exposing the raw DOM node, you expose a controlled
        API, only the methods you choose.
      </motion.p>

      <Divider accent delay={0.2} />

      {/* 01 — What it is */}
      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <StepCard num="01" title="The problem it solves">
          <p style={s.stepBody}>
            By default, <Code>ref</Code> on a function component does nothing —
            function components don't have instances. You need{" "}
            <Code>forwardRef</Code> to accept a ref, and{" "}
            <Code>useImperativeHandle</Code> to control exactly what that ref
            exposes.
          </p>
          <p style={s.stepBody}>
            This is the escape hatch for imperative behaviour: playing/pausing
            media, triggering animations, focusing inputs, or toggling internal
            state from outside the component, without lifting state up.
          </p>
        </StepCard>

        <StepCard num="02" title="The signature">
          <CodeBlock
            code={`useImperativeHandle(ref, () => ({
  // only expose what you want the parent to call
  focus() { inputRef.current.focus(); },
  reset() { setValue(""); },
}), [deps]); // optional deps array`}
          />
          <Note>
            Always pair with <Code>forwardRef</Code>. Without it the{" "}
            <Code>ref</Code> prop is silently discarded and{" "}
            <Code>useImperativeHandle</Code> has nothing to attach to.
          </Note>
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      {/* 02 — How to use it */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>02 — How to use it</SectionLabel>

        <StepCard num="03" title="The child component">
          <p style={s.stepBody}>
            Wrap the component in <Code>forwardRef</Code>, define the handle
            interface, and expose only the methods the parent needs.
          </p>
          <CodeBlock
            code={`// 1. Define what the parent can call
export interface ButtonHandle {
  alterToggle: () => void;
}

// 2. Wrap with forwardRef
const Button = forwardRef<ButtonHandle>((_, ref) => {
  const [toggle, setToggle] = useState(false);

  // 3. Expose a controlled API
  useImperativeHandle(ref, () => ({
    alterToggle() {
      setToggle((prev) => !prev);
    },
  }));

  return <button onClick={() => setToggle(p => !p)}>Child button</button>;
});`}
          />
        </StepCard>

        <StepCard num="04" title="The parent component">
          <p style={s.stepBody}>
            The parent creates a ref typed to the handle interface and calls
            methods on it directly — no props, no callbacks, no lifted state.
          </p>
          <CodeBlock
            code={`const buttonRef = useRef<ButtonHandle>(null);

// Call the child's method from the parent
<button onClick={() => buttonRef.current?.alterToggle()}>
  Trigger from parent
</button>

// Render the child with the ref attached
<Button ref={buttonRef} />`}
          />
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      {/* 03 — Live demo */}
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
            <span style={s.stepTitle}>
              ImperativeHandleTutorial — interactive
            </span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            Click "Trigger from parent" — it calls <Code>alterToggle()</Code> on
            the child component through the ref. The child also has its own
            button that does the same thing internally.
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
            <ImperativeHandleTutorial />
          </div>
        </div>
      </motion.div>

      <Divider delay={0.1} />

      {/* 04 — When to use it */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>04 — When to use it</SectionLabel>

        <StepCard num="05" title="Good vs bad use cases">
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}>Good use case</th>
                <th style={s.th as React.CSSProperties}>Better alternative</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Focus / scroll / play from parent",
                  "—  this is exactly what it's for",
                ],
                [
                  "Toggle internal UI state from outside",
                  "— fine if lifting state is awkward",
                ],
                [
                  "Sharing business logic upward",
                  "Move logic to parent or custom hook",
                ],
                [
                  "Replacing all prop passing",
                  "Use props — this hook is an escape hatch",
                ],
              ].map(([good, alt], i) => (
                <tr key={i}>
                  <td style={{ ...s.td, color: C.purple }}>{good}</td>
                  <td
                    style={{
                      ...s.td,
                      color: C.textMuted,
                      fontStyle: alt.startsWith("—") ? "italic" : "normal",
                    }}
                  >
                    {alt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Note>
            Reach for <Code>useImperativeHandle</Code> sparingly. Most
            interactions are better expressed with props and callbacks. It
            shines for DOM-level control and when you genuinely need to trigger
            behaviour in a child from an unrelated parent.
          </Note>
        </StepCard>
      </motion.div>

      {/* Footer */}
      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          That's all the hooks covered in this series. You now have the full
          mental model — from <strong>useState</strong> right through to{" "}
          <strong>useImperativeHandle</strong>.
        </Note>
      </motion.div>

      <div style={{ height: "4rem" }} />
    </div>
  );
}
