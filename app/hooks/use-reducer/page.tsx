// app/hooks/use-reducer/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import ReducerTutorial from "@/hooks/ReducerTutorial";

const MONO = "'Overpass Mono', 'Courier New', monospace";
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

export default function UseReducerPage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>
      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useReducer
      </motion.h1>
      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        The <Code>useState</Code> alternative for complex state logic. When your
        state has multiple sub-values or the next state depends on the previous
        one in non-trivial ways, <Code>useReducer</Code> keeps things
        predictable.
      </motion.p>

      <Divider accent delay={0.2} />

      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <StepCard num="01" title="The problem useReducer solves">
          <p style={s.stepBody}>
            When you have multiple pieces of state that change together, or
            state transitions that follow strict rules, managing it with several{" "}
            <Code>useState</Code> calls gets messy. <Code>useReducer</Code>{" "}
            centralises all state logic into a single pure function — the
            reducer.
          </p>
        </StepCard>

        <StepCard num="02" title="The signature">
          <CodeBlock
            code={`const [state, dispatch] = useReducer(reducer, initialState);

// reducer      → (state, action) => newState
// initialState → the starting value
// state        → current state
// dispatch     → send an action to the reducer`}
          />
          <Note>
            The reducer must be a <strong>pure function</strong> — same input
            always produces same output, no side effects. Return a new object,
            never mutate state directly.
          </Note>
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      <motion.div {...fadeUp(0)}>
        <SectionLabel>02 — How to use it</SectionLabel>

        <StepCard num="03" title="Defining a reducer">
          <CodeBlock
            code={`interface State {
  count: number;
  showText: boolean;
}

type Action =
  | { type: "INCREMENT" }
  | { type: "toggleShowText" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "toggleShowText":
      return { ...state, showText: !state.showText };
    default:
      return state;
  }
};`}
          />
        </StepCard>

        <StepCard num="04" title="Dispatching actions">
          <p style={s.stepBody}>
            You never call the reducer directly — you dispatch an action object
            and React calls the reducer for you. Multiple dispatches in one
            handler are batched into a single re-render.
          </p>
          <CodeBlock
            code={`// Dispatch a single action
dispatch({ type: "INCREMENT" });

// Dispatch multiple — React batches them
dispatch({ type: "INCREMENT" });
dispatch({ type: "toggleShowText" });`}
          />
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
            <span style={s.stepTitle}>ReducerTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            One button dispatches two actions — an increment and a text toggle.
            Both are batched into a single re-render.
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
            <ReducerTutorial />
          </div>
        </div>
      </motion.div>

      <Divider delay={0.1} />

      <motion.div {...fadeUp(0)}>
        <SectionLabel>04 — useState vs useReducer</SectionLabel>
        <div style={s.stepCard}>
          <table style={s.table as React.CSSProperties}>
            <thead>
              <tr>
                <th style={s.th as React.CSSProperties}>Situation</th>
                <th style={s.th as React.CSSProperties}>Use</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Simple independent values", "useState"],
                ["Multiple values that change together", "useReducer"],
                ["Next state depends on previous", "useReducer"],
                ["State transitions follow strict rules", "useReducer"],
                ["Logic needs to be testable in isolation", "useReducer"],
              ].map(([situation, use], i) => (
                <tr key={i}>
                  <td style={s.td}>{situation}</td>
                  <td style={{ ...s.td, color: C.purple, fontWeight: 600 }}>
                    {use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next: <strong>useContext</strong> — share state across the component
          tree without prop drilling.
        </Note>
      </motion.div>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
