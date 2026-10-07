import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", targetId: "home", path: "/" },
  { name: "About", targetId: "about", path: "/" },
  { name: "Skills", targetId: "skills", path: "/" },
  { name: "Internship", targetId: "experience", path: "/" },
  { name: "My Work", targetId: "my-work", path: "/my-work" },
  { name: "Projects", targetId: "projects", path: "/" },
  { name: "Certifications", targetId: "certifications", path: "/" },
  { name: "Contact", targetId: "contact", path: "/" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Initializer - Default Dark Mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme ? savedTheme === "dark" : true;

    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    if (location.pathname.startsWith("/my-work")) {
      setActiveSection("my-work");
      return;
    }

    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observers = navItems.filter(i => i.path === "/").map((item) => {
      const el = document.getElementById(item.targetId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.targetId);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px",
        }
      );
      observer.observe(el);
      return { observer, el, targetId: item.targetId };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [location.pathname]);

  const handleNavClick = (item: { name: string; targetId: string; path?: string }) => {
    setIsOpen(false);

    if (item.path && item.path !== "/") {
      navigate(item.path);
      setActiveSection(item.targetId);
      return;
    }

    const scrollToTarget = () => {
      const element = document.getElementById(item.targetId);
      if (element) {
        const yOffset = -70; // Header offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    if (location.pathname === "/") {
      setTimeout(scrollToTarget, 120);
    } else {
      navigate("/", { state: { scrollTo: item.targetId } });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-3 left-0 right-0 z-50 transition-all duration-300 bg-transparent pointer-events-none"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-center h-16">
          {/* Desktop Navigation - Soft Transparent Neumorphic Capsule */}
          <div className="hidden md:flex items-center space-x-1.5 pointer-events-auto px-4 py-1.5 rounded-full bg-background/30 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[6px_6px_18px_rgba(0,0,0,0.08),-6px_-6px_18px_rgba(255,255,255,0.6)] dark:shadow-[8px_8px_24px_rgba(0,0,0,0.7),-6px_-6px_20px_rgba(255,255,255,0.03)]">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-full relative ${
                  activeSection === item.targetId
                    ? "text-primary font-bold shadow-[inset_2px_2px_5px_rgba(0,0,0,0.12),inset_-2px_-2px_5px_rgba(255,255,255,0.5)] dark:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] bg-primary/10 dark:bg-primary/20"
                    : "text-foreground/80 hover:text-primary hover:bg-white/30 dark:hover:bg-white/5"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {activeSection === item.targetId && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full bg-primary/15 dark:bg-primary/25 border border-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Dark / Light Mode Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark / Light theme"
              className="p-2 ml-2 rounded-full text-foreground hover:text-primary transition-all shadow-[3px_3px_8px_rgba(0,0,0,0.08),-3px_-3px_8px_rgba(255,255,255,0.6)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.6),-4px_-4px_10px_rgba(255,255,255,0.03)] hover:scale-105 active:scale-95 bg-background/20 dark:bg-slate-900/30 border border-white/20 dark:border-white/5"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center justify-end w-full gap-2 pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/30 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[6px_6px_16px_rgba(0,0,0,0.08),-6px_-6px_16px_rgba(255,255,255,0.5)] dark:shadow-[6px_6px_20px_rgba(0,0,0,0.6),-4px_-4px_16px_rgba(255,255,255,0.03)]">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full text-foreground hover:text-primary transition-all"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground hover:text-primary transition-colors p-2"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pointer-events-auto backdrop-blur-xl bg-background/80 dark:bg-slate-900/80 border-t border-border/50 shadow-2xl mt-2"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    activeSection === item.targetId
                      ? "text-primary font-semibold bg-primary/10 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]"
                      : "text-foreground hover:text-primary hover:bg-accent/20"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
