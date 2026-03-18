// data/hooks.data.ts
// Single source of truth for all hook entries.
// To publish a new hook: change status to "published".
// Both BlogNav and HookGrid import from here.

export interface HookEntry {
  slug: string;
  name: string;
  description: string;
  status: "published" | "coming-soon";
  number: string;
}

export const HOOKS: HookEntry[] = [
  {
    slug: "use-state",
    name: "useState",
    description:
      "Store and update values inside a function component. The hook every React developer learns first.",
    status: "published",
    number: "01",
  },
  {
    slug: "use-effect",
    name: "useEffect",
    description:
      "Fetch data, subscribe to events, manipulate the DOM — and clean up after yourself.",
    status: "coming-soon",
    number: "02",
  },
  {
    slug: "use-ref",
    name: "useRef",
    description:
      "Access DOM nodes directly or hold a mutable value that survives renders.",
    status: "coming-soon",
    number: "03",
  },
  {
    slug: "use-context",
    name: "useContext",
    description:
      "Consume React context without prop drilling — global state made simple.",
    status: "coming-soon",
    number: "04",
  },
  {
    slug: "use-reducer",
    name: "useReducer",
    description:
      "The useState alternative for multiple sub-values or complex transitions.",
    status: "coming-soon",
    number: "05",
  },
  {
    slug: "use-memo",
    name: "useMemo",
    description:
      "Skip re-computing derived data on every render — recalculate only when dependencies change.",
    status: "coming-soon",
    number: "06",
  },
];
