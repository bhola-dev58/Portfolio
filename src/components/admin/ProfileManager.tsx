import { useState, useEffect } from "react";
import { profile as profileApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const ProfileManager = () => {
    const [profile, setProfile] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data } = await profileApi.get();
            if (data) setProfile(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = profile.id || profile._id;
        const { error } = await profileApi.update(id, profile);
        if (error) toast.error("Failed");
        else toast.success("Profile Updated!");
    };

    const handleChange = (key: string, val: string) => setProfile({ ...profile, [key]: val });

    if (loading) return <div className="text-slate-500 py-8 text-center">Loading profile...</div>;

    return (
        <form onSubmit={handleSave} className="admin-panel space-y-6 max-w-3xl mt-6">
            {/* Contact Info */}
            <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">Personal Email</Label>
                        <Input value={profile.email_personal || ''} onChange={e => handleChange("email_personal", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">College Email</Label>
                        <Input value={profile.email_college || ''} onChange={e => handleChange("email_college", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">Phone </Label>
                        <Input value={profile.phone_in || ''} onChange={e => handleChange("phone_in", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Address */}
            <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Address</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">Address</Label>
                        <Input
                            value={profile.address || profile.address_temp || ''}
                            onChange={e => {
                                const val = e.target.value;
                                setProfile({
                                    ...profile,
                                    address: val,
                                    address_temp: val,
                                    address_perm: val,
                                });
                            }}
                            placeholder="ITPL Main Road Bengaluru, Karnataka, India"
                            className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">GitHub URL</Label>
                        <Input value={profile.github || ''} onChange={e => handleChange("github", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">LinkedIn URL</Label>
                        <Input value={profile.linkedin || ''} onChange={e => handleChange("linkedin", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">LeetCode URL</Label>
                        <Input value={profile.leetcode || ''} onChange={e => handleChange("leetcode", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Status */}
            <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Status</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">Current Status Text (e.g. B.E. Student...)</Label>
                        <Input value={profile.status_text || ''} onChange={e => handleChange("status_text", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold text-sm">Open For Text (e.g. Open to internship...)</Label>
                        <Input value={profile.open_for || ''} onChange={e => handleChange("open_for", e.target.value)} className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400" />
                    </div>
                </div>
            </div>

            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8">Update Profile</Button>
        </form>
    );
};
