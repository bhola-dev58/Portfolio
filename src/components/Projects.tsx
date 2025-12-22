import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return null; // Or a loading spinner

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 px-4">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary to-secondary/20 md:-translate-x-1/2" />

            <div className="space-y-16 md:space-y-20">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Timeline connector line (mobile only) */}
                  <div className="absolute left-4 top-6 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent md:hidden" />

                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center border-4 border-background shadow-lg">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content wrapper */}
                  <div className="md:grid md:grid-cols-2 md:gap-12">
                    {/* ZIGZAG LOGIC */}
                    {/* Left Column (Desktop) */}
                    <div className="hidden md:block">
                      {index % 2 !== 0 && (
                        <ProjectCard project={project} />
                      )}
                    </div>

                    {/* Right Column (Desktop & Mobile) */}
                    <div className="ml-12 md:ml-0">
                      {/* Mobile Card (Always show here on mobile) */}
                      <div className="md:hidden">
                        <ProjectCard project={project} />
                      </div>

                      {/* Desktop Card (Show here for even indices) */}
                      <div className="hidden md:block">
                        {index % 2 === 0 && (
                          <ProjectCard project={project} />
                        )}
                      </div>
                    </div>
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

// Extracted Card to avoid code duplication
const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="p-6 card-shadow bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group">
    <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">
      {project.period}
    </div>

    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 break-words">
      {project.title}
    </h3>

    <p className="text-sm md:text-base text-muted-foreground mb-4 break-words">
      {project.description}
    </p>

    <ul className="space-y-2 mb-4">
      {project.highlights.map((highlight, i) => (
        <li key={i} className="text-sm text-muted-foreground flex items-start">
          <span className="text-secondary mr-2 shrink-0">▸</span>
          <span className="break-words">{highlight}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-2">
      {project.tags.map((tag, i) => (
        <Badge
          key={i}
          variant="outline"
          className="border-primary/50 text-primary text-xs"
        >
          {tag}
        </Badge>
      ))}
    </div>
  </Card>
);