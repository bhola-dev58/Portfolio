const ThreeBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -10 }} aria-hidden="true">
            {/* Dynamic theme background base */}
            <div className="absolute inset-0 bg-background transition-colors duration-500" style={{ zIndex: -2 }} />

            {/* Soft ambient background gradient blobs */}
            <div className="absolute -top-28 -left-28 w-[650px] h-[650px] rounded-full blur-[120px] opacity-15 dark:opacity-45 animate-blob" style={{ background: 'hsl(27 100% 53%)', zIndex: -1 }} />
            <div className="absolute top-1/4 -right-24 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 dark:opacity-40 animate-blob animation-delay-2000" style={{ background: 'hsl(199 89% 48%)', zIndex: -1 }} />
            <div className="absolute -bottom-24 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 dark:opacity-35 animate-blob animation-delay-4000" style={{ background: 'hsl(270 85% 62%)', zIndex: -1 }} />
        </div>
    );
};

export default ThreeBackground;
