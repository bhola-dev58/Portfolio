import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, X, Eye } from "lucide-react";
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
    const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

    const filteredProjects = projects.filter((project) => {
        if (selectedCategory === "All" || selectedCategory === "Full Stack") return true;
        return project.tags?.some((tag) =>
            tag.toLowerCase().includes(selectedCategory.toLowerCase())
        );
    });

    return (
        <section id="projects" className="py-16  px-4 sm:px-6 lg:px-8 flex items-center justify-center ">
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
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Responsive Grid Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <ProjectCard project={project} onOpenModal={() => setActiveModalProject(project)} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Project Preview Modal */}
            <AnimatePresence>
                {activeModalProject && (
                    <div
                        onClick={() => setActiveModalProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm cursor-pointer"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto cursor-default"
                        >
                            <button
                                onClick={() => setActiveModalProject(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="inline-block px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold mb-3">
                                {activeModalProject.period}
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                {activeModalProject.title}
                            </h3>

                            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                                {activeModalProject.description}
                            </p>

                            <h4 className="text-lg font-bold text-primary mb-3">Key Highlights & Architecture:</h4>
                            <ul className="space-y-3 mb-6">
                                {activeModalProject.highlights.map((h, i) => (
                                    <li key={i} className="text-sm md:text-base text-foreground/90 flex items-start">
                                        <span className="text-secondary mr-2 shrink-0 font-bold">▸</span>
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {activeModalProject.tags.map((tag, i) => (
                                    <Badge key={i} variant="outline" className="border-primary/50 text-primary text-xs font-semibold px-3 py-1">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                                {activeModalProject.deployed_url && (
                                    <a
                                        href={activeModalProject.deployed_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 shadow-md transition-all"
                                    >
                                        <Globe className="w-4 h-4" /> Visit Live Site
                                    </a>
                                )}
                                {activeModalProject.github_url && (
                                    <a
                                        href={activeModalProject.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                                    >
                                        <ExternalLink className="w-4 h-4" /> View Source Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

/* ── Project card ─────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, onOpenModal }: { project: Project; onOpenModal: () => void }) => (
    <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full"
    >
        <Card className="p-6 h-full bg-card/90 backdrop-blur-md border-2 border-border hover:border-primary/80 shadow-xl hover:shadow-primary/25 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="inline-block px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-semibold">
                        {project.period}
                    </div>
                    <button
                        onClick={onOpenModal}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                        <Eye className="w-3.5 h-3.5" /> Quick View
                    </button>
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
            </div>

            <div>
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
            </div>
        </Card>
    </motion.div>
);