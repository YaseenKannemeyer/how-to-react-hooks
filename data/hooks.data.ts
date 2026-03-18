// data/hooks.data.ts
// Single source of truth for all hook entries.
// Flip status to "published" to make a hook appear in the nav and grid.

export interface HookEntry {
  slug: string;
  name: string;
  description: string;
  status: "published" | "coming-soon";
  number: string;
}

export const HOOKS: HookEntry[] = [
  // ── Published ─────────────────────────────────────────────
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
    status: "published",
    number: "02",
  },
  {
    slug: "use-ref",
    name: "useRef",
    description:
      "Access DOM nodes directly or hold a mutable value that survives renders without triggering a re-render.",
    status: "published",
    number: "03",
  },
  {
    slug: "use-context",
    name: "useContext",
    description:
      "Consume shared state anywhere in the component tree — no prop drilling required.",
    status: "published",
    number: "04",
  },
  {
    slug: "use-reducer",
    name: "useReducer",
    description:
      "Centralise complex state logic into a pure reducer function. The useState alternative for non-trivial state.",
    status: "published",
    number: "05",
  },
  {
    slug: "use-memo",
    name: "useMemo",
    description:
      "Cache the result of an expensive calculation — only recompute when dependencies change.",
    status: "published",
    number: "06",
  },
  {
    slug: "use-callback",
    name: "useCallback",
    description:
      "Memoize a function so child components don't re-render unnecessarily when the parent does.",
    status: "published",
    number: "07",
  },
  {
    slug: "use-layout-effect",
    name: "useLayoutEffect",
    description:
      "Like useEffect but fires synchronously before the browser paints. Use it to avoid layout flicker.",
    status: "published",
    number: "08",
  },
  {
    slug: "use-imperative-handle",
    name: "useImperativeHandle",
    description:
      "Expose a custom API from a child component to its parent via ref — without lifting state.",
    status: "published",
    number: "09",
  },

  // ── Coming soon ────────────────────────────────────────────
  {
    slug: "use-transition",
    name: "useTransition",
    description:
      "Mark a state update as non-urgent so React can keep the UI responsive while it processes.",
    status: "coming-soon",
    number: "10",
  },
  {
    slug: "use-deferred-value",
    name: "useDeferredValue",
    description:
      "Defer re-rendering a part of the UI so urgent updates like typing feel instant.",
    status: "coming-soon",
    number: "11",
  },
  {
    slug: "use-id",
    name: "useId",
    description:
      "Generate unique, stable IDs that are consistent between server and client — perfect for accessibility attributes.",
    status: "coming-soon",
    number: "12",
  },
  {
    slug: "use-sync-external-store",
    name: "useSyncExternalStore",
    description:
      "Subscribe to an external store (like Redux or a browser API) in a way that's safe for concurrent rendering.",
    status: "coming-soon",
    number: "13",
  },
  {
    slug: "use-insertion-effect",
    name: "useInsertionEffect",
    description:
      "Inject styles into the DOM before any layout effects fire. Designed for CSS-in-JS library authors.",
    status: "coming-soon",
    number: "14",
  },
  {
    slug: "use-optimistic",
    name: "useOptimistic",
    description:
      "Show an optimistic UI update immediately while an async action is in flight, then reconcile the real result.",
    status: "coming-soon",
    number: "15",
  },
  {
    slug: "use-debug-value",
    name: "useDebugValue",
    description:
      "Add a label to a custom hook so it shows useful information in React DevTools.",
    status: "coming-soon",
    number: "16",
  },
];
