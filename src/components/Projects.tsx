import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "DebugVerse - AI-Based Code Debugger",
    period: "Mar 2025 – Apr 2025",
    description:
      "Full-stack code debugger with FastAPI and ReactJS, using Gemini API for real-time AI-powered debugging",
    highlights: [
      "Multi-language support (Python, Java, C++)",
      "Markdown-based fixes and secure input via dotenv",
      "Responsive UI with live editor and syntax highlighting",
    ],
    tags: ["FastAPI", "React.js", "Gemini API", "Python"],
  },
  {
    title: "CareMate-AI - Healthcare Chat-bot",
    period: "Jan 2025 – Feb 2025",
    description:
      "AI-powered chat-bot using Streamlit and Generative-AI's Gemini API for real-time health query responses",
    highlights: [
      "Predefined responses for frequent queries, reducing API calls by 30%",
      "Interactive chat UI with dynamic message rendering",
      "State management using Streamlit",
    ],
    tags: ["Python", "Streamlit", "Gemini API", "NLP"],
  },
  {
    title: "JLiveChats - Real-Time Chat Application",
    period: "Aug 2024 – Sep 2024",
    description: "Java-based real-time chat application with client-server architecture",
    highlights: [
      "Java Sockets for real-time messaging",
      "Multi-user communication support",
      "Responsive UI with AWT and Swing",
    ],
    tags: ["Java", "Sockets", "AWT", "Swing"],
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary/20 md:-translate-x-1/2" />

            <div className="space-y-16 md:space-y-20">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Timeline connector line (mobile only) */}
                  <div className="absolute left-4 top-6 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent md:hidden" />

                  {/* Timeline dot with icon */}
                  <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center border-4 border-background shadow-lg">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content wrapper */}
                  <div className="md:grid md:grid-cols-2 md:gap-12">
                    {/* Left side (Odd indices usually go here for zigzag) */}
                    <div className="hidden md:block">
                      {index % 2 !== 0 && (
                        <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
                          <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">
                            {project.period}
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 break-words">
                            {project.title}
                          </h3>

                          <p className="text-sm md:text-base text-muted-foreground mb-4 break-words">
                            {project.description}
                          </p>

                          <ul className="space-y-2 mb-4">
                            {project.highlights.map((highlight, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start">
                                <span className="text-secondary mr-2 shrink-0">▸</span>
                                <span className="break-words">{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-primary/50 text-primary text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </Card>
                      )}
                    </div>

                    {/* Right side (Even indices usually go here for zigzag) */}
                    <div className="ml-12 md:ml-0">
                      {/* Mobile Card (Always rendered here for mobile layout) */}
                      <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group md:hidden">
                        <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">
                          {project.period}
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 break-words">
                          {project.title}
                        </h3>

                        <p className="text-sm md:text-base text-muted-foreground mb-4 break-words">
                          {project.description}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-secondary mr-2 shrink-0">▸</span>
                              <span className="break-words">{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="border-primary/50 text-primary text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card>

                      {/* Desktop Card (Only even indices) */}
                      {index % 2 === 0 && (
                        <Card className="hidden md:block p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
                          <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">
                            {project.period}
                          </div>

                          <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 break-words">
                            {project.title}
                          </h3>

                          <p className="text-sm md:text-base text-muted-foreground mb-4 break-words">
                            {project.description}
                          </p>

                          <ul className="space-y-2 mb-4">
                            {project.highlights.map((highlight, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start">
                                <span className="text-secondary mr-2 shrink-0">▸</span>
                                <span className="break-words">{highlight}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-primary/50 text-primary text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </Card>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
