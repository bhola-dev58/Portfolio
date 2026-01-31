import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Project {
    id: number;
    title: string;
    period: string;
    description: string;
    highlights: string[];
    tags: string[];
    github_url?: string;
}

export const ProjectManager = () => {
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
