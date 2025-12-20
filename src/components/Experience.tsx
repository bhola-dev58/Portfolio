import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, Award } from "lucide-react";

const experiences = [
  {
    title: "AI Code Debugger Intern",
    period: "Mar 2025 – Apr 2025",
    type: "Internship",
    description: [
      "Built a code debugging tool using Next.js, Hugging Face, and Tailwind CSS",
      "Deployed cloud-based scalable infrastructure",
    ],
  },
  {
    title: "AI: Transformative Learning with TechSaksham",
    period: "Jan 2025 – Feb 2025",
    type: "Internship",
    description: [
      "Developed an AI chat-bot for health diagnosis using Python, NLP, and Streamlit",
      "Planned future integration of voice recognition and chat logging",
    ],
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Internship <span className="text-gradient">Experience</span>
          </h2>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20 md:transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10" />

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content card */}
                  <div className="md:w-1/2 ml-16 md:ml-0">
                    <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all shrink-0">
                          {exp.type === "Internship" ? (
                            <Briefcase className="w-6 h-6 text-primary" />
                          ) : (
                            <Award className="w-6 h-6 text-secondary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                            {exp.period}
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 break-words">
                            {exp.title}
                          </h3>
                          <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                              <li key={i} className="text-sm md:text-base text-muted-foreground flex items-start">
                                <span className="text-primary mr-2 shrink-0">▸</span>
                                <span className="break-words">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
