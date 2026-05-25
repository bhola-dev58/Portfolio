import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import SEO from "@/components/SEO";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {
    const { scrollYProgress } = useScroll();
    const location = useLocation();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (location.state && (location.state as any).scrollTo) {
            const id = (location.state as any).scrollTo;
            // Clear the state so it doesn't trigger scroll on page refreshes
            window.history.replaceState({}, document.title);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 150);
        }
    }, [location]);

    return (
        <div className="relative">
            <SEO title="Home" description="Welcome to Bhola Yadav's Portfolio. Explore my full-stack development, AI projects, and internship history." />
            
            {/* Elegant Global Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary z-50 origin-left"
                style={{ scaleX }}
            />
            
            <main className="relative z-10">
                {/* 1. HERO SECTION */}
                <div id="home">
                    <Hero />
                </div>
                
                {/* 2. ABOUT SECTION */}
                <div id="about" className="scroll-mt-16">
                    <About />
                </div>
                
                {/* 3. SKILLS SECTION */}
                <div id="skills" className="scroll-mt-16">
                    <Skills />
                </div>
                
                {/* 4. EXPERIENCE SECTION */}
                <div id="experience" className="scroll-mt-16">
                    <Experience />
                </div>
                
                {/* 5. PROJECTS SECTION */}
                <div id="projects" className="scroll-mt-16">
                    <Projects />
                </div>
                
                {/* 6. CERTIFICATIONS SECTION */}
                <div id="certifications" className="scroll-mt-16">
                    <Certifications />
                </div>
                
                {/* 7. CONTACT SECTION */}
                <div id="contact" className="scroll-mt-16">
                    <Contact />
                </div>
            </main>
        </div>
    );
};

export default Home;
