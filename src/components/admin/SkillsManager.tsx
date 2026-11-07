import { useState, useEffect } from "react";
import { skills as skillsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const SkillsManager = () => {
    const [skills, setSkills] = useState<any[]>([]);
    const [category, setCategory] = useState("");
    const [items, setItems] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchData = async () => {
        const { data } = await skillsApi.getAll();
        if (data) setSkills(data as any[]);
    };
    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const skillItems = items.split(",").map(s => s.trim()).filter(s => s);
        if (editingId) {
            await skillsApi.update(editingId, { category, items: skillItems });
            toast.success("Skill Category Updated");
            setEditingId(null);
        } else {
            await skillsApi.create({ category, items: skillItems });
            toast.success("Skill Category Added");
        }
        setCategory(""); setItems(""); fetchData();
    };

    const handleEdit = (skill: any) => {
        setCategory(skill.category);
        setItems(skill.items.join(", "));
        setEditingId(skill.id || skill._id);
    };

    const handleCancel = () => { setCategory(""); setItems(""); setEditingId(null); };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await skillsApi.delete(id);
        fetchData(); toast.success("Deleted");
    };

    return (
        <div className="admin-panel space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="flex gap-4 items-end border border-slate-200 p-4 rounded-xl bg-slate-50">
                <div className="grid gap-2 flex-1">
                    <Label className="text-slate-700 font-semibold text-sm">Category (e.g. Languages)</Label>
                    <Input value={category} onChange={e => setCategory(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="grid gap-2 flex-[2]">
                    <Label className="text-slate-700 font-semibold text-sm">Skills (comma separated)</Label>
                    <Input value={items} onChange={e => setItems(e.target.value)} placeholder="Java, Python, C++" required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="flex gap-2">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        {editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                        {editingId ? "Update" : "Add"}
                    </Button>
                    {editingId && <Button type="button" variant="outline" onClick={handleCancel} className="border-slate-200 text-slate-700 hover:bg-slate-100">Cancel</Button>}
                </div>
            </form>
            <div className="grid gap-4 md:grid-cols-2">
                {skills.map(skill => (
                    <div key={skill.id || skill._id} className="p-4 relative group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={() => handleEdit(skill)}><Pencil size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-700 hover:bg-rose-50" onClick={() => handleDelete(skill.id || skill._id)}><Trash2 size={16} /></Button>
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{skill.category}</h4>
                        <div className="flex flex-wrap gap-2">
                            {skill.items.map((item: string, i: number) => (
                                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {skills.length === 0 && (
                    <p className="col-span-2 text-center text-slate-400 py-8">No skill categories yet. Add one above.</p>
                )}
            </div>
        </div>
    );
};
