import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const ProfileManager = () => {
    const [profile, setProfile] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from("profile").select("*").single();
            if (data) setProfile(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("profile").update(profile).eq("id", profile.id);
        if (error) toast.error("Failed");
        else toast.success("Profile Updated!");
    };

    const handleChange = (key: string, val: string) => setProfile({ ...profile, [key]: val });

    if (loading) return <div>Loading...</div>;

    return (
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl mt-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Personal Email</Label>
                    <Input value={profile.email_personal} onChange={e => handleChange("email_personal", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>College Email</Label>
                    <Input value={profile.email_college} onChange={e => handleChange("email_college", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Phone (IN)</Label>
                    <Input value={profile.phone_in} onChange={e => handleChange("phone_in", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Phone (NP)</Label>
                    <Input value={profile.phone_np} onChange={e => handleChange("phone_np", e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Temporary Address</Label>
                <Input value={profile.address_temp} onChange={e => handleChange("address_temp", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Permanent Address</Label>
                <Input value={profile.address_perm} onChange={e => handleChange("address_perm", e.target.value)} />
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>GitHub URL</Label>
                    <Input value={profile.github} onChange={e => handleChange("github", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input value={profile.linkedin} onChange={e => handleChange("linkedin", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>LeetCode URL</Label>
                    <Input value={profile.leetcode} onChange={e => handleChange("leetcode", e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Current Status Text (e.g. B.E. Student...)</Label>
                <Input value={profile.status_text} onChange={e => handleChange("status_text", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>Open For Text (e.g. Open to internship...)</Label>
                <Input value={profile.open_for} onChange={e => handleChange("open_for", e.target.value)} />
            </div>

            <Button type="submit">Update Profile</Button>
        </form>
    );
};
