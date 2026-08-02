import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Code2, MessageSquare, Award } from "lucide-react";
import profileImage from "@/assets/profile.png";
import resumePdf from "@/assets/resume/My_Resume.pdf";

// Official Tech Brand SVG Logo Components
const JavaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path fill="#e76f00" d="M8.851 18.56s-.917.518-.457.774c.734.409 2.502.583 3.659.27 1.157-.313 4.316-1.103 4.316-1.103s-1.637 1.022-1.077 1.416c.559.395 3.328-.352 4.417-.923 1.09-.57 2.766-1.603 2.766-1.603s-1.002.378-1.996.5c-.994.122-2.583-.075-2.583-.075s1.282-.44 2.302-.91c1.02-.47 1.865-1.116 1.865-1.116s-1.8.528-3.48.74c-1.68.212-4.298.118-4.298.118s1.956-.693 3.309-1.348c1.353-.655 2.368-1.503 2.368-1.503s-2.17.76-4.148 1.108c-1.978.348-3.957.375-3.957.375s2.072-.756 3.616-1.564c1.544-.808 2.411-1.724 2.411-1.724s-2.41.7-4.48 1.319c-2.07.618-3.37 1.077-3.37 1.077s.867-.484 2.025-.94c1.158-.457 2.315-1.049 2.315-1.049s-1.833.456-3.23.913c-1.397.457-2.41.913-2.41.913s.867-.512 1.832-.942c.965-.43 1.929-.834 1.929-.834s-1.543.296-2.701.726c-1.158.43-1.736.753-1.736.753s.578-.403 1.543-.753c.965-.35 1.832-.672 1.832-.672s-1.447.161-2.508.51c-1.061.35-1.398.538-1.398.538s.627-.35 1.495-.618c.868-.27 1.543-.457 1.543-.457s-1.205.054-2.073.296c-.868.242-1.109.377-1.109.377s.578-.269 1.254-.457c.675-.188 1.133-.269 1.133-.269s-.771 0-1.446.161c-.675.161-.844.242-.844.242s.41-.188.94-.323c.53-.134.843-.161.843-.161s-.578 0-1.036.107c-.458.107-.53.134-.53.134s.265-.107.65-.188c.386-.08.603-.08.603-.08s-.386 0-.699.054c-.313.054-.361.054-.361.054s.193-.054.458-.08c.265-.027.41-.027.41-.027s-.289 0-.506.027c-.217.027-.241.027-.241.027s.145-.027.337-.027c.193 0 .289 0 .289 0s-.217 0-.361.014c-.145.013-.169.013-.169.013s.096-.013.217-.013c.12 0 .193 0 .193 0" />
    <path fill="#5382a1" d="M12.984 1.125s1.956 2.096.024 4.542c-1.543 1.96-2.583 3.655-2.025 5.56 0 0-2.435-2.016-.867-5.025 1.254-2.392 2.868-3.454 2.868-5.077z" />
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#3776ab" d="M11.898 1.05c-5.26 0-4.935 2.28-4.935 2.28l.006 2.36h5.011v.708H4.992S1.7 6.035 1.7 11.314c0 5.28 2.88 5.1 2.88 5.1h1.722v-2.43s-.093-2.88 2.842-2.88h4.896s2.753.047 2.753-2.656V4.492s.434-3.442-4.895-3.442z" />
    <path fill="#ffe873" d="M12.102 22.95c5.26 0 4.935-2.28 4.935-2.28l-.006-2.36h-5.011v-.708h6.988s3.292.363 3.292-4.916c0-5.28-2.88-5.1-2.88-5.1h-1.722v2.43s.093 2.88-2.842 2.88h-4.896s-2.753-.047-2.753 2.656v3.957s-.434 3.442 4.895 3.442z" />
    <circle cx="8.6" cy="3.5" r=".8" fill="#fff" />
    <circle cx="15.4" cy="20.5" r=".8" fill="#fff" />
  </svg>
);

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61dafb" strokeWidth="1.5" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61dafb" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61dafb" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#61dafb" />
  </svg>
);

const NodeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#68a063" d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm7.9 16.1l-7.9 4.6-7.9-4.6V8.9L12 4.3l7.9 4.6v9.2z" />
    <path fill="#417e38" d="M12 4.3v17.4l7.9-4.6V8.9L12 4.3z" />
  </svg>
);

const NextjsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.5" />
    <path stroke="#fff" strokeWidth="2" strokeLinecap="round" d="M9 8v8M15 8l-6 8M15 8v8" />
  </svg>
);

const AILogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="url(#aiGrad)" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z" />
    <defs>
      <linearGradient id="aiGrad" x1="2" y1="2" x2="22" y2="22">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const AWSLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#ff9900" d="M6.8 17.2c2.8 1.8 7.3 2.5 10.8.6.5-.3.8-.1.4.3-1.6 1.4-4.8 2.4-8.1 2.1-2.6-.2-5.1-1.3-6.9-3.2-.3-.3 0-.6.4-.3zM18.8 16.3c.4-.5 1.7-.2 2.1.3.4.5.1 1.6-.3 2.1-.4.5-1.1.2-1.3-.2-.2-.5-.9-1.7-.5-2.2z" />
    <path fill="#ff9900" d="M12 4.5c-3.1 0-5.3 1.6-5.3 4.1 0 2.2 1.6 3.4 3.7 4.1.3.1.6.2.6.5 0 .3-.3.5-.8.5-.8 0-1.8-.3-2.6-.8-.3-.2-.5 0-.6.2l-.4.8c-.1.2 0 .4.2.5 1.1.7 2.4 1 3.7 1 3.3 0 5.4-1.7 5.4-4.1 0-2.3-1.6-3.4-3.7-4.1-.4-.1-.6-.2-.6-.5 0-.3.3-.4.7-.4.7 0 1.5.2 2.2.6.2.1.4 0 .5-.2l.4-.8c.1-.2 0-.4-.2-.5-.9-.6-2.1-.9-3.3-.9z" />
  </svg>
);

const PostgresLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .88-.36 1.68-.93 2.25z" />
  </svg>
);

const MongoDBLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#47A248" d="M12 2C11.6 4.3 9.4 8.7 9.4 12.3c0 3.8 2.2 6.5 2.6 7.7.1.3.3.3.4.1.7-1.4 2.2-4.1 2.2-7.8C14.6 8.7 12.4 4.3 12 2z" />
    <path fill="#499D4A" d="M11.9 22.8c-.1 0-.2-.1-.2-.2 0 0-.1-2.4-1.2-5-1.1-2.5-2.7-4.8-2.7-8.1 0-3.3 1.8-6.7 4.1-8.5.1-.1.2 0 .2.1 0 0 .1.1.1.2C10.1 3.5 8.6 6.6 8.6 9.5c0 3.1 1.5 5.2 2.5 7.6 1.1 2.5 1.1 4.7 1.1 4.7 0 .1-.1.2-.2.2z" />
    <path fill="#3F8E41" d="M12.1 22.8c-.1 0-.2-.1-.2-.2 0 0 0-2.2 1.1-4.7 1-2.4 2.5-4.5 2.5-7.6 0-2.9-1.5-6-3.6-8.2 0-.1 0-.2.1-.2s.2-.1.2 0c2.3 1.8 4.1 5.2 4.1 8.5 0 3.3-1.6 5.6-2.7 8.1-1.1 2.6-1.2 5-1.2 5 0 .1-.1.2-.3.2z" />
  </svg>
);

const ExpressLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <text
      x="12"
      y="16.5"
      textAnchor="middle"
      fontSize="14"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      letterSpacing="-0.5px"
    >
      ex
    </text>
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#2496ED" d="M13.98 11.08h1.86v1.74h-1.86zm-2.42 0h1.87v1.74h-1.87zm-2.43 0h1.87v1.74H9.13zm-2.43 0h1.87v1.74H6.7zm4.86-2.28h1.87v1.74h-1.87zm-2.43 0h1.87v1.74H9.13zm-2.43 0h1.87v1.74H6.7zm2.43-2.28h1.87v1.74H9.13zm12.35 6.78c-.46-.33-1.54-.44-2.38-.28-.27-.72-.73-1.34-1.31-1.78-.34-.26-.87-.45-1.34-.45h-.26c-.19-.48-.48-.92-.85-1.28l-.34.34c.29.3.52.66.67 1.05-.12.01-.25.03-.37.06-.9.2-1.63.78-2.02 1.6h-.37v-1.74h-1.87v1.74h-.54c-.26 0-.5.06-.72.18V6.5h1.87V4.76h-1.87V3h-1.86v1.76H9.13V3H7.26v1.76H5.4V6.5h1.86v4.54H4.5v1.74h1.76c-.03.22-.05.45-.05.68 0 3.37 2.74 6.1 6.1 6.1 3.23 0 5.89-2.5 6.08-5.7.53-.12 1.13-.08 1.63.15.5.24.89.65 1.1 1.16.08.19.26.31.46.31.05 0 .1 0 .15-.02.25-.09.38-.37.29-.62-.26-.74-.82-1.34-1.55-1.68z" />
  </svg>
);

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Tech items for inner orbit (Clockwise rotation)
  const innerOrbitSkills = [
    { name: "Java", icon: <JavaLogo />, angle: 0, border: "border-amber-500/60" },
    { name: "Python", icon: <PythonLogo />, angle: 72, border: "border-purple-500/60" },
    { name: "React", icon: <ReactLogo />, angle: 144, border: "border-cyan-500/60" },
    { name: "Node.js", icon: <NodeLogo />, angle: 216, border: "border-emerald-500/60" },
    { name: "Express.js", icon: <ExpressLogo />, angle: 288, border: "border-slate-400/60" },
  ];

  // Tech items for outer orbit (Counter-Clockwise rotation)
  const outerOrbitSkills = [
    { name: "Next.js", icon: <NextjsLogo />, angle: 0, border: "border-slate-300/60" },
    { name: "AI / ML", icon: <AILogo />, angle: 60, border: "border-rose-500/60" },
    { name: "MongoDB", icon: <MongoDBLogo />, angle: 120, border: "border-emerald-500/60" },
    { name: "Docker", icon: <DockerLogo />, angle: 180, border: "border-blue-400/60" },
    { name: "AWS", icon: <AWSLogo />, angle: 240, border: "border-amber-400/60" },
    { name: "PostgreSQL", icon: <PostgresLogo />, angle: 300, border: "border-blue-500/60" },
  ];

  const outerRadius = isMobile ? 155 : 230;
  const innerRadius = isMobile ? 105 : 160;

  return (
    <section id="home" className="min-h-[70vh] flex items-center justify-center relative overflow-hidden px-4 pt-24 md:pt-16 pb-12">
      <div className="container mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:pr-6"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">Bhola Yadav</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack & AI Software Engineer
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting high-performance web applications & AI solutions with <span className="text-foreground font-semibold">Java, Python, ReactJS, Node.js, Express.js, MongoDB, Docker, and PostgreSQL</span>.
            </motion.p>

            {/* Impact-Driven Stats Bar with Interactive Hover Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 mb-8 p-3.5 rounded-2xl bg-card/85 backdrop-blur-md border-2 border-border/80 hover:border-primary/70 shadow-lg hover:shadow-primary/20 hover:shadow-xl transition-all duration-300 text-center cursor-default group"
            >
              <div className="p-1 rounded-xl group-hover:bg-primary/5 transition-colors">
                <p className="text-base md:text-lg font-bold text-primary group-hover:scale-105 transition-transform">3+ Apps</p>
                <p className="text-xs text-muted-foreground font-medium">Shipped to Prod</p>
              </div>
              <div className="border-x border-border/60 p-1 rounded-xl group-hover:bg-secondary/5 transition-colors">
                <p className="text-base md:text-lg font-bold text-secondary group-hover:scale-105 transition-transform">150+</p>
                <p className="text-xs text-muted-foreground font-medium">LeetCode Solved</p>
              </div>
              <div className="p-1 rounded-xl group-hover:bg-emerald-500/5 transition-colors">
                <p className="text-base md:text-lg font-bold text-emerald-500 group-hover:scale-105 transition-transform">AWS Certified</p>
                <p className="text-xs text-muted-foreground font-medium">Infosys Springboard</p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-orange-500/25 glow-effect"
                onClick={() => handleScrollTo("projects")}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                className="rounded-full px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 font-semibold gap-2"
                asChild
              >
                <a
                  href="https://wa.me/917483509984?text=Hi%20Bhola,%20I%20reviewed%20your%20portfolio%20bhola-yadav.com.np%20and%20would%20like%20to%20discuss%20a%20Developer%20opportunity!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="w-4 h-4" /> Quick Chat
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
                asChild
              >
                <a href={resumePdf} download="Bhola_Yadav_Resume.pdf">
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex gap-6 justify-center lg:justify-start mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="https://github.com/bhola-dev58"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-7 h-7" />
              </a>
              <a
                href="https://linkedin.com/in/bhola-dev58"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-secondary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-7 h-7" />
              </a>
              <a
                href="https://leetcode.com/u/bhola-dev58"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LeetCode Profile"
              >
                <Code2 className="w-7 h-7" />
              </a>
              <a
                href="mailto:bhola.dev58@gmail.com"
                className="text-muted-foreground hover:text-secondary transition-colors"
                aria-label="Email Direct"
              >
                <Mail className="w-7 h-7" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Section - Solar System Orbiting Tech Stack Around Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center items-center relative my-6 lg:my-0 py-4 min-h-[340px] md:min-h-[500px]"
          >
            {/* Outer Solar Orbit Ring */}
            <motion.div
              className="absolute w-[310px] h-[310px] md:w-[460px] md:h-[460px] rounded-full border-2 border-primary/40 border-dashed pointer-events-none shadow-[0_0_15px_rgba(249,115,22,0.15)]"
              animate={{ rotate: -360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            >
              {outerOrbitSkills.map((skill, index) => {
                const rad = (skill.angle * Math.PI) / 180;
                const x = outerRadius * Math.cos(rad);
                const y = outerRadius * Math.sin(rad);

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 pointer-events-auto"
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                      className={`w-9 h-9 md:w-11 md:h-11 rounded-full bg-white dark:bg-slate-900 border-2 ${skill.border} shadow-xl flex items-center justify-center hover:scale-125 transition-all group relative cursor-pointer`}
                    >
                      <span className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">{skill.icon}</span>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white border border-border shadow-md whitespace-nowrap pointer-events-none z-30">
                        {skill.name}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Inner Solar Orbit Ring */}
            <motion.div
              className="absolute w-[210px] h-[210px] md:w-[320px] md:h-[320px] rounded-full border-2 border-secondary/50 border-dashed pointer-events-none shadow-[0_0_15px_rgba(14,165,233,0.15)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {innerOrbitSkills.map((skill, index) => {
                const rad = (skill.angle * Math.PI) / 180;
                const x = innerRadius * Math.cos(rad);
                const y = innerRadius * Math.sin(rad);

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 pointer-events-auto"
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-slate-900 border-2 ${skill.border} shadow-lg flex items-center justify-center hover:scale-125 transition-all group relative cursor-pointer`}
                    >
                      <span className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 flex items-center justify-center">{skill.icon}</span>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white border border-border shadow-md whitespace-nowrap pointer-events-none z-30">
                        {skill.name}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Center Profile Photo Frame (The Core / Sun) */}
            <div className="relative z-20 flex flex-col items-center">
              <motion.div
                className="relative w-36 h-36 md:w-52 md:h-52"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Photo Circle */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/40 shadow-2xl glow-effect">
                  <img
                    src={profileImage}
                    alt="Bhola Yadav - Full-Stack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Verified AWS Badge Floating Over Bottom Border */}
                <a
                  href="https://verify.onwingspan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/95 dark:bg-slate-950/95 border-2 border-amber-500/80 shadow-xl text-[10px] md:text-[11px] font-extrabold text-amber-400 hover:text-amber-300 backdrop-blur-md transition-all cursor-pointer z-30 whitespace-nowrap hover:scale-105"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" /> AWS Certified Dev
                </a>
              </motion.div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
