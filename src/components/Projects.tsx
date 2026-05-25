import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe } from "lucide-react";
import { projects as projectsApi } from "@/lib/api";
import {
    useScrollAnimation,
    revealVariants,
    staggerContainer,
    slideLeft,
    slideRight,
} from "@/hooks/useScrollAnimation";

interface Project {
    id: string;
    title: string;
    period: string;
    description: string;
    highlights: string[];
    tags: string[];
    github_url?: string;
    deployed_url?: string;
}

export const Projects = () => {
    const { ref, animate } = useScrollAnimation({ margin: "-80px" });
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await projectsApi.getAll();
            if (!error && data) setProjects(data as Project[]);
            setLoading(false);
        }
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="min-h-screen flex items-center py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-4xl md:text-5xl font-bold mb-16 text-center">
                        <Skeleton className="h-12 w-64 mx-auto" />
                    </div>
                    <div className="max-w-5xl mx-auto relative space-y-16 md:space-y-20">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="md:grid md:grid-cols-2 md:gap-12">
                                <div className="hidden md:block">{i % 2 !== 0 && <SkeletonCard />}</div>
                                <div className="ml-12 md:ml-0">
                                    <div className="md:hidden"><SkeletonCard /></div>
                                    <div className="hidden md:block">{i % 2 === 0 && <SkeletonCard />}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="min-h-screen flex items-center py-20 px-4">
            {/* @ts-expect-error framer-motion ref type */}
            <div className="container mx-auto" ref={ref}>
                {/* Heading */}
                <motion.h2
                    variants={revealVariants}
                    initial="hidden"
                    animate={animate}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Featured <span className="text-gradient">Projects</span>
                </motion.h2>

                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical timeline */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary/20 md:-translate-x-1/2" />

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={animate}
                        className="space-y-16 md:space-y-20"
                    >
                        {projects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={project.id}
                                    variants={isEven ? slideRight : slideLeft}
                                    className="relative"
                                >
                                    {/* Mobile timeline connector */}
                                    <div className="absolute left-4 top-6 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent md:hidden" />

                                    {/* Timeline dot */}
                                    <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10">
                                        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center border-4 border-background shadow-lg">
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Content wrapper (zigzag) */}
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ── Project card subcomponent ──────────────────────────────────────────── */
const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl transition-all duration-300 group h-full">
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
            {project.highlights.map((h, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start">
                    <span className="text-secondary mr-2 shrink-0">▸</span>
                    <span className="break-words">{h}</span>
                </li>
            ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="border-primary/50 text-primary text-xs hover:bg-primary/10 transition-colors">
                    {tag}
                </Badge>
            ))}
        </div>

        {(project.github_url || project.deployed_url) && (
            <div className="flex flex-wrap gap-3 mt-auto pt-2">
                {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                        <ExternalLink className="w-4 h-4" /> GitHub
                    </a>
                )}
                {project.deployed_url && (
                    <a href={project.deployed_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
                        <Globe className="w-4 h-4" /> Live Demo
                    </a>
                )}
            </div>
        )}
    </Card>
);

const SkeletonCard = () => (
    <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 h-full">
        <Skeleton className="h-6 w-24 rounded-full mb-3" />
        <Skeleton className="h-8 w-3/4 mb-3" />
        <Skeleton className="h-20 w-full mb-4" />
        <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-5 w-32" />
    </Card>
);