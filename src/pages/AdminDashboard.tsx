import { useState, useEffect } from "react";
import { auth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogOut,
  ExternalLink,
  ShieldCheck,
  FolderGit2,
  Briefcase,
  UserCheck,
  Sparkles,
  Award,
  GraduationCap,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import SEO from "@/components/SEO";

// Import Breakdown Components
import { ExperienceManager } from "@/components/admin/ExperienceManager";
import { ProjectManager } from "@/components/admin/ProjectManager";
import { ProfileManager } from "@/components/admin/ProfileManager";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { CertificationManager } from "@/components/admin/CertificationManager";
import { EducationManager } from "@/components/admin/EducationManager";
import { MessageManager } from "@/components/admin/MessageManager";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  // Force pure Light Mode for Admin Dashboard
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const wasDark = root.classList.contains("dark");

    root.classList.remove("dark");
    root.classList.add("light");
    body.classList.add("admin-light-mode");

    return () => {
      root.classList.remove("light");
      body.classList.remove("admin-light-mode");
      if (wasDark) {
        root.classList.add("dark");
      }
    };
  }, []);

  // Auth Logout
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/admin/login");
  };

  const navItems = [
    { id: "projects", label: "Projects", icon: FolderGit2, desc: "Manage showcase case studies & CMS" },
    { id: "experience", label: "Experience", icon: Briefcase, desc: "Work history & internships" },
    { id: "profile", label: "Profile", icon: UserCheck, desc: "Personal info & social profiles" },
    { id: "skills", label: "Skills", icon: Sparkles, desc: "Languages, tools & frameworks" },
    { id: "certifications", label: "Certifications", icon: Award, desc: "Credentials & licenses" },
    { id: "education", label: "Education", icon: GraduationCap, desc: "Degrees & academic history" },
    { id: "messages", label: "Messages", icon: Mail, desc: "Inbound contact submissions" },
  ];

  return (
    <div className="admin-light-mode min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <SEO title="Admin Dashboard | Portfolio CMS" />

      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  Bhola Yadav
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                  Admin CMS
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 hidden sm:flex">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Production Database Connected</span>
              </p>
            </div>
          </div>

          {/* Action Links & Logout */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg transition-colors border border-slate-200"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-xs sm:text-sm font-semibold text-rose-600 hover:text-white hover:bg-rose-600 border-rose-200 hover:border-rose-600 transition-all rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Welcome Header */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Portfolio Control Center
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Manage your engineering case studies, work timeline, technical skill matrix, credentials, and inbound client communications in one centralized dashboard.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Light Theme Mode Active</span>
          </div>
        </div>

        {/* Dynamic Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <div className="overflow-x-auto pb-1 no-scrollbar">
            <TabsList className="bg-slate-200/60 p-1.5 rounded-2xl inline-flex w-auto min-w-full sm:min-w-0 justify-start gap-1.5 border border-slate-200">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 transition-all data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:font-bold data-[state=active]:shadow-xs"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab Content Panes wrapped in clean white card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <TabsContent value="projects" className="mt-0 space-y-4">
              <ProjectManager />
            </TabsContent>

            <TabsContent value="experience" className="mt-0 space-y-4">
              <ExperienceManager />
            </TabsContent>

            <TabsContent value="profile" className="mt-0 space-y-4">
              <ProfileManager />
            </TabsContent>

            <TabsContent value="skills" className="mt-0 space-y-4">
              <SkillsManager />
            </TabsContent>

            <TabsContent value="certifications" className="mt-0 space-y-4">
              <CertificationManager />
            </TabsContent>

            <TabsContent value="education" className="mt-0 space-y-4">
              <EducationManager />
            </TabsContent>

            <TabsContent value="messages" className="mt-0 space-y-4">
              <MessageManager />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Portfolio CMS Admin Portal • Logged in as Bhola Yadav
      </footer>
    </div>
  );
};

export default AdminDashboard;
