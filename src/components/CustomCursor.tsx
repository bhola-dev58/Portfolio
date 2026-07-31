/**
 * CustomCursor.tsx
 *
 * Premium custom cursor with:
 * - Outer magnetic ring that smoothly trails the real cursor
 * - Inner dot that snaps to cursor position immediately
 * - Cursor grows + color-shifts when hovering clickable elements
 * - Particle trail of 8 fading dots following the cursor
 *
 * Rendered at the top level in Layout — replaces the OS cursor on desktop.
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface TrailPoint {
    x: number;
    y: number;
    id: number;
}

const TRAIL_LENGTH = 8;

export const CustomCursor = () => {
    const dotRef   = useRef<HTMLDivElement>(null);
    const ringRef  = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement[]>([]);
    const cursorPos    = useRef({ x: -200, y: -200 });
    const ringPos      = useRef({ x: -200, y: -200 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
    const trailIdRef   = useRef(0);
    const trailHistory = useRef<{ x: number; y: number }[]>([]);
    const rafRef       = useRef<number>(0);
    const historyCounter = useRef(0);

    const onMouseMove = useCallback((e: MouseEvent) => {
        cursorPos.current = { x: e.clientX, y: e.clientY };

        // Record trail history every 2 frames
        historyCounter.current++;
        if (historyCounter.current % 2 === 0) {
            trailHistory.current.unshift({ x: e.clientX, y: e.clientY });
            if (trailHistory.current.length > TRAIL_LENGTH) {
                trailHistory.current.pop();
            }

            setTrailPoints(
                trailHistory.current.map((p, i) => ({
                    x: p.x, y: p.y,
                    id: trailIdRef.current - i,
                }))
            );
            trailIdRef.current++;
        }
    }, []);

    const onMouseOver = useCallback((e: MouseEvent) => {
        const el = e.target as HTMLElement;
        const clickable = el.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]');
        setIsHovering(!!clickable);
    }, []);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp   = () => setIsClicking(false);

    useEffect(() => {
        document.body.style.cursor = 'none';

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup',   onMouseUp);

        // Magnetic ring animation loop
        const animate = () => {
            const dx = cursorPos.current.x - ringPos.current.x;
            const dy = cursorPos.current.y - ringPos.current.y;
            ringPos.current.x += dx * 0.12;
            ringPos.current.y += dy * 0.12;

            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            document.body.style.cursor = '';
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup',   onMouseUp);
        };
    }, [onMouseMove, onMouseOver]);

    return (
        <>
            {/* Trail particles */}
            {trailPoints.map((p, i) => {
                const opacity = (1 - i / TRAIL_LENGTH) * 0.45;
                const size    = Math.max(3, 9 - i * 0.9);
                return (
                    <div
                        key={`trail-${p.id}`}
                        className="fixed pointer-events-none z-[9998]"
                        style={{
                            left: p.x,
                            top:  p.y,
                            width:  size,
                            height: size,
                            marginLeft: -size / 2,
                            marginTop:  -size / 2,
                            borderRadius: '50%',
                            background: i < TRAIL_LENGTH / 2 ? '#f97316' : '#0ea5e9',
                            opacity,
                            transition: 'opacity 0.1s',
                        }}
                    />
                );
            })}

            {/* Inner dot — snaps instantly to cursor */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width:  isClicking ? 6 : 8,
                    height: isClicking ? 6 : 8,
                    borderRadius: '50%',
                    background: isHovering ? '#0ea5e9' : '#f97316',
                    transition: 'width 0.1s, height 0.1s, background 0.2s',
                    boxShadow: isHovering ? '0 0 10px #0ea5e9' : '0 0 8px #f97316',
                }}
            />

            {/* Outer magnetic ring — trails with lag */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width:  isHovering ? 44 : isClicking ? 28 : 36,
                    height: isHovering ? 44 : isClicking ? 28 : 36,
                    borderRadius: '50%',
                    border: `2px solid ${isHovering ? '#0ea5e9' : '#f97316'}`,
                    opacity: isHovering ? 0.8 : 0.5,
                    background: isHovering ? 'rgba(14,165,233,0.05)' : 'transparent',
                    transition: 'width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s, background 0.2s',
                }}
            />
        </>
    );
};
