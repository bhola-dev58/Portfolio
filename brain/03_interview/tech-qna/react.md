---
title: React Q&A
visibility: public
updated: 2026-10-08
source: manual
---

# React Technical Q&A

### Q1: What is Virtual DOM and how does reconciliation work?
React maintains an in-memory Virtual DOM tree. When state changes, React creates a new VDOM tree and compares it with the previous tree using a diffing algorithm (Reconciliation/Fiber). Only the changed nodes are updated in the real DOM.

### Q2: Difference between `useMemo` and `useCallback`?
`useMemo` caches the result of a calculation between renders (`const val = useMemo(() => compute(), [deps])`). `useCallback` caches a function definition between renders (`const fn = useCallback(() => {}, [deps])`).

### Q3: Why do we use TanStack React Query?
React Query manages server state caching, automatic refetching, deduplication, background updates, and stale-while-revalidate strategies out of the box, reducing client-side state boilerplate.
