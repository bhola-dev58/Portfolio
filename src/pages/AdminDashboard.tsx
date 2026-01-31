import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    const [activeTab, setActiveTab] = useState("experience");

    // Auth Logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen p-8 pt-24 space-y-8 container mx-auto">
            <SEO title="Admin Dashboard" />
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button variant="destructive" onClick={handleLogout} className="gap-2">
                    <LogOut size={16} /> Logout
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-7 max-w-[800px]">
                    <TabsTrigger value="experience">Exp</TabsTrigger>
                    <TabsTrigger value="projects">Proj</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="certifications">Cert</TabsTrigger>
                    <TabsTrigger value="education">Edu</TabsTrigger>
                    <TabsTrigger value="messages">Inbox</TabsTrigger>
                </TabsList>

                <TabsContent value="experience">
                    <ExperienceManager />
                </TabsContent>

                <TabsContent value="projects">
                    <ProjectManager />
                </TabsContent>

                <TabsContent value="profile">
                    <ProfileManager />
                </TabsContent>

                <TabsContent value="skills">
                    <SkillsManager />
                </TabsContent>

                <TabsContent value="certifications">
                    <CertificationManager />
                </TabsContent>

                <TabsContent value="education">
                    <EducationManager />
                </TabsContent>

                <TabsContent value="messages">
                    <MessageManager />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;