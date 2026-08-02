import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe } from "lucide-react";
import { useProjects } from "@/lib/api";
import { Project } from "@/lib/initialData";

/* ── Variants ─────────────────────────────────────────────────────────────── */
const heading = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fromLeft = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const fromRight = {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const CATEGORIES = ["All", "Full Stack", "AI / ML", "Java", "Python"];

/* ── Main component ───────────────────────────────────────────────────────── */
export const Projects = () => {
    const { data: projects = [] } = useProjects();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects = projects.filter((project) => {
        if (selectedCategory === "All") return true;
        return project.tags?.some((tag) =>
            tag.toLowerCase().includes(selectedCategory.toLowerCase())
        );
    });

    return (
        <section id="projects" className="min-h-screen flex items-center py-20 px-4">
            <div className="container mx-auto">

                {/* Heading */}
                <motion.h2
                    variants={heading}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl md:text-5xl font-bold mb-8 text-center"
                >
                    Featured <span className="text-gradient">Projects</span>
                </motion.h2>

                {/* Category Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                selectedCategory === cat
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical timeline */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary/20 md:-translate-x-1/2" />

                    <div className="space-y-16 md:space-y-20">
                        {filteredProjects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={project.id}
                                    variants={isEven ? fromRight : fromLeft}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    className="relative"
                                >
                                    {/* Mobile connector */}
                                    <div className="absolute left-4 top-6 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent md:hidden" />

                                    {/* Timeline dot */}
                                    <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center border-4 border-background shadow-lg">
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Zigzag layout */}
                                    <div className="md:grid md:grid-cols-2 md:gap-12">
                                        <div className="hidden md:block">
                                            {!isEven && <ProjectCard project={project} />}
                                        </div>
                                        <div className="ml-12 md:ml-0">
                                            <div className="md:hidden"><ProjectCard project={project} /></div>
                                            <div className="hidden md:block">
                                                {isEven && <ProjectCard project={project} />}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ── Project card ─────────────────────────────────────────────────────────── */
const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full"
    >
        <Card className="p-6 h-full bg-card/85 backdrop-blur-md border border-border/60 shadow-xl hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300 group">
            <div className="inline-block px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold mb-3">
                {project.period}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors mb-3 break-words">
                {project.title}
            </h3>

            <p className="text-sm md:text-base text-muted-foreground mb-4 break-words">
                {project.description}
            </p>

            <ul className="space-y-2 mb-4">
                {project.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-secondary mr-2 shrink-0">▸</span>
                        <span className="break-words">{h}</span>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                    <Badge
                        key={i}
                        variant="outline"
                        className="border-primary/40 text-primary text-xs hover:bg-primary/10 transition-colors"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            {(project.github_url || project.deployed_url) && (
                <div className="flex flex-wrap gap-3 pt-3 border-t border-border/40">
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                            <ExternalLink className="w-4 h-4" /> GitHub
                        </a>
                    )}
                    {project.deployed_url && (
                        <a
                            href={project.deployed_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline"
                        >
                            <Globe className="w-4 h-4" /> Live Demo
                        </a>
                    )}
                </div>
            )}
        </Card>
    </motion.div>
);