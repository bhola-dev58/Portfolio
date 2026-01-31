import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";

interface SkillCategory {
  id: number;
  category: string;
  items: string[];
}

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching skills:", error);
        } else if (data) {
          setSkillCategories(data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Technical <span className="text-gradient">Skills</span>
          </h2>

          <div className="max-w-5xl mx-auto space-y-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 card-shadow space-y-4">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="flex flex-wrap gap-3">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-32 rounded-full" />
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-8 w-28 rounded-full" />
                  </div>
                </div>
              ))
            ) : (
              skillCategories.map((skillCat, categoryIndex) => (
                <motion.div
                  key={skillCat.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 card-shadow hover:border-primary/50 transition-all"
                >
                  <h3 className="text-xl font-bold mb-4 text-primary">{skillCat.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillCat.items.map((skill, index) => (
                      <motion.div
                        key={`${skillCat.id}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.2 + index * 0.1 }}
                      >
                        <Badge
                          variant="secondary"
                          className="px-4 py-2 text-sm bg-secondary/20 hover:bg-secondary/30 border border-secondary/50 text-secondary-foreground transition-all"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 card-shadow">
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
        </motion.div>
      </div>
    </section>
  );
};
