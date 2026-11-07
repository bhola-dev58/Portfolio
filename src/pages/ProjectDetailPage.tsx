import { useParams, useNavigate, Link } from "react-router-dom";
import { useProjectBySlug } from "@/lib/api";
import { Project } from "@/lib/initialData";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText,
  Sparkles,
  Layers,
  Cpu,
  Target,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Trophy,
  BookOpen,
  Calendar,
  UserCheck,
} from "lucide-react";

interface ProjectDetailPageProps {
  previewProject?: Project | null;
}

interface StructuredSectionContentProps {
  content?: string;
  variant?: "default" | "amber" | "emerald" | "rose" | "secondary";
}

const StructuredSectionContent = ({ content, variant = "default" }: StructuredSectionContentProps) => {
  if (!content) return null;

  // Split content into major paragraphs
  const rawParagraphs = content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  const bulletColors = {
    default: "bg-primary",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    secondary: "bg-secondary",
  };

  return (
    <div className="space-y-4">
      {rawParagraphs.map((para, pIdx) => {
        const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.some((l) => /^[•\-▸\d+\.]/.test(l));

        if (isList) {
          return (
            <div key={pIdx} className="grid grid-cols-1 gap-2.5 pt-1">
              {lines.map((line, lIdx) => {
                const cleaned = line
                  .replace(/^[•\-▸\s]+/, "")
                  .replace(/^\d+\.\s*/, "")
                  .replace(/^\(\d+\)\s*/, "");

                // Highlight title prefix before colon or em-dash
                const splitMatch = cleaned.match(/^([^:—]+)([:—])\s*(.*)$/);
                if (splitMatch) {
                  const [, title, sep, desc] = splitMatch;
                  return (
                    <div
                      key={lIdx}
                      className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-background/50 border border-border/50 hover:border-border transition-colors shadow-xs"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${bulletColors[variant]}`} />
                      <div className="text-sm sm:text-base leading-relaxed">
                        <strong className="text-foreground font-semibold">{title}{sep}</strong>{" "}
                        <span className="text-muted-foreground">{desc}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={lIdx}
                    className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-background/40 border border-border/40 text-sm sm:text-base text-foreground/90"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${bulletColors[variant]}`} />
                    <span className="leading-relaxed">{cleaned}</span>
                  </div>
                );
              })}
            </div>
          );
        }

        return (
          <p key={pIdx} className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
            {para}
          </p>
        );
      })}
    </div>
  );
};

export const ProjectDetailPage = ({ previewProject }: ProjectDetailPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch project from hook if not in preview mode
  const { data: fetchedProject, isLoading } = useProjectBySlug(previewProject ? undefined : slug);

  const project = previewProject || fetchedProject;

  if (isLoading && !previewProject) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">Loading engineering case study...</p>
      </div>
    );
  }

  if (!project && !isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 max-w-xl mx-auto text-center space-y-6">
        <SEO title="Project Not Found | Bhola Yadav" description="Project case study not found." />
        <h2 className="text-3xl font-bold">Case Study Not Found</h2>
        <p className="text-muted-foreground">
          The requested project case study could not be found or has not been published yet.
        </p>
        <Button onClick={() => navigate("/my-work")} className="gap-2 rounded-full">
          <ArrowLeft className="w-4 h-4" /> Return to My Work
        </Button>
      </div>
    );
  }

  if (!project) return null;

  const defaultImage =
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80";

  const hasOverview = Boolean(project.description);
  const hasProblem = Boolean(project.problem && project.problem.trim());
  const hasApproach = Boolean(project.approach && project.approach.trim());
  const hasArchitecture = Boolean(
    (project.architecture && project.architecture.trim()) || project.architectureImage
  );
  const hasKeyFeatures = Boolean(
    (project.keyFeatures && project.keyFeatures.length > 0) ||
      (project.highlights && project.highlights.length > 0)
  );
  const hasTechStack = Boolean(
    (project.technologies && project.technologies.length > 0) ||
      (project.tags && project.tags.length > 0)
  );
  const hasChallenges = Boolean(project.challenges && project.challenges.trim());
  const hasSolutions = Boolean(project.solutions && project.solutions.trim());
  const hasResults = Boolean(project.results && project.results.trim());
  const hasLearnings = Boolean(project.learnings && project.learnings.trim());

  return (
    <>
      <SEO
        title={`${project.title} | Case Study`}
        description={project.shortDescription || project.description}
      />

      <article className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        {/* Back Link */}
        {!previewProject && (
          <div className="pt-2">
            <Link
              to="/my-work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to My Work
            </Link>
          </div>
        )}

        {/* HERO HEADER */}
        <header className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.category && (
                <Badge variant="outline" className="rounded-full px-3 py-1 border-primary/40 text-primary">
                  {project.category}
                </Badge>
              )}
              {project.projectType && (
                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  {project.projectType}
                </Badge>
              )}
              {project.featured && (
                <Badge className="rounded-full px-3 py-1 bg-amber-500 text-white gap-1">
                  <Sparkles className="w-3 h-3 fill-current" /> Featured Case Study
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {project.title}
            </h1>

            {project.shortDescription && (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
                {project.shortDescription}
              </p>
            )}

            {/* Quick At-a-Glance Executive Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3.5 rounded-xl bg-card/60 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                  Domain
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {project.category || "Full Stack"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-card/60 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                  Project Type
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {project.projectType || "Web Application"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-card/60 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                  Engineering Role
                </span>
                <span className="text-sm font-semibold text-primary truncate block" title={project.role}>
                  {project.role || "Full Stack Engineer"}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-card/60 border border-border/60">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                  Timeline
                </span>
                <span className="text-sm font-semibold text-secondary">
                  {project.period || "2025"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Links & Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {project.deployed_url && (
              <Button size="lg" className="rounded-full gap-2 shadow-lg shadow-orange-500/20" asChild>
                <a href={project.deployed_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button size="lg" variant="outline" className="rounded-full gap-2 border-2" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" /> View GitHub Repo
                </a>
              </Button>
            )}
            {project.doc_url && (
              <Button size="lg" variant="ghost" className="rounded-full gap-2 text-muted-foreground" asChild>
                <a href={project.doc_url} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4" /> Documentation
                </a>
              </Button>
            )}
          </div>

          {/* Main Hero Image */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-border/70 shadow-2xl bg-card/40 aspect-video max-h-[480px]">
            <img
              src={project.image || defaultImage}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImage;
              }}
            />
          </div>
        </header>

        {/* 01 — OVERVIEW */}
        {hasOverview && (
          <section id="overview" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-primary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                01
              </span>
              Executive Overview
            </h2>
            <StructuredSectionContent content={project.description} variant="default" />
          </section>
        )}

        {/* 02 — PROBLEM */}
        {hasProblem && (
          <section id="problem" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-amber-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                02
              </span>
              <Target className="w-5 h-5" />
              The Problem & Core Bottlenecks
            </h2>
            <StructuredSectionContent content={project.problem} variant="amber" />
          </section>
        )}

        {/* 03 — APPROACH */}
        {hasApproach && (
          <section id="approach" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-secondary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                03
              </span>
              <Lightbulb className="w-5 h-5" />
              Engineering Approach & Methodology
            </h2>
            <StructuredSectionContent content={project.approach} variant="secondary" />
          </section>
        )}

        {/* 04 — ARCHITECTURE */}
        {hasArchitecture && (
          <section id="architecture" className="space-y-6 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-primary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                04
              </span>
              <Layers className="w-5 h-5" />
              System Architecture & Design
            </h2>

            {project.architecture && (
              <StructuredSectionContent content={project.architecture} variant="default" />
            )}

            {project.architectureImage && (
              <div className="rounded-xl overflow-hidden border border-border/60 shadow-lg bg-background/50">
                <img
                  src={project.architectureImage}
                  alt="System Architecture Diagram"
                  className="w-full object-contain max-h-[500px]"
                />
              </div>
            )}
          </section>
        )}

        {/* 05 — KEY FEATURES */}
        {hasKeyFeatures && (
          <section id="features" className="space-y-6 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-emerald-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                05
              </span>
              <CheckCircle2 className="w-5 h-5" />
              Key Features & Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(project.keyFeatures || project.highlights || []).map((feature, idx) => {
                const splitMatch = feature.match(/^([^:—]+)([:—])\s*(.*)$/);
                if (splitMatch) {
                  const [, title, sep, desc] = splitMatch;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-border/50 shadow-xs hover:border-emerald-500/40 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <div className="text-sm leading-relaxed">
                        <strong className="text-foreground font-semibold block mb-0.5">{title}</strong>
                        <span className="text-muted-foreground">{desc}</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-background/40 border border-border/40 shadow-xs hover:border-emerald-500/30 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground/90 leading-snug">{feature}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 06 — TECH STACK */}
        {hasTechStack && (
          <section id="tech-stack" className="space-y-6 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-secondary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                06
              </span>
              <Cpu className="w-5 h-5" />
              Technologies & Infrastructure
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {(project.technologies || project.tags || []).map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-sm px-4 py-1.5 rounded-full font-semibold bg-secondary/15 text-secondary border border-secondary/20 hover:bg-secondary/25 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* 07 — CHALLENGES */}
        {hasChallenges && (
          <section id="challenges" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-rose-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-rose-500/10 text-rose-500">
                07
              </span>
              <AlertTriangle className="w-5 h-5" />
              Technical Challenges
            </h2>
            <StructuredSectionContent content={project.challenges} variant="rose" />
          </section>
        )}

        {/* 08 — SOLUTIONS */}
        {hasSolutions && (
          <section id="solutions" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-emerald-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                08
              </span>
              <CheckCircle2 className="w-5 h-5" />
              Engineering Solutions & Implementation
            </h2>
            <StructuredSectionContent content={project.solutions} variant="emerald" />
          </section>
        )}

        {/* 09 — RESULTS */}
        {hasResults && (
          <section id="results" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-amber-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                09
              </span>
              <Trophy className="w-5 h-5" />
              Quantified Results & Metrics
            </h2>
            <StructuredSectionContent content={project.results} variant="amber" />
          </section>
        )}

        {/* 10 — LEARNINGS */}
        {hasLearnings && (
          <section id="learnings" className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60 scroll-mt-28">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-primary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                10
              </span>
              <BookOpen className="w-5 h-5" />
              Key Learnings & Takeaways
            </h2>
            <StructuredSectionContent content={project.learnings} variant="default" />
          </section>
        )}

        {/* Footer Navigation CTA */}
        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/my-work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Projects
          </Link>
          <div className="flex items-center gap-3">
            {project.deployed_url && (
              <Button size="sm" asChild>
                <a href={project.deployed_url} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Live
                </a>
              </Button>
            )}
            <Button size="sm" variant="outline" asChild>
              <Link to="/#contact">Contact Bhola</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProjectDetailPage;
