import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const CertificationManager = () => {
    const [data, setData] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [issuer, setIssuer] = useState("");
    const [url, setUrl] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchData = async () => {
        const { data } = await supabase.from("certifications").select("*").order("id", { ascending: true });
        if (data) setData(data);
    };
    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, issuer, url };

        if (editingId) {
            await supabase.from("certifications").update(payload).eq("id", editingId);
            toast.success("Updated");
            setEditingId(null);
        } else {
            await supabase.from("certifications").insert([payload]);
            toast.success("Created");
        }
        setName(""); setIssuer(""); setUrl("");
        fetchData();
    };

    const handleEdit = (item: any) => {
        setName(item.name);
        setIssuer(item.issuer);
        setUrl(item.url);
        setEditingId(item.id);
    };

    const handleCancel = () => {
        setName(""); setIssuer(""); setUrl("");
        setEditingId(null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete?")) return;
        await supabase.from("certifications").delete().eq("id", id);
        fetchData();
        toast.success("Deleted");
    };

    return (
        <div className="space-y-6 mt-6">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg bg-card/50 items-end">
                <div className="md:col-span-1 space-y-2">
                    <Label>Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="md:col-span-1 space-y-2">
                    <Label>Issuer (Platform)</Label>
                    <Input value={issuer} onChange={e => setIssuer(e.target.value)} required />
                </div>
                <div className="md:col-span-1 space-y-2">
                    <Label>Certificate URL</Label>
                    <Input value={url} onChange={e => setUrl(e.target.value)} required />
                </div>
                <div className="md:col-span-1 flex gap-2">
                    <Button type="submit" className="w-full">
                        {editingId ? <Pencil size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                        {editingId ? "Update" : "Add"}
                    </Button>
                    {editingId && <Button type="button" variant="outline" onClick={handleCancel}>X</Button>}
                </div>
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map(item => (
                    <Card key={item.id} className="p-4 relative group">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Pencil size={16} /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 size={16} /></Button>
                        </div>
                        <h4 className="font-bold pr-16 truncate" title={item.name}>{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.issuer}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary truncate block mt-1 hover:underline">{item.url}</a>
                    </Card>
                ))}
            </div>
        </div>
    );
};
