// app/hooks/use-context/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import ContextTutorial from "@/hooks/ContextTutorial";

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

export default function UseContextPage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>
      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useContext
      </motion.h1>
      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        Consume shared state anywhere in the component tree, no prop drilling
        required. <Code>useContext</Code> lets any child read from a provider no
        matter how deeply nested it is.
      </motion.p>

      <Divider accent delay={0.2} />

      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — How it works</SectionLabel>

        <StepCard num="01" title="Three steps">
          <CodeBlock
            code={`// 1. Create the context
export const AppContext = createContext(null);

// 2. Wrap children in a Provider with a value
<AppContext.Provider value={{ username, setUsername }}>
  <App />
</AppContext.Provider>

// 3. Consume it anywhere in the tree
const { username } = useContext(AppContext);`}
          />
          <Note>
            Every component that calls <Code>useContext(AppContext)</Code> will
            re-render when the context value changes. For large apps, consider
            splitting contexts by concern.
          </Note>
        </StepCard>

        <StepCard num="02" title="Typing context in TypeScript">
          <CodeBlock
            code={`interface AppContextType {
  username: string;
  setUsername: (val: string) => void;
}

// null default + type guard in consumers
export const AppContext = createContext<AppContextType | null>(null);

// In consumer:
const ctx = useContext(AppContext);
if (!ctx) return null; // type guard`}
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
            <span style={s.stepTitle}>ContextTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            Type a username in the Login component. The User component reads it
            from context — no props passed between them.
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
            <ContextTutorial />
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next: <strong>useMemo</strong> — skip expensive recalculations by
          memoizing derived values.
        </Note>
      </motion.div>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
