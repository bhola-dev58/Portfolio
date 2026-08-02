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
        <section id="skills" className="py-16  px-4 sm:px-6 lg:px-8 flex items-center justify-center ">
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

                {/* 2x2 Grid Layout for Recruiter Scanning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {skillCategories.map((skillCat: SkillCategory) => (
                        <motion.div
                            key={skillCat.id}
                            variants={card}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 250, damping: 22 }}
                            className="bg-card/90 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-border hover:border-primary/80 shadow-xl hover:shadow-primary/20 hover:shadow-2xl cursor-default transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="w-full">
                                <h3 className="text-xl font-bold mb-5 text-primary flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    {skillCat.category}
                                </h3>

                                <motion.div
                                    variants={stagger}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="flex flex-wrap justify-center gap-2.5"
                                >
                                    {skillCat.items.map((skill: string, idx: number) => (
                                        <motion.div key={`${skillCat.id}-${idx}`} variants={badge}>
                                            <Badge
                                                variant="secondary"
                                                className="px-3.5 py-1.5 text-xs md:text-sm bg-secondary/15 text-foreground hover:bg-primary/15 hover:text-primary border border-secondary/40 hover:border-primary/50 transition-all duration-200 cursor-default font-medium"
                                            >
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* LeetCode Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 text-center"
                >
                    <div className="inline-block bg-card/90 backdrop-blur-md p-5 px-8 rounded-2xl border-2 border-border hover:border-secondary/80 shadow-xl hover:shadow-secondary/20 transition-all">
                        <h3 className="text-sm uppercase tracking-wider font-bold mb-1 text-secondary">Coding Platform</h3>
                        <a
                            href="https://leetcode.com/u/bhola-dev58"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm md:text-base inline-flex items-center gap-1.5"
                        >
                            LeetCode Profile: <span className="font-bold text-foreground hover:underline">bhola-dev58</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
