import { useState, useEffect } from "react";
import { experiences as experiencesApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Experience {
    id: string;
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
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [period, setPeriod] = useState("");
    const [type, setType] = useState("Internship");
    const [desc, setDesc] = useState("");
    const [internshipUrl, setInternshipUrl] = useState("");

    const fetchData = async () => {
        const { data: result } = await experiencesApi.getAll();
        if (result) setData(result as Experience[]);
    };
    useEffect(() => { fetchData(); }, []);

    const openModal = (item?: Experience) => {
        if (item) {
            setEditingItem(item); setTitle(item.title); setCompany(item.company_name);
            setPeriod(item.period); setType(item.type); setDesc(item.description.join("\n"));
            setInternshipUrl(item.internship_url || "");
        } else {
            setEditingItem(null); setTitle(""); setCompany(""); setPeriod("");
            setType("Internship"); setDesc(""); setInternshipUrl("");
        }
        setIsOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this?")) return;
        await experiencesApi.delete(id);
        fetchData(); toast.success("Deleted");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title, company_name: company, period, type,
            description: desc.split("\n").filter(x => x.trim()),
            internship_url: internshipUrl,
        };
        if (editingItem) {
            await experiencesApi.update(editingItem.id, payload);
            toast.success("Updated");
        } else {
            await experiencesApi.create(payload);
            toast.success("Created");
        }
        setIsOpen(false); fetchData();
    };

    return (
        <div className="admin-panel space-y-4 mt-4">
            <div className="flex justify-end">
                <Button onClick={() => openModal()} className="gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus size={16} /> Add Experience
                </Button>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 border-b border-slate-200">
                            <TableHead className="text-slate-700 font-semibold">Title</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Company</TableHead>
                            <TableHead className="text-slate-700 font-semibold">Type</TableHead>
                            <TableHead className="text-right text-slate-700 font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                <TableCell className="text-slate-800 font-medium">{item.title}</TableCell>
                                <TableCell className="text-slate-700">{item.company_name}</TableCell>
                                <TableCell className="text-slate-600">{item.type}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={() => openModal(item)}><Pencil size={16} /></Button>
                                    <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-700 hover:bg-rose-50" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-slate-400 py-8">No experiences yet. Add one above.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="bg-white border-slate-200 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 text-lg font-bold">{editingItem ? "Edit" : "Add"} Experience</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                        <Input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                        <Input placeholder="Period (e.g. Jan 2025 – Mar 2025)" value={period} onChange={e => setPeriod(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                        <Input placeholder="Type (e.g. Internship, Full-time)" value={type} onChange={e => setType(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                        <Textarea placeholder="Description — one bullet per line" value={desc} onChange={e => setDesc(e.target.value)} className="h-32 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" required />
                        <Input placeholder="Internship / Certificate URL (optional)" value={internshipUrl} onChange={e => setInternshipUrl(e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">Save Experience</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
