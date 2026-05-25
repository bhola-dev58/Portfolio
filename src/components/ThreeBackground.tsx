/**
 * ThreeBackground.tsx
 *
 * A full-screen Three.js (R3F) interactive 3D particle constellation.
 *
 * Z-index layering (back → front):
 *   -20  gradient blobs (CSS, for warm depth)
 *   -10  Three.js Canvas (3D particles + lines)
 *     0  page content
 *
 * The body CSS is set to background:transparent so this component
 * is the ACTUAL visual background of the entire site.
 */

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Constants ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT  = 140;
const SPHERE_RADIUS   = 4.5;
const CONNECT_DIST    = 1.9;
const COLOR_A         = new THREE.Color('#f97316'); // orange primary
const COLOR_B         = new THREE.Color('#0ea5e9'); // cyan secondary

// ─── Generate particle positions on a sphere surface ──────────────────────────
function buildSpherePositions(count: number): Float32Array {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(Math.random() * 2 - 1);
        const r     = SPHERE_RADIUS * (0.55 + Math.random() * 0.45);
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
}

// ─── Pre-build line segment positions (static – same frame every render) ──────
function buildLineGeometry(pos: Float32Array): { linePos: Float32Array; lineCol: Float32Array } {
    const pts: number[] = [];
    const cls: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ax = pos[i * 3], ay = pos[i * 3 + 1], az = pos[i * 3 + 2];
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            const bx = pos[j * 3], by = pos[j * 3 + 1], bz = pos[j * 3 + 2];
            const d  = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2 + (bz - az) ** 2);
            if (d < CONNECT_DIST) {
                pts.push(ax, ay, az, bx, by, bz);
                const t  = d / CONNECT_DIST;
                const ca = COLOR_A.clone().lerp(COLOR_B, t * 0.5);
                const cb = ca.clone().multiplyScalar(0.55);
                cls.push(ca.r, ca.g, ca.b, cb.r, cb.g, cb.b);
            }
        }
    }
    return { linePos: new Float32Array(pts), lineCol: new Float32Array(cls) };
}

// ─── The 3-D scene (rotation + mouse tilt) ────────────────────────────────────
function ConstellationScene() {
    const groupRef   = useRef<THREE.Group>(null!);
    const mouseSmooth = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

    // Stable data – generated once
    const spherePos = useMemo(() => buildSpherePositions(PARTICLE_COUNT), []);
    const { linePos, lineCol } = useMemo(() => buildLineGeometry(spherePos), [spherePos]);

    // Particle vertex colours
    const dotColors = useMemo(() => {
        const cols = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const c = COLOR_A.clone().lerp(COLOR_B, Math.random());
            cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
        }
        return cols;
    }, []);

    // Track raw mouse
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseSmooth.current.tx = (e.clientX / window.innerWidth  - 0.5) * 0.6;
            mouseSmooth.current.ty = (e.clientY / window.innerHeight - 0.5) * 0.6;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    // Animation loop – rotation + mouse lerp
    useFrame((_, delta) => {
        const ms = mouseSmooth.current;
        ms.x += (ms.tx - ms.x) * 0.05;
        ms.y += (ms.ty - ms.y) * 0.05;

        const g = groupRef.current;
        if (!g) return;
        g.rotation.y += delta * 0.09  + ms.x * 0.012;
        g.rotation.x += delta * 0.045 + ms.y * 0.008;
    });

    return (
        <group ref={groupRef}>
            {/* ── Dot particles ── */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[spherePos, 3]} />
                    <bufferAttribute attach="attributes-color"    args={[dotColors,  3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.055}
                    vertexColors
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                    depthWrite={false}
                />
            </points>

            {/* ── Constellation lines ── */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
                    <bufferAttribute attach="attributes-color"    args={[lineCol, 3]} />
                </bufferGeometry>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.22}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}

// ─── Exported component ────────────────────────────────────────────────────────
const ThreeBackground = () => (
    /*
     * fixed + inset-0 → covers viewport completely
     * -z-10          → behind ALL page content
     * pointer-events-none → never blocks clicks
     */
    <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -10 }}
        aria-hidden="true"
    >
        {/* Warm gradient layer painted BELOW the canvas */}
        <div
            className="absolute inset-0"
            style={{
                background: 'linear-gradient(135deg, hsl(0 0% 95%) 0%, hsl(210 20% 94%) 50%, hsl(0 0% 96%) 100%)',
                zIndex: -2,
            }}
        />

        {/* Glowing colour blobs for depth */}
        <div
            className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] rounded-full blur-3xl opacity-20 animate-blob"
            style={{ background: 'hsl(27 100% 53%)', zIndex: -1 }}
        />
        <div
            className="absolute top-[-60px] right-[-60px] w-[380px] h-[380px] rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000"
            style={{ background: 'hsl(199 89% 48%)', zIndex: -1 }}
        />
        <div
            className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-12 animate-blob animation-delay-4000"
            style={{ background: 'hsl(27 100% 53%)', zIndex: -1 }}
        />

        {/* ── Three.js Canvas ── */}
        <Canvas
            camera={{ position: [0, 0, 10], fov: 55 }}
            dpr={[1, 1.5]}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
            gl={{ antialias: false, alpha: true }}
            frameloop="always"
        >
            <Suspense fallback={null}>
                <ConstellationScene />
            </Suspense>
        </Canvas>
    </div>
);

export default ThreeBackground;
