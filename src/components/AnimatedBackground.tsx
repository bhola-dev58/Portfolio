import { useEffect, useRef } from 'react';

interface Point3D {
    x: number;
    y: number;
    z: number;
    px: number;
    py: number;
    vx: number;
    vy: number;
    vz: number;
    color: string;
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Parameters
        const PARTICLE_COUNT = 85;
        const FOV = 280; // Field of view (perspective calculation)
        const CAMERA_DEPTH = 320;
        const MAX_Z = 200;
        const CONNECT_DISTANCE = 110;

        const particles: Point3D[] = [];
        const mouse = { x: 0, y: 0, rx: 0, ry: 0, active: false };

        // Generate points in 3D sphere coordinate
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 100 + Math.random() * 180;

            particles.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi),
                px: 0,
                py: 0,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                vz: (Math.random() - 0.5) * 0.4,
                color: i % 2 === 0 ? "24" : "199", // Orange theme accent and primary accents
            });
        }

        // Handle resize
        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX - width / 2;
            mouse.y = e.clientY - height / 2;
            mouse.active = true;
        };
        const handleMouseLeave = () => {
            mouse.active = false;
        };
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Main 3D render loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Interpolate mouse coordinates smoothly
            mouse.rx += (mouse.x - mouse.rx) * 0.08;
            mouse.ry += (mouse.y - mouse.ry) * 0.08;

            // Rotation angle increments (dynamic drift + responsive mouse tilting)
            const angleY = 0.0015 + (mouse.active ? (mouse.rx * 0.000015) : 0);
            const angleX = 0.0008 + (mouse.active ? (mouse.ry * 0.000008) : 0);

            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);
            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);

            // Project and rotate 3D points
            particles.forEach((p) => {
                // Rotate around Y-axis
                let x1 = p.x * cosY - p.z * sinY;
                let z1 = p.z * cosY + p.x * sinY;

                // Rotate around X-axis
                let y2 = p.y * cosX - z1 * sinX;
                let z2 = z1 * cosX + p.y * sinX;

                // Physics drift updates
                p.x = x1 + p.vx;
                p.y = y2 + p.vy;
                p.z = z2 + p.vz;

                // Restrict boundary sphere drift
                const distFromCenter = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
                if (distFromCenter > 320) {
                    p.vx = -p.vx;
                    p.vy = -p.vy;
                    p.vz = -p.vz;
                }

                // Push perspective projection points to 2D
                const scale = FOV / (CAMERA_DEPTH + p.z);
                p.px = p.x * scale + width / 2;
                p.py = p.y * scale + height / 2;
            });

            // Draw elastic constellation connections based on 3D depth field
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];

                    // Check distance in projected 2D coordinates
                    const dx = p1.px - p2.px;
                    const dy = p1.py - p2.py;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECT_DISTANCE) {
                        const depthFactor = 1 - (p1.z + p2.z) / (2 * MAX_Z);
                        const opacity = (1 - dist / CONNECT_DISTANCE) * 0.16 * depthFactor;

                        if (opacity > 0) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(249, 115, 22, ${opacity})`; // Orange primary flow
                            ctx.lineWidth = 0.8 * scaleThickness(p1.z + p2.z);
                            ctx.moveTo(p1.px, p1.py);
                            ctx.lineTo(p2.px, p2.py);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Render projected 3D nodes
            particles.forEach((p) => {
                const depthFactor = 1 - p.z / MAX_Z;
                const size = Math.max(1, (1.8 * FOV) / (CAMERA_DEPTH + p.z));
                const opacity = Math.max(0.1, 0.45 * depthFactor);

                ctx.beginPath();
                ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.color}, 95%, 50%, ${opacity})`;
                ctx.fill();

                // Subtle outer halo on closer nodes
                if (p.z < 0) {
                    ctx.beginPath();
                    ctx.arc(p.px, p.py, size * 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${p.color}, 95%, 50%, ${opacity * 0.18})`;
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const scaleThickness = (z: number) => {
            const depth = CAMERA_DEPTH + z / 2;
            return Math.max(0.2, FOV / depth);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-gradient-to-br from-background via-background/90 to-background pointer-events-none">
            {/* Blurry gradient blobs for deep premium texture */}
            <div className="absolute top-0 -left-12 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 -right-12 w-96 h-96 bg-orange rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-16 left-32 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

            {/* High-performance Interactive 3D WebGL projection Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
            
            {/* Subtle overlay grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] mix-blend-overlay"></div>
        </div>
    );
};

export default AnimatedBackground;
