import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { skills as skillsApi } from "@/lib/api";
import {
    useScrollAnimation,
    staggerContainer,
    revealVariants,
    scalePop,
} from "@/hooks/useScrollAnimation";

interface SkillCategory {
    id: string;
    category: string;
    items: string[];
}

export const Skills = () => {
    const { ref, animate } = useScrollAnimation({ margin: "-80px" });
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const { data, error } = await skillsApi.getAll();
                if (!error && data) setSkillCategories(data as SkillCategory[]);
            } catch (err) {
                console.error("Error fetching skills:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSkills();
    }, []);

    return (
        <section id="skills" className="min-h-screen flex items-center py-20 px-4">
            {/* @ts-expect-error framer-motion ref type */}
            <div className="container mx-auto" ref={ref}>
                {/* Heading */}
                <motion.h2
                    variants={revealVariants}
                    initial="hidden"
                    animate={animate}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                >
                    Technical <span className="text-gradient">Skills</span>
                </motion.h2>

                <div className="max-w-5xl mx-auto space-y-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 card-shadow space-y-4"
                            >
                                <Skeleton className="h-8 w-48 mb-4" />
                                <div className="flex flex-wrap gap-3">
                                    {[24, 32, 20, 28].map((w, j) => (
                                        <Skeleton key={j} className={`h-8 w-${w} rounded-full`} />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate={animate}
                            className="space-y-8"
                        >
                            {skillCategories.map((skillCat) => (
                                <motion.div
                                    key={skillCat.id}
                                    variants={revealVariants}
                                    className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 card-shadow hover:border-primary/50 hover:shadow-primary/10 hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-xl font-bold mb-5 text-primary">{skillCat.category}</h3>

                                    <motion.div
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate={animate}
                                        className="flex flex-wrap gap-3"
                                    >
                                        {skillCat.items.map((skill, idx) => (
                                            <motion.div key={`${skillCat.id}-${idx}`} variants={scalePop}>
                                                <Badge
                                                    variant="secondary"
                                                    className="px-4 py-2 text-sm bg-secondary/20 hover:bg-primary/20 hover:text-primary hover:border-primary/50 border border-secondary/50 transition-all duration-200 cursor-default"
                                                >
                                                    {skill}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* LeetCode link footer */}
                <motion.div
                    variants={revealVariants}
                    initial="hidden"
                    animate={animate}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 card-shadow hover:border-secondary/50 transition-all">
                        <h3 className="text-xl font-bold mb-3 text-secondary">Coding Platform</h3>
                        <a
                            href="https://leetcode.com/u/bhola-dev58"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            LeetCode: <span className="font-semibold">bhola-dev58</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
