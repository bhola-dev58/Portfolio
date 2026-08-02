import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, Award, ExternalLink, X, Eye } from "lucide-react";
import { useExperiences } from "@/lib/api";
import { Experience as ExperienceType } from "@/lib/initialData";

const heading = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Experience = () => {
    const { data: experiences = [] } = useExperiences();
    const [previewCert, setPreviewCert] = useState<{ title: string; company: string; url: string } | null>(null);

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
                                            <button
                                                onClick={() => setPreviewCert({ title: exp.title, company: exp.company_name, url: exp.internship_url! })}
                                                className="inline-flex items-center text-sm font-semibold text-primary hover:underline gap-1.5 cursor-pointer"
                                            >
                                                <Eye className="w-4 h-4" /> Preview Certificate / Letter <Award className="w-4 h-4 ml-1" />
                                            </button>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Certificate Preview Modal */}
            <AnimatePresence>
                {previewCert && (
                    <div
                        onClick={() => setPreviewCert(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm cursor-pointer"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-card border-2 border-border shadow-2xl rounded-2xl p-4 md:p-5 max-h-[82vh] flex flex-col justify-between cursor-default"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">{previewCert.title}</h3>
                                    <p className="text-xs text-muted-foreground font-medium">Organization: {previewCert.company}</p>
                                </div>
                                <button
                                    onClick={() => setPreviewCert(null)}
                                    className="p-1.5 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Document / Image / iframe Embed */}
                            <div className="flex-1 w-full min-h-[45vh] max-h-[52vh] rounded-xl overflow-hidden bg-slate-950/60 border border-border/80 flex items-center justify-center p-1.5 relative">
                                {/\.(jpg|jpeg|png|webp|gif|svg)($|\?)/i.test(previewCert.url) ? (
                                    <img
                                        src={previewCert.url}
                                        alt={previewCert.title}
                                        className="max-h-[50vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                                    />
                                ) : /\.pdf($|\?)/i.test(previewCert.url) ? (
                                    <iframe
                                        src={`${previewCert.url}#toolbar=0&navpanes=0&view=Fit`}
                                        className="w-full h-full min-h-[50vh] rounded-lg border-0"
                                        title={previewCert.title}
                                    />
                                ) : (
                                    <iframe
                                        src={previewCert.url}
                                        className="w-full h-full min-h-[50vh] rounded-lg border-0"
                                        title={previewCert.title}
                                    />
                                )}
                            </div>

                            {/* Modal Footer Controls */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border mt-3">
                                <p className="text-[11px] text-muted-foreground">Click button to open original link in new tab.</p>
                                <a
                                    href={previewCert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-md text-xs transition-all"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" /> Open Verification Link
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
