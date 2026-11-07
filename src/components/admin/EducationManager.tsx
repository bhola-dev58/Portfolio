import { useState, useEffect } from "react";
import { education as educationApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const EducationManager = () => {
    const [data, setData] = useState<any[]>([]);
    const [institution, setInstitution] = useState("");
    const [degree, setDegree] = useState("");
    const [period, setPeriod] = useState("");
    const [score, setScore] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchData = async () => {
        const { data: result } = await educationApi.getAll();
        if (result) setData(result as any[]);
    };
    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { institution, degree, period, score };
        if (editingId) {
            await educationApi.update(editingId, payload);
            toast.success("Updated"); setEditingId(null);
        } else {
            await educationApi.create(payload);
            toast.success("Created");
        }
        setInstitution(""); setDegree(""); setPeriod(""); setScore(""); fetchData();
    };

    const handleEdit = (item: any) => {
        setInstitution(item.institution); setDegree(item.degree);
        setPeriod(item.period); setScore(item.score);
        setEditingId(item.id || item._id);
    };

    const handleCancel = () => { setInstitution(""); setDegree(""); setPeriod(""); setScore(""); setEditingId(null); };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await educationApi.delete(id);
        fetchData(); toast.success("Deleted");
    };

    return (
        <div className="admin-panel space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50 items-end">
                <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold text-sm">Institution</Label>
                    <Input value={institution} onChange={e => setInstitution(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold text-sm">Degree / Class</Label>
                    <Input value={degree} onChange={e => setDegree(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold text-sm">Period (e.g. 2023 - 2027)</Label>
                    <Input value={period} onChange={e => setPeriod(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold text-sm">Score (e.g. CGPA: 7.2/10)</Label>
                    <Input value={score} onChange={e => setScore(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="md:col-span-2 flex gap-2 justify-end mt-2">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                        {editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                        {editingId ? "Update" : "Add"}
                    </Button>
                    {editingId && <Button type="button" variant="outline" onClick={handleCancel} className="border-slate-200 text-slate-700">Cancel</Button>}
                </div>
            </form>
            <div className="space-y-3">
                {data.map(item => (
                    <div key={item.id || item._id} className="p-4 flex justify-between items-center group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <h4 className="font-bold text-slate-900">{item.institution}</h4>
                            <p className="text-sm text-slate-500">{item.degree} • {item.period}</p>
                            <p className="text-sm font-semibold text-orange-500">{item.score}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={() => handleEdit(item)}><Pencil size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-700 hover:bg-rose-50" onClick={() => handleDelete(item.id || item._id)}><Trash2 size={16} /></Button>
                        </div>
                    </div>
                ))}
                {data.length === 0 && (
                    <p className="text-center text-slate-400 py-8">No education records yet. Add one above.</p>
                )}
            </div>
        </div>
    );

};
