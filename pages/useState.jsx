// pages/useState.jsx
// Blog post: deep-dive on the useState hook.
// Imports the interactive demo from hooks/StateTutorial.jsx
// and the shared design system from components/styles.js

import React, { useState } from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import StateTutorial from "@/hooks/StateTutorial";

// ── Small animation helper ────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

// ── Inline helpers ────────────────────────────────────────────
const Code = ({ children }) => <code style={s.inlineCode}>{children}</code>;

function SectionLabel({ children }) {
  return <p style={s.sectionLabel}>{children}</p>;
}

function Note({ children }) {
  return <div style={s.note}>{children}</div>;
}

// ── Syntax-highlighted-ish code block (static, no runtime dep) ─
function CodeBlock({ code }) {
  return (
    <pre style={s.pre}>
      <code>{code}</code>
    </pre>
  );
}

// ─────────────────────────────────────────────────────────────
export default function UseStatePage() {
  return (
    <div style={s.section}>

      {/* ── Header ── */}
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>

      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useState
      </motion.h1>

      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        The foundational hook for local component state. Every React developer
        reaches for <Code>useState</Code> first — understanding it deeply sets
        the baseline for all the hooks that follow.
      </motion.p>

      <Divider accent delay={0.2} />

      {/* ── What is useState ── */}
      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <div style={s.stepCard}>
          <div style={s.stepHeader}>
            <div style={s.stepNum}>01</div>
            <span style={s.stepTitle}>The problem useState solves</span>
          </div>
          <p style={s.stepBody}>
            Before hooks, only class components could hold local state. Functional
            components were purely presentational — they took props and returned JSX,
            nothing more. <Code>useState</Code> changed that entirely, letting you
            store and update values inside a function component without ever writing
            a class.
          </p>
          <p style={s.stepBody}>
            When the state value changes, React re-renders the component with the
            new value automatically. No manual DOM manipulation, no{" "}
            <Code>this.setState</Code>, no lifecycle methods.
          </p>
        </div>

        <div style={s.stepCard}>
          <div style={s.stepHeader}>
            <div style={s.stepNum}>02</div>
            <span style={s.stepTitle}>The signature</span>
          </div>
          <CodeBlock
            code={`const [state, setState] = useState(initialValue);

// state     → the current value
// setState  → function to update the value
// useState  → takes one argument: the initial state`}
          />
          <Note>
            The array destructuring names are completely up to you.
            Convention is <Code>[value, setValue]</Code> — descriptive names
            make your intent obvious at a glance.
          </Note>
        </div>
      </motion.div>

      <Divider delay={0.1} />

      {/* ── How to use it ── */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>02 — How to use it</SectionLabel>

        <div style={s.stepCard}>
          <div style={s.stepHeader}>
            <div style={s.stepNum}>03</div>
            <span style={s.stepTitle}>Primitive state — a counter</span>
          </div>
          <p style={s.stepBody}>
            The simplest case: a number that increments on button click. Call{" "}
            <Code>setState</Code> with the new value and React handles the rest.
          </p>
          <CodeBlock
            code={`const [counter, setCounter] = useState(0);

const increment = () => {
  setCounter(counter + 1);
};`}
          />
          <Note>
            ⚠ When the new value depends on the previous one, prefer the
            functional updater form: <Code>setCounter(prev ={">"} prev + 1)</Code>.
            This is safe when multiple updates are batched — the plain form can
            read stale values.
          </Note>
        </div>

        <div style={s.stepCard}>
          <div style={s.stepHeader}>
            <div style={s.stepNum}>04</div>
            <span style={s.stepTitle}>String state — controlled input</span>
          </div>
          <p style={s.stepBody}>
            Controlled inputs store their value in state and update on every
            keystroke via <Code>onChange</Code>. The component is always the
            single source of truth.
          </p>
          <CodeBlock
            code={`const [inputValue, setInputValue] = useState("Yaseen");

const onChange = (event) => {
  setInputValue(event.target.value);
};

// Wired to your input:
<input value={inputValue} onChange={onChange} />`}
          />
        </div>

        <div style={s.stepCard}>
          <div style={s.stepHeader}>
            <div style={s.stepNum}>05</div>
            <span style={s.stepTitle}>Multiple state variables</span>
          </div>
          <p style={s.stepBody}>
            You can call <Code>useState</Code> as many times as you need.
            Each call manages one independent piece of state — keep them
            small and focused rather than bundling everything into a single
            object.
          </p>
          <CodeBlock
            code={`const [counter, setCounter]       = useState(0);
const [inputValue, setInputValue] = useState("Yaseen");
const [isVisible, setIsVisible]   = useState(true);`}
          />
        </div>
      </motion.div>

      <Divider delay={0.1} />

      {/* ── Rules & gotchas ── */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>03 — Rules &amp; gotchas</SectionLabel>

        <div style={s.stepCard}>
          <div style={s.stepHeader}>
            <div style={s.stepNum}>06</div>
            <span style={s.stepTitle}>The Rules of Hooks</span>
          </div>
          <ul style={s.bullet}>
            <li>
              <strong>Only call hooks at the top level.</strong> Never inside
              loops, conditions, or nested functions — React relies on call
              order to track which state belongs to which hook.
            </li>
            <li>
              <strong>Only call hooks from React function components</strong> (or
              your own custom hooks). Not from regular JS functions.
            </li>
          </ul>
        </div>

        <div style={s.stepCard}>
          <div style={s.stepHeader}>
            <div style={s.stepNum}>07</div>
            <span style={s.stepTitle}>Common pitfalls</span>
          </div>

          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Pitfall</th>
                <th style={s.th}>Why it happens</th>
                <th style={s.th}>Fix</th>
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
                  "Pass a function: useState(() => compute())",
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
        </div>
      </motion.div>

      <Divider delay={0.1} />

      {/* ── Live demo ── */}
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
            <span style={s.stepTitle}>StateTutorial.jsx — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            The component below is your <Code>StateTutorial</Code> running
            live. Try the counter and the controlled input to see state
            updates in action.
          </p>

          {/* ── Demo sandbox wrapper ── */}
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

      {/* ── Quick-reference table ── */}
      <motion.div {...fadeUp(0)}>
        <SectionLabel>05 — Quick reference</SectionLabel>

        <div style={s.stepCard}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Pattern</th>
                <th style={s.th}>Code</th>
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

      {/* ── Footer note ── */}
      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next up in the series: <strong>useEffect</strong> — running
          side-effects after render, controlling when they fire, and cleaning
          up after yourself.
        </Note>
      </motion.div>

      <div style={{ height: "4rem" }} />
    </div>
  );
}
