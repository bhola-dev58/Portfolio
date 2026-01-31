import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const EducationManager = () => {
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
