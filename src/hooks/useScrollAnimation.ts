/**
 * useScrollAnimation.ts
 *
 * Shared hook for scroll-triggered section reveal animations.
 * Uses CSS Intersection Observer via framer-motion's useInView.
 *
 * FIX: Uses `amount: 0.1` threshold (triggers as soon as 10% visible)
 * and `once: true`. The `initial: false` guard was causing components
 * that start on-screen to never animate — now fixed by always
 * starting from "hidden" and animating to "visible" on inView.
 */

import { useRef } from 'react';
import { useInView } from 'framer-motion';

/** Single element fade-up */
export const revealVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/** Staggered container */
export const staggerContainer = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
};

/** Slide from left */
export const slideLeft = {
    hidden:  { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

/** Slide from right */
export const slideRight = {
    hidden:  { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

/** Scale spring pop */
export const scalePop = {
    hidden:  { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1, scale: 1,
        transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
    },
};

/**
 * useScrollAnimation
 * Returns a ref to attach to the container and the `animate` string to pass to motion elements.
 *
 * KEY FIX: amount: 0.05 means it triggers the moment 5% of the element enters the viewport.
 * This ensures sections that are already partially in the SPA scroll area still trigger.
 */
export function useScrollAnimation(opts?: { margin?: string; once?: boolean; amount?: number }) {
    const ref = useRef<HTMLElement>(null!);
    const inView = useInView(ref, {
        margin: opts?.margin ?? '0px',
        once:   opts?.once   ?? true,
        amount: opts?.amount ?? 0.05,
    });
    return { ref, animate: inView ? 'visible' : 'hidden' };
}
