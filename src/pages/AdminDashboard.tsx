
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Experience {
    id: number;
    title: string;
    company_name: string;
    period: string;
    type: string;
    description: string[];
}

const AdminDashboard = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [currentExp, setCurrentExp] = useState<Experience | null>(null);
    const navigate = useNavigate();

    // Form states
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [period, setPeriod] = useState("");
    const [type, setType] = useState("Internship");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("experiences")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            toast.error("Failed to fetch data");
        } else {
            setExperiences(data || []);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    const openAddModal = () => {
        setCurrentExp(null);
        setTitle("");
        setCompany("");
        setPeriod("");
        setType("Internship");
        setDescription("");
        setIsOpen(true);
    };

    const openEditModal = (exp: Experience) => {
        setCurrentExp(exp);
        setTitle(exp.title);
        setCompany(exp.company_name);
        setPeriod(exp.period);
        setType(exp.type);
        setDescription(exp.description.join("\n"));
        setIsOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this?")) return;

        const { error } = await supabase.from("experiences").delete().eq("id", id);
        if (error) {
            toast.error("Failed to delete");
        } else {
            toast.success("Deleted successfully");
            fetchExperiences();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const descArray = description.split("\n").filter((line) => line.trim() !== "");

        const payload = {
            title,
            company_name: company,
            period,
            type,
            description: descArray,
        };

        let error;
        if (currentExp) {
            // Update
            const { error: err } = await supabase
                .from("experiences")
                .update(payload)
                .eq("id", currentExp.id);
            error = err;
        } else {
            // Insert
            const { error: err } = await supabase.from("experiences").insert([payload]);
            error = err;
        }

        if (error) {
            toast.error(currentExp ? "Failed to update" : "Failed to create");
        } else {
            toast.success(currentExp ? "Updated successfully" : "Created successfully");
            setIsOpen(false);
            fetchExperiences();
        }
    };

    return (
        <div className="min-h-screen p-8 pt-24 space-y-8 container mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <Button onClick={openAddModal} className="gap-2">
                        <Plus size={16} /> Add Experience
                    </Button>
                    <Button variant="destructive" onClick={handleLogout} className="gap-2">
                        <LogOut size={16} /> Logout
                    </Button>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Period</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : experiences.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    No experiences found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            experiences.map((exp) => (
                                <TableRow key={exp.id}>
                                    <TableCell className="font-medium">{exp.title}</TableCell>
                                    <TableCell>{exp.company_name}</TableCell>
                                    <TableCell>{exp.period}</TableCell>
                                    <TableCell>{exp.type}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => openEditModal(exp)}
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(exp.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {currentExp ? "Edit Experience" : "Add New Experience"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Software Engineer Intern"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="company">Company Name</Label>
                            <Input
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="Google"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="period">Period</Label>
                                <Input
                                    id="period"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    placeholder="Jan 2024 - Present"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Input
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    placeholder="Internship"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Description (One point per line)
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Developed a cool feature...&#10;Fixed some bugs..."
                                className="h-32"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminDashboard;
