import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProjects } from "@/lib/api";
import { ProjectCard } from "@/components/ProjectCard";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, FolderCode, SlidersHorizontal } from "lucide-react";

export const MyWorkPage = () => {
  const { data: projects = [], isLoading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All");
    projects.forEach((p) => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects by search query and category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesDesc = (project.shortDescription || project.description || "").toLowerCase().includes(q);
        const matchesCat = (project.category || "").toLowerCase().includes(q);
        const matchesRole = (project.role || "").toLowerCase().includes(q);
        const matchesTech = (project.technologies || project.tags || []).some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesCat || matchesRole || matchesTech;
      }
      return true;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Featured projects
  const featuredProjects = useMemo(() => {
    return projects.filter((p) => p.featured);
  }, [projects]);

  return (
    <>
      <SEO
        title="My Work | Engineering Case Studies & Portfolio"
        description="Explore production-ready web applications, full-stack software systems, and Generative AI projects built by Bhola Yadav."
      />

      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Header Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Portfolio CMS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            My <span className="text-gradient">Work</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
            Production-ready software applications, full-stack systems, AI agents, and technical case studies engineered for performance and scalability.
          </p>
        </motion.div>

        {/* Search & Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border/60 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by title, tech, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full bg-background/50 border-border/80 focus-visible:ring-primary text-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground hidden sm:inline-block mr-1" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-md shadow-orange-500/20"
                      : "bg-secondary/10 text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-card/40 border border-border/40 animate-pulse p-6 space-y-4"
              >
                <div className="w-full h-44 bg-muted/40 rounded-xl" />
                <div className="h-6 w-3/4 bg-muted/40 rounded" />
                <div className="h-4 w-full bg-muted/40 rounded" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4 rounded-2xl border border-dashed border-border/60 bg-card/30">
            <FolderCode className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-bold">No Projects Found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              No published projects matched your search criteria or category filter. Try clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-primary underline hover:text-primary/80"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyWorkPage;
