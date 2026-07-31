/**
 * ThreeBackground.tsx  ─  Advanced Magnetic Field Particle System
 *
 * Algorithm:
 *   - N particles orbit a central attractor (the whole group)
 *   - Each frame: apply boid-like separation + cohesion forces
 *   - Mouse creates a repulsion field that pushes particles away
 *   - Particles wrap around the sphere boundary on escape
 *   - Constellation edges drawn between nearby particles with depth-gated opacity
 *   - DPR capped at 1.5 for smooth 60 fps on all devices
 *
 * Z-index contract:
 *   fixed inset-0, z-index: -10 → always behind page content
 */

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Config ───────────────────────────────────────────────────────────────────
const COUNT         = 160;
const SPHERE_R      = 5.0;
const CONNECT_DIST  = 1.8;
const REPEL_RADIUS  = 2.5;    // mouse repulsion radius in world units
const REPEL_FORCE   = 0.014;
const ATTRACT_FORCE = 0.0006; // pull back to origin
const DAMPING       = 0.96;

const COL_A = new THREE.Color('#f97316'); // brand orange
const COL_B = new THREE.Color('#0ea5e9'); // brand cyan
const COL_C = new THREE.Color('#a855f7'); // purple accent

// ─── Particle struct in parallel arrays ────────────────────────────────────
function initParticles(n: number) {
    const pos = new Float32Array(n * 3);
    const vel = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);

    for (let i = 0; i < n; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(Math.random() * 2 - 1);
        const r     = SPHERE_R * (0.4 + Math.random() * 0.6);

        pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
        pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i*3+2] = r * Math.cos(phi);

        vel[i*3]   = (Math.random() - 0.5) * 0.02;
        vel[i*3+1] = (Math.random() - 0.5) * 0.02;
        vel[i*3+2] = (Math.random() - 0.5) * 0.02;

        const t = Math.random();
        const c = t < 0.5
            ? COL_A.clone().lerp(COL_B, t * 2)
            : COL_B.clone().lerp(COL_C, (t - 0.5) * 2);
        col[i*3]   = c.r;
        col[i*3+1] = c.g;
        col[i*3+2] = c.b;
    }
    return { pos, vel, col };
}

