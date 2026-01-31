
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const JQueryEffect = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all animate-in fade-in zoom-in duration-300"
            aria-label="Back to top"
        >
            <ArrowUp size={24} />
            <span className="sr-only">Back to top</span>
        </button>
    );
};

export default JQueryEffect;
