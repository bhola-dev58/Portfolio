import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
}

interface Project {
    id: number;
    title: string;
    period: string;
    description: string;
    highlights: string[];
    tags: string[];
}

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
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button variant="destructive" onClick={handleLogout} className="gap-2">
                    <LogOut size={16} /> Logout
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="experience">
                    <ExperienceManager />
                </TabsContent>

                <TabsContent value="projects">
                    <ProjectManager />
                </TabsContent>
            </Tabs>
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

    const fetchData = async () => {
        const { data } = await supabase.from("experiences").select("*").order("id", { ascending: false });
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
        } else {
            setEditingItem(null);
            setTitle("");
            setCompany("");
            setPeriod("");
            setType("Internship");
            setDesc("");
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

    const fetchData = async () => {
        const { data } = await supabase.from("projects").select("*").order("id", { ascending: false });
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
        } else {
            setEditingItem(null);
            setTitle("");
            setPeriod("");
            setDesc("");
            setHighlights("");
            setTags("");
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
                        <Button type="submit" className="w-full">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;