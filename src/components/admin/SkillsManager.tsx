import { useState, useEffect } from "react";
import { skills as skillsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <div className="space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="flex gap-4 items-end border p-4 rounded-lg bg-card/50">
                <div className="grid gap-2 flex-1"><Label>Category (e.g. Languages)</Label><Input value={category} onChange={e => setCategory(e.target.value)} required /></div>
                <div className="grid gap-2 flex-[2]"><Label>Skills (comma separated)</Label><Input value={items} onChange={e => setItems(e.target.value)} placeholder="Java, Python, C++" required /></div>
                <div className="flex gap-2">
                    <Button type="submit">{editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}{editingId ? "Update" : "Add"}</Button>
                    {editingId && <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>}
                </div>
            </form>
            <div className="grid gap-4 md:grid-cols-2">
                {skills.map(skill => (
                    <Card key={skill.id || skill._id} className="p-4 relative group">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)}><Pencil size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(skill.id || skill._id)}><Trash2 size={16} /></Button>
                        </div>
                        <h4 className="font-bold mb-2">{skill.category}</h4>
                        <div className="flex flex-wrap gap-2">{skill.items.map((item: string, i: number) => (<Badge key={i} variant="outline">{item}</Badge>))}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
