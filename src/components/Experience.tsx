import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Award } from "lucide-react";
import { experiences as experiencesApi } from "@/lib/api";

interface Experience {
    id: string;
    title: string;
    company_name: string;
    period: string;
    type: string;
    description: string[];
    internship_url?: string;
}

/* Variants */
const heading = {
    hidden:  { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardLeft = {
    hidden:  { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const cardRight = {
    hidden:  { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

export const Experience = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExperiences() {
            try {
                const { data, error } = await experiencesApi.getAll();
                if (!error) setExperiences((data as Experience[]) || []);
            } catch (err) {
                console.error("Error connecting to API:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchExperiences();
    }, []);

    if (loading) {
        return (
            <section id="experience" className="min-h-screen flex items-center py-20 px-4">
                <div className="container mx-auto">
                    <div className="mb-16 text-center"><Skeleton className="h-12 w-64 mx-auto" /></div>
                    <div className="max-w-4xl mx-auto space-y-12">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8">
                                <div className="hidden md:block md:w-1/2" />
                                <div className="md:w-1/2 ml-16 md:ml-0">
                                    <Card className="p-6 bg-white/70 backdrop-blur-md border border-white/50 shadow-lg">
                                        <div className="flex items-start gap-4">
                                            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                                            <div className="flex-1 space-y-3">
                                                <Skeleton className="h-5 w-24 rounded-full" />
                                                <Skeleton className="h-7 w-3/4" />
                                                <Skeleton className="h-5 w-1/2" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-full" />
                                                    <Skeleton className="h-4 w-5/6" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="min-h-screen flex items-center py-20 px-4">
            <div className="container mx-auto">

                {/* Heading — uses whileInView (fires correctly in SPA) */}
                <motion.h2
                    variants={heading}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Internship <span className="text-gradient">Experience</span>
                </motion.h2>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20 md:transform md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={exp.id}
                                    variants={isEven ? cardLeft : cardRight}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-lg z-10" />

                                    {/* Spacer */}
                                    <div className="hidden md:block md:w-1/2" />

                                    {/* Card */}
                                    <div className="md:w-1/2 ml-16 md:ml-0">
                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <Card className="p-6 bg-white/75 backdrop-blur-md border border-white/60 shadow-xl hover:shadow-primary/20 hover:shadow-2xl transition-shadow duration-300 group">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all shrink-0">
                                                        {exp.type === "Internship"
                                                            ? <Briefcase className="w-6 h-6 text-primary" />
                                                            : <Award    className="w-6 h-6 text-secondary" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                                            {exp.period}
                                                        </div>
                                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 break-words group-hover:text-primary transition-colors">
                                                            {exp.title}
                                                        </h3>
                                                        <p className="text-sm text-secondary font-semibold mb-3">{exp.company_name}</p>
                                                        <ul className="space-y-2">
                                                            {exp.description.map((item, i) => (
                                                                <li key={i} className="text-sm md:text-base text-gray-700 flex items-start">
                                                                    <span className="text-primary mr-2 shrink-0">▸</span>
                                                                    <span className="break-words">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        {exp.internship_url && (
                                                            <div className="mt-4">
                                                                <a
                                                                    href={exp.internship_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                                                >
                                                                    View Certificate / Letter <Award className="ml-1 w-4 h-4" />
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
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
