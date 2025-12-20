import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
    const [bubbles, setBubbles] = useState<Array<{ id: number; left: number; size: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        // Generate random bubbles
        const bubbleCount = 15;
        const newBubbles = Array.from({ length: bubbleCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal position
            size: Math.random() * 80 + 20, // Random size between 20px and 100px
            delay: Math.random() * 5, // Random delay
            duration: Math.random() * 10 + 10, // Random duration between 10s and 20s
        }));
        setBubbles(newBubbles);
    }, []);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-gradient-to-br from-background via-background/90 to-background">
            {/* Moving Gradient blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Floating Bubbles */}
            <div className="absolute inset-0">
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.id}
                        className="absolute bottom-[-100px] rounded-full bg-primary/10 backdrop-blur-sm animate-float-up"
                        style={{
                            left: `${bubble.left}%`,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            animationDelay: `${bubble.delay}s`,
                            animationDuration: `${bubble.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Grid overlay for texture */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay"></div>
        </div>
    );
};

export default AnimatedBackground;
