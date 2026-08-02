import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Clear existing canvas children if any
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // 2. 3D Particles setup - adapt density for mobile
        const isMobile = window.innerWidth < 768;
        const COUNT = isMobile ? 110 : 160;
        const positions = new Float32Array(COUNT * 3);
        const velocities = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);

        const colorA = new THREE.Color('#f97316'); // Orange accent
        const colorB = new THREE.Color('#0ea5e9'); // Cyan primary
        const colorC = new THREE.Color('#a855f7'); // Purple secondary

        for (let i = 0; i < COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const r = 5.5 * (0.3 + Math.random() * 0.7);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            velocities[i * 3] = (Math.random() - 0.5) * 0.015;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

            const t = Math.random();
            const col = t < 0.5 ? colorA.clone().lerp(colorB, t * 2) : colorB.clone().lerp(colorC, (t - 0.5) * 2);
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        // Particle Geometry & Material
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: isMobile ? 0.18 : 0.22,
            vertexColors: true,
            transparent: true,
            opacity: isMobile ? 0.85 : 0.95,
            depthWrite: false,
        });

        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);

        // Constellation Lines
        const maxLines = COUNT * (COUNT - 1);
        const linePositions = new Float32Array(maxLines * 3);
        const lineColors = new Float32Array(maxLines * 3);

        const lineGeometry = new THREE.BufferGeometry();
        const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
        const lineColAttr = new THREE.BufferAttribute(lineColors, 3);
        linePosAttr.setUsage(THREE.DynamicDrawUsage);
        lineColAttr.setUsage(THREE.DynamicDrawUsage);
        lineGeometry.setAttribute('position', linePosAttr);
        lineGeometry.setAttribute('color', lineColAttr);

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: isMobile ? 0.22 : 0.32,
            depthWrite: false,
        });

        const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineSystem);

        // Mouse interaction
        let mouseX = 0, mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            // Rotate particle group gently + mouse response
            particleSystem.rotation.y += 0.0025 + mouseX * 0.0008;
            particleSystem.rotation.x += 0.0012 + mouseY * 0.0008;
            lineSystem.rotation.y = particleSystem.rotation.y;
            lineSystem.rotation.x = particleSystem.rotation.x;

            // Rebuild constellation line connections
            let lineIdx = 0;
            const posArr = particleGeometry.attributes.position.array as Float32Array;
            const CONNECT_DIST = 2.4;

            for (let i = 0; i < COUNT; i++) {
                const ax = posArr[i * 3], ay = posArr[i * 3 + 1], az = posArr[i * 3 + 2];
                for (let j = i + 1; j < COUNT; j++) {
                    const bx = posArr[j * 3], by = posArr[j * 3 + 1], bz = posArr[j * 3 + 2];
                    const dist = Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2 + (bz - az) ** 2);

                    if (dist < CONNECT_DIST) {
                        linePositions[lineIdx * 3] = ax;
                        linePositions[lineIdx * 3 + 1] = ay;
                        linePositions[lineIdx * 3 + 2] = az;
                        lineIdx++;

                        linePositions[lineIdx * 3] = bx;
                        linePositions[lineIdx * 3 + 1] = by;
                        linePositions[lineIdx * 3 + 2] = bz;

                        const t = dist / CONNECT_DIST;
                        const c = colorA.clone().lerp(colorB, t);
                        lineColors[(lineIdx - 1) * 3] = c.r;
                        lineColors[(lineIdx - 1) * 3 + 1] = c.g;
                        lineColors[(lineIdx - 1) * 3 + 2] = c.b;

                        lineColors[lineIdx * 3] = c.r * 0.7;
                        lineColors[lineIdx * 3 + 1] = c.g * 0.7;
                        lineColors[lineIdx * 3 + 2] = c.b * 0.7;
                        lineIdx++;
                    }
                }
            }

            linePosAttr.count = lineIdx;
            linePosAttr.needsUpdate = true;
            lineColAttr.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -10 }} aria-hidden="true">
            {/* Dynamic theme background base */}
            <div className="absolute inset-0 bg-background transition-colors duration-500" style={{ zIndex: -2 }} />

            {/* Soft ambient background gradient blobs */}
            <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 dark:opacity-35 animate-blob" style={{ background: 'hsl(27 100% 53%)', zIndex: -1 }} />
            <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] rounded-full blur-3xl opacity-20 dark:opacity-30 animate-blob animation-delay-2000" style={{ background: 'hsl(199 89% 48%)', zIndex: -1 }} />
            <div className="absolute -bottom-20 left-1/3 w-[550px] h-[550px] rounded-full blur-3xl opacity-20 dark:opacity-25 animate-blob animation-delay-4000" style={{ background: 'hsl(270 80% 60%)', zIndex: -1 }} />

            {/* Direct 3D WebGL Canvas Container */}
            <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
        </div>
    );
};

export default ThreeBackground;