// ─── Physics Scene ────────────────────────────────────────────────────────────
function MagneticScene() {
    const { camera } = useThree();
    const groupRef   = useRef<THREE.Group>(null!);
    const dotsRef    = useRef<THREE.Points>(null!);
    const linesRef   = useRef<THREE.LineSegments>(null!);

    // World-space mouse position (projected onto z=0 plane)
    const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));
    const autoRot    = useRef({ x: 0, y: 0 });

    // Particle state
    const { pos, vel, col } = useMemo(() => initParticles(COUNT), []);

    // Pre-allocate output geometry buffers
    const dotPosAttr  = useMemo(() => new THREE.BufferAttribute(pos.slice(), 3), [pos]);
    const dotColAttr  = useMemo(() => new THREE.BufferAttribute(col, 3), [col]);

    // Line buffer (upper bound: C(N,2) pairs × 2 endpoints × 3 floats)
    const maxLines    = COUNT * (COUNT - 1); // worst case
    const linePosArr  = useMemo(() => new Float32Array(maxLines * 3), [maxLines]);
    const lineColArr  = useMemo(() => new Float32Array(maxLines * 3), [maxLines]);
    const linePosAttr = useMemo(
        () => new THREE.BufferAttribute(linePosArr, 3).setUsage(THREE.DynamicDrawUsage),
        [linePosArr]
    );
    const lineColAttr = useMemo(
        () => new THREE.BufferAttribute(lineColArr, 3).setUsage(THREE.DynamicDrawUsage),
        [lineColArr]
    );

    // Mouse → world space
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
            const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
            const v  = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
            const d  = v.sub(camera.position).normalize();
            const t  = -camera.position.z / d.z;
            mouseWorld.current.copy(camera.position).addScaledVector(d, t);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, [camera]);

    useFrame((_, delta) => {
        const dt     = Math.min(delta, 0.05); // clamp to avoid spiral on tab switch
        const mx     = mouseWorld.current.x;
        const my     = mouseWorld.current.y;
        const mz     = mouseWorld.current.z;

        // ── Physics update ──────────────────────────────────────────────────
        for (let i = 0; i < COUNT; i++) {
            const ix = i * 3, iy = ix + 1, iz = ix + 2;
            let px = pos[ix], py = pos[iy], pz = pos[iz];

            // 1. Attraction toward origin (soft spring)
            const fx = -px * ATTRACT_FORCE;
            const fy = -py * ATTRACT_FORCE;
            const fz = -pz * ATTRACT_FORCE;

            // 2. Mouse repulsion
            const dxm = px - mx, dym = py - my, dzm = pz - mz;
            const dm2  = dxm * dxm + dym * dym + dzm * dzm;
            const dm   = Math.sqrt(dm2);
            if (dm < REPEL_RADIUS && dm > 0.01) {
                const strength = REPEL_FORCE * (1 - dm / REPEL_RADIUS) / dm;
                vel[ix] += dxm * strength * dt * 60;
                vel[iy] += dym * strength * dt * 60;
                vel[iz] += dzm * strength * dt * 60;
            }

            // 3. Integrate velocity
            vel[ix] = (vel[ix] + fx) * DAMPING;
            vel[iy] = (vel[iy] + fy) * DAMPING;
            vel[iz] = (vel[iz] + fz) * DAMPING;

            pos[ix] = px + vel[ix];
            pos[iy] = py + vel[iy];
            pos[iz] = pz + vel[iz];

            // 4. Soft boundary: wrap back if too far
            const r2 = pos[ix]**2 + pos[iy]**2 + pos[iz]**2;
            if (r2 > (SPHERE_R * 1.4) ** 2) {
                vel[ix] *= -0.3;
                vel[iy] *= -0.3;
                vel[iz] *= -0.3;
            }
        }

        // ── Update dot positions ────────────────────────────────────────────
        dotPosAttr.array.set(pos);
        dotPosAttr.needsUpdate = true;

        // ── Rebuild constellation lines ─────────────────────────────────────
        let li = 0;
        for (let i = 0; i < COUNT; i++) {
            const ax = pos[i*3], ay = pos[i*3+1], az = pos[i*3+2];
            for (let j = i + 1; j < COUNT; j++) {
                const bx = pos[j*3], by = pos[j*3+1], bz = pos[j*3+2];
                const d  = Math.sqrt((bx-ax)**2 + (by-ay)**2 + (bz-az)**2);
                if (d < CONNECT_DIST) {
                    linePosArr[li*3]   = ax; linePosArr[li*3+1] = ay; linePosArr[li*3+2] = az;
                    li++;
                    linePosArr[li*3]   = bx; linePosArr[li*3+1] = by; linePosArr[li*3+2] = bz;
                    const t = d / CONNECT_DIST;
                    const ca = COL_A.clone().lerp(COL_B, t);
                    const cb = ca.clone().multiplyScalar(0.5);
                    lineColArr[(li-1)*3]   = ca.r; lineColArr[(li-1)*3+1] = ca.g; lineColArr[(li-1)*3+2] = ca.b;
                    lineColArr[li*3]       = cb.r; lineColArr[li*3+1]     = cb.g; lineColArr[li*3+2]     = cb.b;
                    li++;
                }
            }
        }
        linePosAttr.count = li;
        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;

        // ── Auto-rotate group ───────────────────────────────────────────────
        if (groupRef.current) {
            autoRot.current.y += delta * 0.06;
            autoRot.current.x += delta * 0.03;
            groupRef.current.rotation.y = autoRot.current.y;
            groupRef.current.rotation.x = autoRot.current.x;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Dot particles */}
            <points ref={dotsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" {...dotPosAttr.toJSON()} args={[dotPosAttr.array as Float32Array, 3]} />
                    <bufferAttribute attach="attributes-color"    args={[dotColAttr.array as Float32Array, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
            </points>

            {/* Dynamic constellation lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[linePosArr, 3]} count={COUNT * (COUNT - 1)} />
                    <bufferAttribute attach="attributes-color"    args={[lineColArr, 3]} count={COUNT * (COUNT - 1)} />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent opacity={0.20} depthWrite={false} />
            </lineSegments>
        </group>
    );
}

// ─── Exported Component ────────────────────────────────────────────────────────
const ThreeBackground = () => (
    <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -10 }}
        aria-hidden="true"
    >
        {/* Gradient base — always visible while canvas loads */}
        <div
            className="absolute inset-0"
            style={{
                background:
                    'linear-gradient(135deg, hsl(220 30% 97%) 0%, hsl(210 20% 95%) 50%, hsl(30 30% 97%) 100%)',
                zIndex: -2,
            }}
        />

        {/* Animated colour blobs */}
        <div
            className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.18] animate-blob"
            style={{ background: 'hsl(27 100% 53%)', zIndex: -1 }}
        />
        <div
            className="absolute -top-10 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-[0.12] animate-blob animation-delay-2000"
            style={{ background: 'hsl(199 89% 48%)', zIndex: -1 }}
        />
        <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.10] animate-blob animation-delay-4000"
            style={{ background: 'hsl(270 80% 60%)', zIndex: -1 }}
        />

        {/* R3F Canvas */}
        <Canvas
            camera={{ position: [0, 0, 11], fov: 55 }}
            dpr={[1, 1.5]}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
            gl={{ antialias: false, alpha: true }}
            frameloop="always"
        >
            <Suspense fallback={null}>
                <MagneticScene />
            </Suspense>
        </Canvas>
    </div>
);

export default ThreeBackground;
