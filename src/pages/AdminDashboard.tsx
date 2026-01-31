import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Types
interface Experience {
    id: number;
    title: string;
    company_name: string;
    period: string;
    type: string;
    description: string[];
    internship_url?: string;
}

interface Project {
    id: number;
    title: string;
    period: string;
    description: string;
    highlights: string[];
    tags: string[];
    github_url?: string;
}

import SEO from "@/components/SEO";

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
                <TabsList className="grid w-full grid-cols-6 max-w-[700px]">
                    <TabsTrigger value="experience">Exp</TabsTrigger>
                    <TabsTrigger value="projects">Proj</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="certifications">Cert</TabsTrigger>
                    <TabsTrigger value="education">Edu</TabsTrigger>
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
            </Tabs>
        </div>
    );
};

// --- EDUCATION MANAGER COMPONENT ---
const EducationManager = () => {
    const [data, setData] = useState<any[]>([]);
    const [institution, setInstitution] = useState("");
    const [degree, setDegree] = useState("");
    const [period, setPeriod] = useState("");
    const [score, setScore] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchData = async () => {
        const { data } = await supabase.from("education").select("*").order("id", { ascending: true });
        if (data) setData(data);
    };
    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { institution, degree, period, score };

        if (editingId) {
            await supabase.from("education").update(payload).eq("id", editingId);
            toast.success("Updated");
            setEditingId(null);
        } else {
            await supabase.from("education").insert([payload]);
            toast.success("Created");
        }
        setInstitution(""); setDegree(""); setPeriod(""); setScore("");
        fetchData();
    };

    const handleEdit = (item: any) => {
        setInstitution(item.institution);
        setDegree(item.degree);
        setPeriod(item.period);
        setScore(item.score);
        setEditingId(item.id);
    };

    const handleCancel = () => {
        setInstitution(""); setDegree(""); setPeriod(""); setScore("");
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete?")) return;
        await supabase.from("education").delete().eq("id", id);
        fetchData();
        toast.success("Deleted");
    };

    return (
        <div className="space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 p-4 border rounded-lg bg-card/50 items-end">
                <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input value={institution} onChange={e => setInstitution(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Degree / Class</Label>
                    <Input value={degree} onChange={e => setDegree(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Period (e.g. 2023 - 2027)</Label>
                    <Input value={period} onChange={e => setPeriod(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Score (e.g. CGPA: 7.2/10)</Label>
                    <Input value={score} onChange={e => setScore(e.target.value)} required />
                </div>

                <div className="md:col-span-2 flex gap-2 justify-end mt-2">
                    <Button type="submit">
                        {editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                        {editingId ? "Update" : "Add"}
                    </Button>
                    {editingId && <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>}
                </div>
            </form>

            <div className="space-y-4">
                {data.map(item => (
                    <Card key={item.id} className="p-4 flex justify-between items-center group">
                        <div>
                            <h4 className="font-bold">{item.institution}</h4>
                            <p className="text-sm text-muted-foreground">{item.degree} • {item.period}</p>
                            <p className="text-sm font-medium text-primary">{item.score}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Pencil size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );

};

// --- CERTIFICATION MANAGER COMPONENT ---
const CertificationManager = () => {
    const [data, setData] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [issuer, setIssuer] = useState("");
    const [url, setUrl] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchData = async () => {
        const { data } = await supabase.from("certifications").select("*").order("id", { ascending: true });
        if (data) setData(data);
    };
    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, issuer, url };

        if (editingId) {
            await supabase.from("certifications").update(payload).eq("id", editingId);
            toast.success("Updated");
            setEditingId(null);
        } else {
            await supabase.from("certifications").insert([payload]);
            toast.success("Created");
        }
        setName(""); setIssuer(""); setUrl("");
        fetchData();
    };

    const handleEdit = (item: any) => {
        setName(item.name);
        setIssuer(item.issuer);
        setUrl(item.url);
        setEditingId(item.id);
    };

    const handleCancel = () => {
        setName(""); setIssuer(""); setUrl("");
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete?")) return;
        await supabase.from("certifications").delete().eq("id", id);
        fetchData();
        toast.success("Deleted");
    };

    return (
        <div className="space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg bg-card/50 items-end">
                <div className="md:col-span-1 space-y-2">
                    <Label>Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="md:col-span-1 space-y-2">
                    <Label>Issuer (Platform)</Label>
                    <Input value={issuer} onChange={e => setIssuer(e.target.value)} required />
                </div>
                <div className="md:col-span-1 space-y-2">
                    <Label>Certificate URL</Label>
                    <Input value={url} onChange={e => setUrl(e.target.value)} required />
                </div>
                <div className="md:col-span-1 flex gap-2">
                    <Button type="submit" className="w-full">
                        {editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                        {editingId ? "Update" : "Add"}
                    </Button>
                    {editingId && <Button type="button" variant="outline" onClick={handleCancel}>X</Button>}
                </div>
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map(item => (
                    <Card key={item.id} className="p-4 relative group">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Pencil size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                        </div>
                        <h4 className="font-bold pr-16 truncate" title={item.name}>{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.issuer}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary truncate block mt-1 hover:underline">{item.url}</a>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// --- SKILLS MANAGER COMPONENT ---
const SkillsManager = () => {
    const [skills, setSkills] = useState<any[]>([]);
    const [category, setCategory] = useState("");
    const [items, setItems] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchData = async () => {
        const { data } = await supabase.from("skills").select("*").order("id", { ascending: true });
        if (data) setSkills(data);
    };
    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const skillItems = items.split(",").map(s => s.trim()).filter(s => s);

        if (editingId) {
            await supabase.from("skills").update({ category, items: skillItems }).eq("id", editingId);
            toast.success("Skill Category Updated");
            setEditingId(null);
        } else {
            await supabase.from("skills").insert([{ category, items: skillItems }]);
            toast.success("Skill Category Added");
        }

        setCategory("");
        setItems("");
        fetchData();
    };

    const handleEdit = (skill: any) => {
        setCategory(skill.category);
        setItems(skill.items.join(", "));
        setEditingId(skill.id);
    };

    const handleCancel = () => {
        setCategory("");
        setItems("");
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete?")) return;
        await supabase.from("skills").delete().eq("id", id);
        fetchData();
        toast.success("Deleted");
    };

    return (
        <div className="space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="flex gap-4 items-end border p-4 rounded-lg bg-card/50">
                <div className="grid gap-2 flex-1">
                    <Label>Category (e.g. Languages)</Label>
                    <Input value={category} onChange={e => setCategory(e.target.value)} required />
                </div>
                <div className="grid gap-2 flex-[2]">
                    <Label>Skills (comma separated)</Label>
                    <Input value={items} onChange={e => setItems(e.target.value)} placeholder="Java, Python, C++" required />
                </div>
                <div className="flex gap-2">
                    <Button type="submit">
                        {editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                        {editingId ? "Update" : "Add"}
                    </Button>
                    {editingId && (
                        <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                    )}
                </div>
            </form>

            <div className="grid gap-4 md:grid-cols-2">
                {skills.map(skill => (
                    <Card key={skill.id} className="p-4 relative group">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(skill)}
                            >
                                <Pencil size={16} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDelete(skill.id)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                        <h4 className="font-bold mb-2">{skill.category}</h4>
                        <div className="flex flex-wrap gap-2">
                            {skill.items.map((item: string, i: number) => (
                                <Badge key={i} variant="outline">{item}</Badge>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// --- EXPERIENCE MANAGER COMPONENT ---
const ExperienceManager = () => {
    const [data, setData] = useState<Experience[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Experience | null>(null);

    // Form Fields
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [period, setPeriod] = useState("");
    const [type, setType] = useState("Internship");
    const [desc, setDesc] = useState("");
    const [internshipUrl, setInternshipUrl] = useState("");

    const fetchData = async () => {
        const { data } = await supabase.from("experiences").select("*").order("id", { ascending: true });
        if (data) setData(data);
    };

    useEffect(() => { fetchData(); }, []);

    const openModal = (item?: Experience) => {
        if (item) {
            setEditingItem(item);
            setTitle(item.title);
            setCompany(item.company_name);
            setPeriod(item.period);
            setType(item.type);
            setDesc(item.description.join("\n"));
            setInternshipUrl(item.internship_url || "");
        } else {
            setEditingItem(null);
            setTitle("");
            setCompany("");
            setPeriod("");
            setType("Internship");
            setDesc("");
            setInternshipUrl("");
        }
        setIsOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this?")) return;
        await supabase.from("experiences").delete().eq("id", id);
        fetchData();
        toast.success("Deleted");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title,
            company_name: company,
            period,
            type,
            description: desc.split("\n").filter(x => x.trim()),
            internship_url: internshipUrl,
        };

        if (editingItem) {
            await supabase.from("experiences").update(payload).eq("id", editingItem.id);
            toast.success("Updated");
        } else {
            await supabase.from("experiences").insert([payload]);
            toast.success("Created");
        }
        setIsOpen(false);
        fetchData();
    };

    return (
        <div className="space-y-4 mt-4">
            <div className="flex justify-end">
                <Button onClick={() => openModal()} className="gap-2"><Plus size={16} /> Add Experience</Button>
            </div>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.company_name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => openModal(item)}><Pencil size={16} /></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{editingItem ? "Edit" : "Add"} Experience</DialogTitle></DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <Input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required />
                        <Input placeholder="Period" value={period} onChange={e => setPeriod(e.target.value)} required />
                        <Input placeholder="Type" value={type} onChange={e => setType(e.target.value)} required />
                        <Textarea placeholder="Description (lines)" value={desc} onChange={e => setDesc(e.target.value)} className="h-32" required />
                        <Input placeholder="Internship/Certificate URL" value={internshipUrl} onChange={e => setInternshipUrl(e.target.value)} />
                        <Button type="submit" className="w-full">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// --- PROJECT MANAGER COMPONENT ---
const ProjectManager = () => {
    const [data, setData] = useState<Project[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Project | null>(null);

    // Form Fields
    const [title, setTitle] = useState("");
    const [period, setPeriod] = useState("");
    const [desc, setDesc] = useState("");
    const [highlights, setHighlights] = useState("");
    const [tags, setTags] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    const fetchData = async () => {
        const { data } = await supabase.from("projects").select("*").order("id", { ascending: true });
        if (data) setData(data);
    };

    useEffect(() => { fetchData(); }, []);

    const openModal = (item?: Project) => {
        if (item) {
            setEditingItem(item);
            setTitle(item.title);
            setPeriod(item.period);
            setDesc(item.description);
            setHighlights(item.highlights.join("\n"));
            setTags(item.tags.join(", "));
            setGithubUrl(item.github_url || "");
        } else {
            setEditingItem(null);
            setTitle("");
            setPeriod("");
            setDesc("");
            setHighlights("");
            setTags("");
            setGithubUrl("");
        }
        setIsOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this?")) return;
        await supabase.from("projects").delete().eq("id", id);
        fetchData();
        toast.success("Deleted");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title,
            period,
            description: desc,
            highlights: highlights.split("\n").filter(x => x.trim()),
            tags: tags.split(",").map(x => x.trim()).filter(x => x),
            github_url: githubUrl,
        };

        if (editingItem) {
            await supabase.from("projects").update(payload).eq("id", editingItem.id);
            toast.success("Updated");
        } else {
            await supabase.from("projects").insert([payload]);
            toast.success("Created");
        }
        setIsOpen(false);
        fetchData();
    };

    return (
        <div className="space-y-4 mt-4">
            <div className="flex justify-end">
                <Button onClick={() => openModal()} className="gap-2"><Plus size={16} /> Add Project</Button>
            </div>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.period}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => openModal(item)}><Pencil size={16} /></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>{editingItem ? "Edit" : "Add"} Project</DialogTitle></DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <Input placeholder="Period" value={period} onChange={e => setPeriod(e.target.value)} required />
                        <Textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required />
                        <Textarea placeholder="Highlights (one per line)" value={highlights} onChange={e => setHighlights(e.target.value)} className="h-24" required />
                        <Input placeholder="Tags (comma separated, e.g. React, Java)" value={tags} onChange={e => setTags(e.target.value)} required />
                        <Input placeholder="Github Repo URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />
                        <Button type="submit" className="w-full">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// --- PROFILE MANAGER COMPONENT ---
const ProfileManager = () => {
    const [profile, setProfile] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from("profile").select("*").single();
            if (data) setProfile(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("profile").update(profile).eq("id", profile.id);
        if (error) toast.error("Failed");
        else toast.success("Profile Updated!");
    };

    const handleChange = (key: string, val: string) => setProfile({ ...profile, [key]: val });

    if (loading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl mt-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Personal Email</Label>
                    <Input value={profile.email_personal} onChange={e => handleChange("email_personal", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>College Email</Label>
                    <Input value={profile.email_college} onChange={e => handleChange("email_college", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Phone (IN)</Label>
                    <Input value={profile.phone_in} onChange={e => handleChange("phone_in", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Phone (NP)</Label>
                    <Input value={profile.phone_np} onChange={e => handleChange("phone_np", e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Temporary Address</Label>
                <Input value={profile.address_temp} onChange={e => handleChange("address_temp", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Permanent Address</Label>
                <Input value={profile.address_perm} onChange={e => handleChange("address_perm", e.target.value)} />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>GitHub URL</Label>
                    <Input value={profile.github} onChange={e => handleChange("github", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input value={profile.linkedin} onChange={e => handleChange("linkedin", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>LeetCode URL</Label>
                    <Input value={profile.leetcode} onChange={e => handleChange("leetcode", e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Current Status Text (e.g. B.E. Student...)</Label>
                <Input value={profile.status_text} onChange={e => handleChange("status_text", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Open For Text (e.g. Open to internship...)</Label>
                <Input value={profile.open_for} onChange={e => handleChange("open_for", e.target.value)} />
            </div>

            <Button type="submit">Update Profile</Button>
        </form>
    );
};

export default AdminDashboard;