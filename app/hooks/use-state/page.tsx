// app/hooks/use-state/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import StateTutorial from "@/hooks/StateTutorial";

const MONO = "'Overpass Mono', 'Courier New', monospace";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
});

function Code({ children }: { children: React.ReactNode }) {
  return <code style={s.inlineCode}>{children}</code>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p style={s.sectionLabel}>{children}</p>;
}

function Note({ children }: { children: React.ReactNode }) {
  return <div style={s.note}>{children}</div>;
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre style={s.pre as React.CSSProperties}>
      <code>{code}</code>
    </pre>
  );
}

function StepCard({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={s.stepCard}>
      <div style={s.stepHeader}>
        <div style={s.stepNum}>{num}</div>
        <span style={s.stepTitle}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export default function UseStatePage() {
  return (
    <div style={s.section}>
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>

      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useState
      </motion.h1>

      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        The foundational hook for local component state. Every React developer
        reaches for <Code>useState</Code> first, understanding it deeply sets
        the baseline for every hook that follows.
      </motion.p>

      <Divider accent delay={0.2} />

      {/* 01 — What it is */}
      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <StepCard num="01" title="The problem useState solves">
          <p style={s.stepBody}>
            Before hooks, only class components could hold local state.
            Functional components were purely presentational — they took props
            and returned JSX. <Code>useState</Code> changed that entirely,
            letting you store and update values inside a function component
            without ever writing a class.
          </p>
          <p style={s.stepBody}>
            When the state value changes, React re-renders the component with
            the new value automatically. No manual DOM manipulation, no{" "}
            <Code>this.setState</Code>, no lifecycle methods.
          </p>
        </StepCard>

        <StepCard num="02" title="The signature">
          <CodeBlock
            code={`const [state, setState] = useState(initialValue);

// state     → the current value
// setState  → function to update the value
// useState  → takes one argument: the initial state`}
          />
          <Note>
            The array destructuring names are completely up to you. Convention
            is <Code>[value, setValue]</Code> — descriptive names make your
            intent obvious at a glance.
          </Note>
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      {/* 02 — How to use it */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>02 — How to use it</SectionLabel>

        <StepCard num="03" title="Primitive state — a counter">
          <p style={s.stepBody}>
            The simplest case: a number that increments on button click. Always
            prefer the functional updater form when the new value depends on the
            previous one.
          </p>
          <CodeBlock
            code={`const [counter, setCounter] = useState(0);

// ✓ safe — reads the latest value even when batched
const increment = () => setCounter((prev) => prev + 1);

// ✗ risky — can read stale value if updates are batched
const increment = () => setCounter(counter + 1);`}
          />
        </StepCard>

        <StepCard num="04" title="String state — controlled input">
          <p style={s.stepBody}>
            Controlled inputs store their value in state and update on every
            keystroke via <Code>onChange</Code>. The component is always the
            single source of truth — React drives the input, not the browser.
          </p>
          <CodeBlock
            code={`const [inputValue, setInputValue] = useState("Yaseen");

const onChange = (event) => {
  setInputValue(event.target.value);
};

// Wire it up:
<input value={inputValue} onChange={onChange} />`}
          />
        </StepCard>

        <StepCard num="05" title="Multiple state variables">
          <p style={s.stepBody}>
            Call <Code>useState</Code> as many times as you need. Each call
            manages one independent piece of state — keep them small and focused
            rather than bundling everything into one object.
          </p>
          <CodeBlock
            code={`const [counter, setCounter]       = useState(0);
const [inputValue, setInputValue] = useState("Yaseen");
const [isVisible, setIsVisible]   = useState(true);`}
          />
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      {/* 03 — Rules & gotchas */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>03 — Rules &amp; gotchas</SectionLabel>

        <StepCard num="06" title="The Rules of Hooks">
          <ul style={s.bullet}>
            <li>
              <strong>Only call hooks at the top level.</strong> Never inside
              loops, conditions, or nested functions — React relies on call
              order to track which state belongs to which hook.
            </li>
            <li style={{ marginTop: "0.5rem" }}>
              <strong>Only call hooks from React function components</strong> or
              your own custom hooks. Not from regular JS functions.
            </li>
          </ul>
        </StepCard>

        <StepCard num="07" title="Common pitfalls">
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}>Pitfall</th>
                <th style={s.th as React.CSSProperties}>Why it happens</th>
                <th style={s.th as React.CSSProperties}>Fix</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Stale state in handler",
                  "Closure captures old value",
                  "Use functional updater: prev => prev + 1",
                ],
                [
                  "Object mutation",
                  "React checks reference, not deep equality",
                  "Spread: setState({ ...state, key: val })",
                ],
                [
                  "Array mutation",
                  "push/splice mutate in place",
                  "Use [...arr, newItem] or .filter()",
                ],
                [
                  "Expensive initial value",
                  "Computed on every render",
                  "Lazy init: useState(() => compute())",
                ],
              ].map(([pitfall, why, fix], i) => (
                <tr key={i}>
                  <td style={{ ...s.td, color: C.purple, fontWeight: 600 }}>
                    {pitfall}
                  </td>
                  <td style={s.td}>{why}</td>
                  <td style={{ ...s.td, color: C.purpleDeep }}>{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      {/* 04 — Live demo */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>04 — Live demo</SectionLabel>

        <div
          style={{
            ...s.stepCard,
            background: C.surfaceTint,
            border: `1px solid ${C.purpleBorder}`,
          }}
        >
          <div style={s.stepHeader}>
            <div style={s.stepNum}>↓</div>
            <span style={s.stepTitle}>StateTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            The component below is running live. The counter uses the safe
            functional updater form. The input is fully controlled — React owns
            the value.
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
            <StateTutorial />
          </div>
        </div>
      </motion.div>

      <Divider delay={0.1} />

      {/* 05 — Quick reference */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>05 — Quick reference</SectionLabel>

        <div style={s.stepCard}>
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}>Pattern</th>
                <th style={s.th as React.CSSProperties}>Code</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Declare", "const [val, setVal] = useState(init)"],
                ["Update (direct)", "setVal(newValue)"],
                ["Update (from prev)", "setVal(prev => prev + 1)"],
                ["Update object", "setVal(prev => ({ ...prev, key: x }))"],
                ["Update array (add)", "setVal(prev => [...prev, item])"],
                ["Update array (remove)", "setVal(prev => prev.filter(…))"],
                ["Lazy initialiser", "useState(() => expensiveCompute())"],
              ].map(([pattern, code], i) => (
                <tr key={i}>
                  <td
                    style={{
                      ...s.td,
                      color: C.purpleDim,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pattern}
                  </td>
                  <td style={s.td}>
                    <code style={s.inlineCode}>{code}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Footer note */}
      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next in the series: <strong>useEffect</strong> — running side-effects
          after render, controlling when they fire, and cleaning up after
          yourself.
        </Note>
      </motion.div>

      <div style={{ height: "4rem" }} />
    </div>
  );
}
