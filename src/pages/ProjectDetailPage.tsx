import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
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

      <article className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
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
                  <Sparkles className="w-3 h-3 fill-current" /> Featured
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

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2">
              {project.role && (
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>
                    Role: <strong className="text-foreground">{project.role}</strong>
                  </span>
                </div>
              )}
              {project.period && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span>{project.period}</span>
                </div>
              )}
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
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-primary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                01
              </span>
              Overview
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </section>
        )}

        {/* 02 — PROBLEM */}
        {hasProblem && (
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-amber-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                02
              </span>
              <Target className="w-5 h-5" />
              The Problem
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.problem}
            </p>
          </section>
        )}

        {/* 03 — APPROACH */}
        {hasApproach && (
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-secondary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                03
              </span>
              <Lightbulb className="w-5 h-5" />
              Engineering Approach
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.approach}
            </p>
          </section>
        )}

        {/* 04 — ARCHITECTURE */}
        {hasArchitecture && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-primary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                04
              </span>
              <Layers className="w-5 h-5" />
              System Architecture & Design
            </h2>

            {project.architecture && (
              <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                {project.architecture}
              </p>
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
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-emerald-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                05
              </span>
              <CheckCircle2 className="w-5 h-5" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(project.keyFeatures || project.highlights || []).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-background/40 border border-border/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-foreground/90 leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 06 — TECH STACK */}
        {hasTechStack && (
          <section className="space-y-6 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
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
                  className="text-sm px-4 py-1.5 rounded-full font-semibold bg-secondary/15 text-secondary border border-secondary/20"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* 07 — CHALLENGES */}
        {hasChallenges && (
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-rose-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-rose-500/10 text-rose-500">
                07
              </span>
              <AlertTriangle className="w-5 h-5" />
              Technical Challenges
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.challenges}
            </p>
          </section>
        )}

        {/* 08 — SOLUTIONS */}
        {hasSolutions && (
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-emerald-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                08
              </span>
              <CheckCircle2 className="w-5 h-5" />
              Solutions & Engineering Impact
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.solutions}
            </p>
          </section>
        )}

        {/* 09 — RESULTS */}
        {hasResults && (
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-amber-500">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                09
              </span>
              <Trophy className="w-5 h-5" />
              Results & Metrics
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.results}
            </p>
          </section>
        )}

        {/* 10 — LEARNINGS */}
        {hasLearnings && (
          <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-card/60 border border-border/60">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2.5 text-primary">
              <span className="text-xs font-black tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                10
              </span>
              <BookOpen className="w-5 h-5" />
              Key Learnings
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {project.learnings}
            </p>
          </section>
        )}
      </article>
    </>
  );
};

export default ProjectDetailPage;
