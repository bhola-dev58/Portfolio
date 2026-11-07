import { useState, useEffect } from "react";
import { certifications as certificationsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const CertificationManager = () => {
    const [data, setData] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [issuer, setIssuer] = useState("");
    const [url, setUrl] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchData = async () => {
        const { data: result } = await certificationsApi.getAll();
        if (result) setData(result as any[]);
    };
    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, issuer, url };
        if (editingId) {
            await certificationsApi.update(editingId, payload);
            toast.success("Updated"); setEditingId(null);
        } else {
            await certificationsApi.create(payload);
            toast.success("Created");
        }
        setName(""); setIssuer(""); setUrl(""); fetchData();
    };

    const handleEdit = (item: any) => { setName(item.name); setIssuer(item.issuer); setUrl(item.url); setEditingId(item.id || item._id); };
    const handleCancel = () => { setName(""); setIssuer(""); setUrl(""); setEditingId(null); };
    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await certificationsApi.delete(id);
        fetchData(); toast.success("Deleted");
    };

    return (
        <div className="admin-panel space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50 items-end">
                <div className="md:col-span-1 space-y-2">
                    <Label className="text-slate-700 font-semibold text-sm">Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="md:col-span-1 space-y-2">
                    <Label className="text-slate-700 font-semibold text-sm">Issuer (Platform)</Label>
                    <Input value={issuer} onChange={e => setIssuer(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="md:col-span-1 space-y-2">
                    <Label className="text-slate-700 font-semibold text-sm">Certificate URL</Label>
                    <Input value={url} onChange={e => setUrl(e.target.value)} required className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                </div>
                <div className="md:col-span-1 flex gap-2">
                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        {editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                        {editingId ? "Update" : "Add"}
                    </Button>
                    {editingId && <Button type="button" variant="outline" onClick={handleCancel} className="border-slate-200 text-slate-700">X</Button>}
                </div>
            </form>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map(item => (
                    <div key={item.id || item._id} className="p-4 relative group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={() => handleEdit(item)}><Pencil size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-700 hover:bg-rose-50" onClick={() => handleDelete(item.id || item._id)}><Trash2 size={16} /></Button>
                        </div>
                        <h4 className="font-bold pr-16 truncate text-slate-900" title={item.name}>{item.name}</h4>
                        <p className="text-sm text-slate-500 mt-1">{item.issuer}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 truncate block mt-1 hover:underline">{item.url}</a>
                    </div>
                ))}
                {data.length === 0 && (
                    <p className="col-span-3 text-center text-slate-400 py-8">No certifications yet. Add one above.</p>
                )}
            </div>
        </div>
    );
};
