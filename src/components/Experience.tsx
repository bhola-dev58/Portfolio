import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Experience {
  id: number;
  title: string;
  company_name: string;
  period: string;
  type: string;
  description: string[];
  internship_url?: string;
}

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching experiences:", error);
        } else {
          setExperiences(data || []);
        }
      } catch (error) {
        console.error("Error connecting to Supabase:", error);
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
          <div className="mb-16 text-center">
            <Skeleton className="h-12 w-64 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto space-y-12">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8">
                <div className="hidden md:block md:w-1/2"></div>
                <div className="md:w-1/2 ml-16 md:ml-0">
                  <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-7 w-3/4" />
                        <Skeleton className="h-5 w-1/2" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-4/6" />
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
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
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
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
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
                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 break-words">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-secondary font-semibold mb-3">
                            {exp.company_name}
                          </p>
                          <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                              <li key={i} className="text-sm md:text-base text-muted-foreground flex items-start">
                                <span className="text-primary mr-2 shrink-0">▸</span>
                                <span className="break-words">{item}</span>
                              </li>
                            ))}
                          </ul>
                          {exp.internship_url && (
                            <div className="mt-4">
                              <a href={exp.internship_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                                View Certificate / Letter <Award className="ml-1 w-4 h-4" />
                              </a>
                            </div>
                          )}
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
