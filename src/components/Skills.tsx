import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useSkills } from "@/lib/api";
import { SkillCategory } from "@/lib/initialData";

const badge = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 18 } },
};

const card = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

export const Skills = () => {
    const { data: skillCategories = [] } = useSkills();

    return (
        <section id="skills" className="min-h-screen flex items-center py-20 px-4">
            <div className="container mx-auto">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                >
                    Technical <span className="text-gradient">Skills</span>
                </motion.h2>

                <div className="max-w-5xl mx-auto space-y-8">
                    {skillCategories.map((skillCat: SkillCategory) => (
                        <motion.div
                            key={skillCat.id}
                            variants={card}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.01, y: -3 }}
                            transition={{ type: "spring", stiffness: 250, damping: 22 }}
                            className="bg-card/85 backdrop-blur-md p-6 rounded-xl border border-border/60 shadow-xl hover:shadow-primary/15 hover:shadow-2xl cursor-default transition-all duration-300"
                        >
                            <h3 className="text-xl font-bold mb-5 text-primary">{skillCat.category}</h3>

                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                className="flex flex-wrap gap-3"
                            >
                                {skillCat.items.map((skill: string, idx: number) => (
                                    <motion.div key={`${skillCat.id}-${idx}`} variants={badge}>
                                        <Badge
                                            variant="secondary"
                                            className="px-4 py-2 text-sm bg-secondary/15 text-foreground hover:bg-primary/15 hover:text-primary border border-secondary/40 hover:border-primary/50 transition-all duration-200 cursor-default"
                                        >
                                            {skill}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* LeetCode Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block bg-card/85 backdrop-blur-md p-6 rounded-xl border border-border/60 shadow-xl hover:shadow-secondary/15 hover:shadow-2xl transition-all">
                        <h3 className="text-xl font-bold mb-3 text-secondary">Coding Platform</h3>
                        <a
                            href="https://leetcode.com/u/bhola-dev58"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            LeetCode: <span className="font-semibold text-foreground">bhola-dev58</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
