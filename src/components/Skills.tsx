import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const skills = {
  "Programming Languages": ["Python", "JavaScript", "TypeScript", "Java", "C++"],
  "Frameworks & Libraries": ["React.js", "Node.js", "TensorFlow", "Express.js", "FastAPI"],
  "Databases": ["MySQL", "MongoDB", "Firebase"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Firebase", "CI/CD", "AI Integration"],
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 card-shadow hover:border-primary/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, index) => (
                    <motion.div
                      key={skill}
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
            ))}
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
