import { useState, useEffect } from "react";
import { projects as projectsApi } from "@/lib/api";
import { Project } from "@/lib/initialData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import {
  Pencil,
  Trash2,
  Plus,
  Eye,
  Star,
  ArrowUp,
  ArrowDown,
  Upload,
  Sparkles,
  Layers,
  Code2,
  Link as LinkIcon,
  CheckCircle,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T00:00:00");
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const defaultFormState: Partial<Project> = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "Full Stack",
  projectType: "Web App",
  role: "Full Stack Engineer",
  status: "Published",
  featured: false,
  displayOrder: 0,
  period: "",
  startDate: "",
  endDate: "",
  highlights: [],
  tags: [],
  technologies: [],
  problem: "",
  approach: "",
  architecture: "",
  keyFeatures: [],
  challenges: "",
  solutions: "",
  results: "",
  learnings: "",
  github_url: "",
  deployed_url: "",
  doc_url: "",
  image: "",
  images: [],
  architectureImage: "",
};

export const ProjectManager = () => {
  const [data, setData] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>(defaultFormState);
  const [isRunning, setIsRunning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // String helpers for list textareas
  const [highlightsText, setHighlightsText] = useState("");
  const [keyFeaturesText, setKeyFeaturesText] = useState("");
  const [technologiesText, setTechnologiesText] = useState("");

  const fetchData = async () => {
    const { data: result } = await projectsApi.getAdminAll();
    if (result && Array.isArray(result)) {
      setData(result as Project[]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (item?: Project) => {
    if (item) {
      setEditingItem(item);
      setForm({ ...item });
      setHighlightsText((item.highlights || []).join("\n"));
      setKeyFeaturesText((item.keyFeatures || []).join("\n"));
      setTechnologiesText(
        (item.technologies && item.technologies.length > 0
          ? item.technologies
          : item.tags || []
        ).join(", ")
      );
      setIsRunning(Boolean(item.period && item.period.toLowerCase().includes("present")));
    } else {
      setEditingItem(null);
      setForm({
        ...defaultFormState,
        displayOrder: data.length + 1,
      });
      setHighlightsText("");
      setKeyFeaturesText("");
      setTechnologiesText("");
      setIsRunning(false);
    }
    setIsOpen(true);
  };

  const handleTitleChange = (newTitle: string) => {
    setForm((prev) => ({
      ...prev,
      title: newTitle,
      // Auto-generate slug if editing brand new project or slug was untouched
      slug: !editingItem || prev.slug === slugify(prev.title || "") ? slugify(newTitle) : prev.slug,
    }));
  };

  const handleImageFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "architectureImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const { data: uploadRes, error } = await projectsApi.uploadImage(
        base64,
        file.name,
        file.type
      );
      setIsUploading(false);

      if (error || !uploadRes) {
        toast.error(error || "Image upload failed");
        return;
      }

      setForm((prev) => ({ ...prev, [field]: uploadRes.url }));
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await projectsApi.delete(id);
    fetchData();
    toast.success("Project deleted");
  };

  const handleTogglePublish = async (project: Project) => {
    const nextStatus = project.status === "Published" ? "Draft" : "Published";
    await projectsApi.togglePublish(project.id, nextStatus);
    fetchData();
    toast.success(`Project status changed to ${nextStatus}`);
  };

  const handleToggleFeatured = async (project: Project) => {
    await projectsApi.toggleFeatured(project.id, !project.featured);
    fetchData();
    toast.success(`Project ${!project.featured ? "marked as Featured" : "unfeatured"}`);
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const newItems = [...data];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Update display orders
    const payload = newItems.map((item, idx) => ({ id: item.id, displayOrder: idx + 1 }));
    setData(newItems);
    await projectsApi.reorder(payload);
    toast.success("Project display order updated!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.title.trim()) {
      toast.error("Project title is required.");
      return;
    }

    const start = form.startDate ? formatDate(form.startDate) : "";
    const end = isRunning ? "Present" : form.endDate ? formatDate(form.endDate) : "";
    const period = start && end ? `${start} – ${end}` : start || form.period || "";

    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const keyFeatures = keyFeaturesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const technologies = technologiesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Partial<Project> = {
      ...form,
      period,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
      highlights,
      keyFeatures: keyFeatures.length > 0 ? keyFeatures : highlights,
      tags: technologies,
      technologies,
    };

    if (editingItem) {
      const { error } = await projectsApi.update(editingItem.id, payload);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Project updated successfully!");
    } else {
      const { error } = await projectsApi.create(payload);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Project created successfully!");
    }

    setIsOpen(false);
    fetchData();
  };

  // Preview project object constructed from form state
  const currentPreviewData: Project = {
    id: editingItem?.id || "preview-id",
    title: form.title || "Project Title Preview",
    slug: form.slug || "project-slug",
    shortDescription: form.shortDescription || "Short description of the project preview.",
    description: form.description || "Detailed project overview and context.",
    category: form.category || "Full Stack",
    projectType: form.projectType || "Web Application",
    role: form.role || "Full Stack Engineer",
    status: form.status || "Published",
    featured: Boolean(form.featured),
    period: form.period || "2025",
    problem: form.problem || "",
    approach: form.approach || "",
    architecture: form.architecture || "",
    architectureImage: form.architectureImage || "",
    keyFeatures: keyFeaturesText.split("\n").filter((x) => x.trim()),
    technologies: technologiesText.split(",").map((x) => x.trim()).filter(Boolean),
    challenges: form.challenges || "",
    solutions: form.solutions || "",
    results: form.results || "",
    learnings: form.learnings || "",
    github_url: form.github_url || "",
    deployed_url: form.deployed_url || "",
    doc_url: form.doc_url || "",
    image: form.image || "",
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/60 p-4 rounded-xl border border-border/60 shadow-sm">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span>Dynamic "My Work" CMS Manager</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Add, edit, publish, preview, and reorder projects dynamically.
          </p>
        </div>

        <Button onClick={() => openModal()} className="gap-2 rounded-full font-semibold">
          <Plus size={16} /> Add New Project
        </Button>
      </div>

      {/* Projects Management Table */}
      <div className="rounded-xl border border-border/80 bg-card/80 overflow-hidden shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-12 text-center">Order</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No projects found in database. Click "Add New Project" to create one.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="text-center font-mono text-xs">
                    <div className="flex items-center justify-center gap-1">
                      <span>#{item.displayOrder || index + 1}</span>
                      <div className="flex flex-col">
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveOrder(index, "up")}
                          className="hover:text-primary disabled:opacity-20 text-muted-foreground"
                          title="Move up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          disabled={index === data.length - 1}
                          onClick={() => handleMoveOrder(index, "down")}
                          className="hover:text-primary disabled:opacity-20 text-muted-foreground"
                          title="Move down"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold">
                    <div>
                      <span className="text-foreground">{item.title}</span>
                      <p className="text-xs text-muted-foreground font-normal">/my-work/{item.slug}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="text-xs font-medium">
                      {item.category || "Full Stack"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <button onClick={() => handleTogglePublish(item)}>
                      <Badge
                        className={`cursor-pointer transition-all ${
                          item.status === "Published"
                            ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/25"
                            : item.status === "Archived"
                            ? "bg-slate-500/15 text-slate-400 border-slate-500/30 hover:bg-slate-500/25"
                            : "bg-amber-500/15 text-amber-500 border-amber-500/30 hover:bg-amber-500/25"
                        }`}
                      >
                        {item.status || "Published"}
                      </Badge>
                    </button>
                  </TableCell>

                  <TableCell className="text-center">
                    <button
                      onClick={() => handleToggleFeatured(item)}
                      className={`p-1.5 rounded-full transition-colors ${
                        item.featured
                          ? "text-amber-400 hover:text-amber-500"
                          : "text-muted-foreground/40 hover:text-muted-foreground"
                      }`}
                      title={item.featured ? "Featured Project" : "Mark as Featured"}
                    >
                      <Star size={16} className={item.featured ? "fill-current" : ""} />
                    </button>
                  </TableCell>

                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Preview Case Study"
                      onClick={() => {
                        setEditingItem(item);
                        setForm({ ...item });
                        setHighlightsText((item.highlights || []).join("\n"));
                        setKeyFeaturesText((item.keyFeatures || []).join("\n"));
                        setTechnologiesText(
                          (item.technologies && item.technologies.length > 0
                            ? item.technologies
                            : item.tags || []
                          ).join(", ")
                        );
                        setIsPreviewOpen(true);
                      }}
                    >
                      <Eye size={16} className="text-blue-500" />
                    </Button>

                    <Button variant="ghost" size="icon" title="Edit Project" onClick={() => openModal(item)}>
                      <Pencil size={16} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete Project"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* MULTI-TAB PROJECT EDITOR DIALOG */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Pencil className="w-5 h-5 text-primary" />
              <span>{editingItem ? "Edit Project" : "Create New Project"}</span>
            </DialogTitle>
            <DialogDescription>
              Configure basic information, case study details, media, and publishing status.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-6 w-full bg-muted/60 p-1 rounded-xl">
                <TabsTrigger value="general" className="text-xs font-semibold">
                  General
                </TabsTrigger>
                <TabsTrigger value="casestudy" className="text-xs font-semibold">
                  Case Study
                </TabsTrigger>
                <TabsTrigger value="tech" className="text-xs font-semibold">
                  Tech
                </TabsTrigger>
                <TabsTrigger value="media" className="text-xs font-semibold">
                  Media
                </TabsTrigger>
                <TabsTrigger value="links" className="text-xs font-semibold">
                  Links
                </TabsTrigger>
                <TabsTrigger value="publish" className="text-xs font-semibold">
                  Publish
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: GENERAL */}
              <TabsContent value="general" className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Project Title *
                  </label>
                  <Input
                    placeholder="e.g., Smart Coach LMS -- Full-Stack Platform"
                    value={form.title || ""}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      SEO Slug *
                    </label>
                    <Input
                      placeholder="smart-coach-lms"
                      value={form.slug || ""}
                      onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))}
                      required
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Public URL: /my-work/{form.slug || "slug"}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Category
                    </label>
                    <Input
                      placeholder="e.g., Full Stack, AI / GenAI, SaaS, Academic"
                      value={form.category || ""}
                      onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Project Type
                    </label>
                    <Input
                      placeholder="e.g., SaaS Web Application, AI Assistant"
                      value={form.projectType || ""}
                      onChange={(e) => setForm((p) => ({ ...p, projectType: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Your Role
                    </label>
                    <Input
                      placeholder="e.g., Full Stack Software Engineer"
                      value={form.role || ""}
                      onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Short Description (Summary Card)
                  </label>
                  <Textarea
                    placeholder="Brief 1-2 sentence overview for cards..."
                    value={form.shortDescription || ""}
                    onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                    className="h-20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Full Description / Overview *
                  </label>
                  <Textarea
                    placeholder="Detailed explanation of what the project is..."
                    value={form.description || ""}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    className="h-28"
                    required
                  />
                </div>
              </TabsContent>

              {/* TAB 2: CASE STUDY */}
              <TabsContent value="casestudy" className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    02 — Problem Statement
                  </label>
                  <Textarea
                    placeholder="What specific engineering or user problem did this project solve?"
                    value={form.problem || ""}
                    onChange={(e) => setForm((p) => ({ ...p, problem: e.target.value }))}
                    className="h-24"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    03 — Technical Approach
                  </label>
                  <Textarea
                    placeholder="How did you structure your design and development approach?"
                    value={form.approach || ""}
                    onChange={(e) => setForm((p) => ({ ...p, approach: e.target.value }))}
                    className="h-24"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    04 — Architecture Description
                  </label>
                  <Textarea
                    placeholder="Describe system design, backend framework, data flow, API layer..."
                    value={form.architecture || ""}
                    onChange={(e) => setForm((p) => ({ ...p, architecture: e.target.value }))}
                    className="h-24"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    05 — Key Features (One per line)
                  </label>
                  <Textarea
                    placeholder="Role-Based Access Control (Admin, Instructor, Student)&#10;Razorpay Webhook Integration&#10;YouTube Live Streaming API"
                    value={keyFeaturesText}
                    onChange={(e) => setKeyFeaturesText(e.target.value)}
                    className="h-28"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    07 — Engineering Challenges
                  </label>
                  <Textarea
                    placeholder="Technical obstacles, concurrency issues, or optimization bottlenecks faced..."
                    value={form.challenges || ""}
                    onChange={(e) => setForm((p) => ({ ...p, challenges: e.target.value }))}
                    className="h-24"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    08 — Solutions Applied
                  </label>
                  <Textarea
                    placeholder="How did you resolve those challenges?"
                    value={form.solutions || ""}
                    onChange={(e) => setForm((p) => ({ ...p, solutions: e.target.value }))}
                    className="h-24"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      09 — Results & Metrics
                    </label>
                    <Textarea
                      placeholder="e.g., Reduced latency by 30%, handled 100+ concurrent users..."
                      value={form.results || ""}
                      onChange={(e) => setForm((p) => ({ ...p, results: e.target.value }))}
                      className="h-24"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      10 — Key Learnings
                    </label>
                    <Textarea
                      placeholder="e.g., Mastered webhook idempotency and financial transaction security..."
                      value={form.learnings || ""}
                      onChange={(e) => setForm((p) => ({ ...p, learnings: e.target.value }))}
                      className="h-24"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* TAB 3: TECH */}
              <TabsContent value="tech" className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Technologies & Framework Tags (Comma Separated) *
                  </label>
                  <Input
                    placeholder="Next.js, React.js, Node.js, MongoDB, Razorpay, Tailwind CSS"
                    value={technologiesText}
                    onChange={(e) => setTechnologiesText(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    These badges will display on cards and technical stack section.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Highlights / Bullets (One per line)
                  </label>
                  <Textarea
                    placeholder="Developed course management platform handling 100+ concurrent users&#10;Implemented automated 6-month validity engine"
                    value={highlightsText}
                    onChange={(e) => setHighlightsText(e.target.value)}
                    className="h-32"
                  />
                </div>
              </TabsContent>

              {/* TAB 4: MEDIA */}
              <TabsContent value="media" className="space-y-4 pt-4">
                <div className="space-y-2 p-4 rounded-xl border border-border/60 bg-muted/20">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Main Project Thumbnail / Image</span>
                    {isUploading && <span className="text-primary animate-pulse">Uploading image...</span>}
                  </label>

                  <div className="flex gap-2">
                    <Input
                      placeholder="https://images.unsplash.com/... or upload image"
                      value={form.image || ""}
                      onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                    />
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs font-semibold cursor-pointer hover:bg-primary/90 transition-colors whitespace-nowrap">
                      <Upload size={14} /> Upload File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, "image")}
                      />
                    </label>
                  </div>

                  {form.image && (
                    <div className="relative w-full h-36 rounded-lg overflow-hidden border border-border mt-2">
                      <img src={form.image} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-4 rounded-xl border border-border/60 bg-muted/20">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                    <span>Architecture Diagram Image</span>
                  </label>

                  <div className="flex gap-2">
                    <Input
                      placeholder="https://... architecture diagram URL or upload"
                      value={form.architectureImage || ""}
                      onChange={(e) => setForm((p) => ({ ...p, architectureImage: e.target.value }))}
                    />
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-xs font-semibold cursor-pointer hover:bg-secondary/90 transition-colors whitespace-nowrap">
                      <Upload size={14} /> Upload File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, "architectureImage")}
                      />
                    </label>
                  </div>

                  {form.architectureImage && (
                    <div className="relative w-full h-36 rounded-lg overflow-hidden border border-border mt-2">
                      <img
                        src={form.architectureImage}
                        alt="Architecture diagram preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* TAB 5: LINKS */}
              <TabsContent value="links" className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    GitHub Repository URL
                  </label>
                  <Input
                    placeholder="https://github.com/bhola-dev58/your-repo"
                    value={form.github_url || ""}
                    onChange={(e) => setForm((p) => ({ ...p, github_url: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Deployed / Live Demo URL
                  </label>
                  <Input
                    placeholder="https://gradify.academy/"
                    value={form.deployed_url || ""}
                    onChange={(e) => setForm((p) => ({ ...p, deployed_url: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Documentation URL (Optional)
                  </label>
                  <Input
                    placeholder="https://docs.your-project.com"
                    value={form.doc_url || ""}
                    onChange={(e) => setForm((p) => ({ ...p, doc_url: e.target.value }))}
                  />
                </div>
              </TabsContent>

              {/* TAB 6: PUBLISHING */}
              <TabsContent value="publish" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Publication Status
                    </label>
                    <select
                      value={form.status || "Published"}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          status: e.target.value as "Draft" | "Published" | "Archived",
                        }))
                      }
                      className="w-full p-2.5 rounded-md border border-input bg-background text-sm font-medium"
                    >
                      <option value="Published">Published (Public on /my-work)</option>
                      <option value="Draft">Draft (Admin Only)</option>
                      <option value="Archived">Archived (Hidden from public)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Display Order (Lower appears first)
                    </label>
                    <Input
                      type="number"
                      value={form.displayOrder ?? 0}
                      onChange={(e) => setForm((p) => ({ ...p, displayOrder: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/20">
                  <input
                    type="checkbox"
                    id="featuredCheck"
                    checked={Boolean(form.featured)}
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <label htmlFor="featuredCheck" className="text-sm font-semibold cursor-pointer select-none">
                    Mark as Featured Project (Highlights on top)
                  </label>
                </div>
              </TabsContent>
            </Tabs>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreviewOpen(true)}
                className="gap-2 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
              >
                <Eye size={16} /> Live Preview Case Study
              </Button>

              <div className="flex items-center gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="gap-2 px-6 font-semibold">
                  <CheckCircle size={16} /> Save Project
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* LIVE ADMIN PREVIEW MODAL */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 border-none bg-background">
          <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-6 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="font-bold text-sm">Live Admin Case Study Preview</span>
              <Badge variant="outline" className="text-[10px]">
                {form.status || "Draft"}
              </Badge>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setIsPreviewOpen(false)}>
              Close Preview
            </Button>
          </div>

          <div className="p-4 sm:p-8">
            <ProjectDetailPage previewProject={currentPreviewData} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;
