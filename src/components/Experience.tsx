import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase, Award } from "lucide-react";
import { useExperiences } from "@/lib/api";
import { Experience as ExperienceType } from "@/lib/initialData";

const heading = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Experience = () => {
    const { data: experiences = [] } = useExperiences();

    return (
        <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
            <div className="container mx-auto">

                {/* Heading */}
                <motion.h2
                    variants={heading}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Internship <span className="text-gradient">Experience</span>
                </motion.h2>

                {/* 2-Column Responsive Grid Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {experiences.map((exp: ExperienceType, index: number) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                            >
                                <Card className="p-6 md:p-8 h-full bg-card/90 backdrop-blur-md border-2 border-border hover:border-primary/80 shadow-xl hover:shadow-primary/25 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all shrink-0">
                                                {exp.type === "Internship"
                                                    ? <Briefcase className="w-6 h-6 text-primary" />
                                                    : <Award className="w-6 h-6 text-secondary" />}
                                            </div>
                                            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                                {exp.period}
                                            </div>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-1 break-words group-hover:text-primary transition-colors">
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-secondary font-semibold mb-4">{exp.company_name}</p>

                                        <ul className="space-y-3 mb-6">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-sm md:text-base text-muted-foreground flex items-start leading-relaxed">
                                                    <span className="text-primary mr-2 shrink-0 font-bold">▸</span>
                                                    <span className="break-words">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {exp.internship_url && (
                                        <div className="pt-4 border-t border-border/60">
                                            <a
                                                href={exp.internship_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1.5"
                                            >
                                                View Certificate / Letter <Award className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
