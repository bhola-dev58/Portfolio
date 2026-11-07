import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, X, Eye, ChevronDown, ChevronUp, ArrowRight, FileText } from "lucide-react";
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
            <div className="container px-0 mx-auto">

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

                            <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                                {activeModalProject.deployed_url && (
                                    <a
                                        href={activeModalProject.deployed_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 shadow-md transition-all text-sm"
                                    >
                                        <Globe className="w-4 h-4" /> Visit Live Site
                                    </a>
                                )}
                                {activeModalProject.github_url && (
                                    <a
                                        href={activeModalProject.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all text-sm"
                                    >
                                        <ExternalLink className="w-4 h-4" /> View Source Code
                                    </a>
                                )}
                                {activeModalProject.slug && (
                                    <Link
                                        to={`/my-work/${activeModalProject.slug}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md transition-all text-sm"
                                    >
                                        <FileText className="w-4 h-4" /> Read Case Study
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

/* ── Project card with Adjustable View ────────────────────────────────────── */
const ProjectCard = ({ project, onOpenModal }: { project: Project; onOpenModal: () => void }) => {
    const [isDescExpanded, setIsDescExpanded] = useState(false);
    const [isHighlightsExpanded, setIsHighlightsExpanded] = useState(false);

    // Prefer shortDescription for compact view, falling back to truncated description
    const hasLongDesc = (project.description && project.description.length > 200) ||
        Boolean(project.shortDescription && project.shortDescription !== project.description);

    const compactText = project.shortDescription || (
        project.description && project.description.length > 200
            ? project.description.slice(0, 190).trim() + "..."
            : project.description
    );

    const highlights = project.highlights || [];
    const MAX_HIGHLIGHTS = 2;
    const hasExtraHighlights = highlights.length > MAX_HIGHLIGHTS;
    const visibleHighlights = isHighlightsExpanded ? highlights : highlights.slice(0, MAX_HIGHLIGHTS);

    const tags = project.tags || [];
    const MAX_TAGS = 5;
    const visibleTags = tags.slice(0, MAX_TAGS);
    const remainingTagsCount = tags.length - MAX_TAGS;

    return (
        <motion.div
            whileHover={{ scale: 1.015, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full flex flex-col"
        >
            <Card className="p-5 sm:p-6 h-full bg-card/90 backdrop-blur-md border border-border/80 hover:border-primary/70 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col justify-between rounded-2xl">
                <div className="flex-1 flex flex-col">
                    {/* Header: Period & Quick View */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-semibold">
                                {project.period}
                            </span>
                            {project.category && (
                                <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold border border-primary/20">
                                    {project.category}
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={onOpenModal}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline shrink-0"
                            title="Quick view full details"
                        >
                            <Eye className="w-3.5 h-3.5" /> Quick View
                        </button>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors mb-2.5 break-words leading-snug">
                        {project.title}
                    </h3>

                    {/* Description with Adjustable View */}
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed break-words">
                            {isDescExpanded ? project.description : compactText}
                        </p>
                        {hasLongDesc && (
                            <button
                                type="button"
                                onClick={() => setIsDescExpanded(!isDescExpanded)}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-1.5 cursor-pointer focus:outline-none"
                            >
                                <span>{isDescExpanded ? "Show concise summary" : "Read full overview"}</span>
                                {isDescExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                        )}
                    </div>

                    {/* Highlights with Adjustable View */}
                    {highlights.length > 0 && (
                        <div className="mb-4 mt-auto pt-2.5 border-t border-border/40">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mb-2">
                                Key Highlights:
                            </p>
                            <ul className="space-y-1.5">
                                {visibleHighlights.map((h, i) => (
                                    <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start leading-snug">
                                        <span className="text-secondary mr-2 shrink-0 font-bold">▸</span>
                                        <span className="break-words">{h}</span>
                                    </li>
                                ))}
                            </ul>
                            {hasExtraHighlights && (
                                <button
                                    type="button"
                                    onClick={() => setIsHighlightsExpanded(!isHighlightsExpanded)}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors mt-2 cursor-pointer focus:outline-none"
                                >
                                    <span>
                                        {isHighlightsExpanded
                                            ? "Show fewer highlights"
                                            : `+${highlights.length - MAX_HIGHLIGHTS} more key findings`}
                                    </span>
                                    {isHighlightsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer: Tags & Action Links */}
                <div className="pt-3 border-t border-border/50 space-y-3">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {visibleTags.map((tag, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="border-primary/40 text-primary text-[11px] px-2 py-0.5 hover:bg-primary/10 transition-colors"
                                >
                                    {tag}
                                </Badge>
                            ))}
                            {remainingTagsCount > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="text-[10px] px-1.5 py-0.5 text-muted-foreground"
                                    title={tags.slice(MAX_TAGS).join(", ")}
                                >
                                    +{remainingTagsCount}
                                </Badge>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium pt-1">
                        <div className="flex items-center gap-3">
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                                    title="View Source Code"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" /> GitHub
                                </a>
                            )}
                            {project.deployed_url && (
                                <a
                                    href={project.deployed_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-secondary transition-colors"
                                    title="Visit Live Application"
                                >
                                    <Globe className="w-3.5 h-3.5" /> Live Demo
                                </a>
                            )}
                        </div>

                        {project.slug && (
                            <Link
                                to={`/my-work/${project.slug}`}
                                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold hover:underline ml-auto"
                            >
                                <span>Case Study</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};