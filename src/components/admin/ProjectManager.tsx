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
    deployed_url?: string;
}

// Helper: Format a date string (YYYY-MM-DD) to "Mon YYYY"
const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Helper: Parse a "Mon YYYY" string back to "YYYY-MM" for date input
const parseDisplayDateToInput = (display: string): string => {
    if (!display || display.toLowerCase() === "present") return "";
    const parsed = new Date(display);
    if (isNaN(parsed.getTime())) return "";
    const yyyy = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, "0");
    return `${yyyy}-${mm}`;
};

export const ProjectManager = () => {
    const [data, setData] = useState<Project[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Project | null>(null);

    // Form Fields
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [desc, setDesc] = useState("");
    const [highlights, setHighlights] = useState("");
    const [tags, setTags] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [deployedUrl, setDeployedUrl] = useState("");

    const fetchData = async () => {
        const { data } = await supabase.from("projects").select("*").order("id", { ascending: true });
        if (data) setData(data);
    };

    useEffect(() => { fetchData(); }, []);

    const buildPeriod = (): string => {
        const start = startDate ? formatDate(startDate) : "";
        const end = isRunning ? "Present" : (endDate ? formatDate(endDate) : "");
        if (start && end) return `${start} - ${end}`;
        if (start) return start;
        return "";
    };

    const parsePeriodToFields = (period: string) => {
        const parts = period.split(" - ");
        if (parts.length === 2) {
            const startVal = parseDisplayDateToInput(parts[0]);
            const endVal = parts[1].toLowerCase() === "present" ? "" : parseDisplayDateToInput(parts[1]);
            const running = parts[1].toLowerCase() === "present";
            return { startVal, endVal, running };
        }
        // Single date
        const startVal = parseDisplayDateToInput(period);
        return { startVal, endVal: "", running: false };
    };

    const openModal = (item?: Project) => {
        if (item) {
            setEditingItem(item);
            setTitle(item.title);
            const { startVal, endVal, running } = parsePeriodToFields(item.period || "");
            setStartDate(startVal);
            setEndDate(endVal);
            setIsRunning(running);
            setDesc(item.description);
            setHighlights(item.highlights.join("\n"));
            setTags(item.tags.join(", "));
            setGithubUrl(item.github_url || "");
            setDeployedUrl(item.deployed_url || "");
        } else {
            setEditingItem(null);
            setTitle("");
            setStartDate("");
            setEndDate("");
            setIsRunning(false);
            setDesc("");
            setHighlights("");
            setTags("");
            setGithubUrl("");
            setDeployedUrl("");
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
        const period = buildPeriod();
        if (!period) {
            toast.error("Please provide at least a start date.");
            return;
        }
        const payload = {
            title,
            period,
            description: desc,
            highlights: highlights.split("\n").filter(x => x.trim()),
            tags: tags.split(",").map(x => x.trim()).filter(x => x),
            github_url: githubUrl || null,
            deployed_url: deployedUrl || null,
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
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>{editingItem ? "Edit" : "Add"} Project</DialogTitle></DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />

                        {/* Period Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Project Period</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">Start Date</label>
                                    <Input
                                        type="month"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                        required
                                        className="block"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-muted-foreground">
                                        End Date {isRunning && <span className="text-primary font-semibold">(Running)</span>}
                                    </label>
                                    <Input
                                        type="month"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        disabled={isRunning}
                                        className={`block ${isRunning ? "opacity-40 cursor-not-allowed" : ""}`}
                                        placeholder="End date"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                                <input
                                    type="checkbox"
                                    id="isRunning"
                                    checked={isRunning}
                                    onChange={e => {
                                        setIsRunning(e.target.checked);
                                        if (e.target.checked) setEndDate("");
                                    }}
                                    className="w-4 h-4 accent-primary cursor-pointer"
                                />
                                <label htmlFor="isRunning" className="text-sm text-muted-foreground cursor-pointer select-none">
                                    Project is currently running (shows "Present")
                                </label>
                            </div>
                            {startDate && (
                                <p className="text-xs text-primary font-medium">
                                    Preview: {buildPeriod() || "—"}
                                </p>
                            )}
                        </div>

                        <Textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required />
                        <Textarea placeholder="Highlights (one per line)" value={highlights} onChange={e => setHighlights(e.target.value)} className="h-24" required />
                        <Input placeholder="Tags (comma separated, e.g. React, Java)" value={tags} onChange={e => setTags(e.target.value)} required />
                        <Input placeholder="GitHub Repo URL (optional)" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />
                        <Input placeholder="Deployed URL (optional, e.g. https://myproject.com)" value={deployedUrl} onChange={e => setDeployedUrl(e.target.value)} />
                        <Button type="submit" className="w-full">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
