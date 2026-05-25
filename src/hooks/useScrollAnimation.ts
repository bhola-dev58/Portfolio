/**
 * useScrollAnimation.ts
 *
 * Shared hook for scroll-triggered section reveal animations.
 * Returns { ref, variants, containerVariants } to wire into
 * framer-motion components with a single import.
 */

import { useRef } from 'react';
import { useInView } from 'framer-motion';

/** Single element — fades in and slides up */
export const revealVariants = {
    hidden:  { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
};

/** Staggered container for children */
export const staggerContainer = {
    hidden:  {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

/** Slide from left */
export const slideLeft = {
    hidden:  { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
};

/** Slide from right */
export const slideRight = {
    hidden:  { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
};

/** Scale pop */
export const scalePop = {
    hidden:  { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1, scale: 1,
        transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }, // back-out spring
    },
};

/**
 * useScrollAnimation
 * Returns a ref to attach to the container and the `animate` string to pass to motion elements.
 */
export function useScrollAnimation(opts?: { margin?: string; once?: boolean }) {
    const ref     = useRef<HTMLElement>(null!);
    const inView  = useInView(ref, {
        margin : opts?.margin ?? '-80px',
        once   : opts?.once   ?? true,
    });
    return { ref, animate: inView ? 'visible' : 'hidden' };
}
