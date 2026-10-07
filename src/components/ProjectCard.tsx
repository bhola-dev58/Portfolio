import { motion } from "framer-motion";
import { Project } from "@/lib/initialData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, Sparkles, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  onPreview?: (project: Project) => void;
  isPreview?: boolean;
}

export const ProjectCard = ({ project, onPreview, isPreview = false }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isPreview && onPreview) {
      onPreview(project);
      return;
    }
    if (project.slug) {
      navigate(`/my-work/${project.slug}`);
    }
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col md:flex-row justify-between rounded-2xl bg-card/85 backdrop-blur-md border border-border/70 hover:border-primary/60 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden cursor-pointer w-full"
      onClick={handleCardClick}
    >
      {/* Thumbnail Container */}
      <div className="relative w-full md:w-5/12 lg:w-4/12 h-48 sm:h-56 md:h-auto min-h-[220px] overflow-hidden bg-muted/30 shrink-0">
        <img
          src={project.image || defaultImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/90 via-background/20 to-transparent opacity-80" />

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Featured</span>
          </div>
        )}

        {/* Category Tag */}
        {project.category && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 text-slate-100 dark:bg-card/90 border border-white/20 text-xs font-medium backdrop-blur-md shadow-sm">
            {project.category}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-4 justify-between w-full md:w-7/12 lg:w-8/12">
        {/* Title & Role */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>
          </div>
          {project.role && (
            <p className="text-xs font-semibold text-secondary flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>{project.role}</span>
            </p>
          )}
        </div>

        {/* Short Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.shortDescription || project.description}
        </p>

        {/* Tech Badges */}
        {((project.technologies && project.technologies.length > 0) || (project.tags && project.tags.length > 0)) && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.technologies || project.tags || []).slice(0, 6).map((tech, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-[11px] px-2.5 py-0.5 font-medium bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20"
              >
                {tech}
              </Badge>
            ))}
            {(project.technologies || project.tags || []).length > 6 && (
              <Badge variant="outline" className="text-[11px] px-2 py-0.5 text-muted-foreground">
                +{(project.technologies || project.tags || []).length - 6}
              </Badge>
            )}
          </div>
        )}

        {/* Action Footer */}
        <div className="pt-3 mt-auto flex items-center justify-between border-t border-border/40 text-xs font-medium">
          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Code</span>
              </a>
            )}
            {project.deployed_url && (
              <a
                href={project.deployed_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Live</span>
              </a>
            )}
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="group/btn text-primary hover:text-primary hover:bg-primary/10 gap-1 rounded-full text-xs font-semibold px-3.5"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <span>More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
