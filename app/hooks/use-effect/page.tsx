// app/hooks/use-effect/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { s, C, Divider } from "@/components/styles";
import EffectTutorial from "@/hooks/EffectTutorial";

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

export default function UseEffectPage() {
  return (
    <div style={s.section}>
      <motion.div {...fadeUp(0)}>
        <span style={s.badge}>React Hooks Series</span>
      </motion.div>
      <motion.h1 style={s.h1} {...fadeUp(0.07)}>
        useEffect
      </motion.h1>
      <motion.p style={s.subtitle} {...fadeUp(0.13)}>
        Run side-effects after render, fetch data, set up subscriptions,
        manipulate the DOM. The dependency array controls exactly when your
        effect fires.
      </motion.p>

      <Divider accent delay={0.2} />

      <motion.div {...fadeUp(0.22)}>
        <SectionLabel>01 — What it is</SectionLabel>

        <StepCard num="01" title="The signature">
          <CodeBlock
            code={`useEffect(() => {
  // side effect here

  return () => {
    // cleanup (optional) — runs before next effect or unmount
  };
}, [dependencies]);`}
          />
          <Note>
            The dependency array controls when the effect runs. Empty{" "}
            <Code>[]</Code> = run once on mount. No array = run after every
            render. Listed deps = run when those values change.
          </Note>
        </StepCard>

        <StepCard num="02" title="The three dependency array patterns">
          <CodeBlock
            code={`// 1. Run once on mount
useEffect(() => { fetchData(); }, []);

// 2. Run when 'id' changes
useEffect(() => { fetchUser(id); }, [id]);

// 3. Run after every render (rarely needed)
useEffect(() => { document.title = count; });`}
          />
        </StepCard>
      </motion.div>

      <Divider delay={0.1} />

      <motion.div {...fadeUp(0)}>
        <SectionLabel>02 — Common patterns</SectionLabel>

        <StepCard num="03" title="Data fetching">
          <p style={s.stepBody}>
            Fetch on mount with an empty dependency array — the most common
            pattern.
          </p>
          <CodeBlock
            code={`useEffect(() => {
  fetch("https://api.example.com/data")
    .then((res) => res.json())
    .then((data) => setData(data));
}, []); // ← empty array = run once`}
          />
        </StepCard>

        <StepCard num="04" title="Cleanup — avoiding memory leaks">
          <p style={s.stepBody}>
            Return a cleanup function to cancel subscriptions, clear timers, or
            abort fetches when the component unmounts or before the effect
            re-runs.
          </p>
          <CodeBlock
            code={`useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then((res) => res.json())
    .then(setData);

  return () => controller.abort(); // cleanup
}, []);`}
          />
        </StepCard>

        <StepCard num="05" title="Gotcha — stale closures in deps">
          <p style={s.stepBody}>
            If you use a value inside an effect but don't list it as a
            dependency, the effect captures its initial value and never updates.
            Always include everything you read.
          </p>
          <CodeBlock
            code={`// ✗ stale — 'count' is always 0 inside the effect
useEffect(() => {
  console.log(count);
}, []);

// ✓ correct — runs whenever count changes
useEffect(() => {
  console.log(count);
}, [count]);`}
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
            <span style={s.stepTitle}>EffectTutorial — interactive</span>
          </div>
          <p style={{ ...s.stepBody, marginBottom: "1.25rem" }}>
            The fetch runs once on mount (empty deps). The counter increments
            independently — notice the fetch doesn't re-run when you click.
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
            <EffectTutorial />
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0)} style={{ marginTop: "3rem" }}>
        <Note>
          Next: <strong>useRef</strong> — persist values and access DOM nodes
          without triggering a re-render.
        </Note>
      </motion.div>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
