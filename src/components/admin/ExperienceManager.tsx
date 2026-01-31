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

interface Experience {
    id: number;
    title: string;
    company_name: string;
    period: string;
    type: string;
    description: string[];
    internship_url?: string;
}

export const ExperienceManager = () => {
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
