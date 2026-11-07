import { useState, useEffect } from "react";
import { messages as messagesApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const MessageManager = () => {
    const [messages, setMessages] = useState<any[]>([]);

    const fetchMessages = async () => {
        const { data, error } = await messagesApi.getAll();
        if (error) console.error("Error fetching messages:", error);
        if (data) setMessages(data as any[]);
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        const { error } = await messagesApi.delete(id);
        if (error) { toast.error("Failed to delete message"); }
        else { toast.success("Message deleted"); fetchMessages(); }
    };

    return (
        <div className="admin-panel space-y-4 mt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Inbox</h2>
                <span className="text-sm text-slate-500">{messages.length} message{messages.length !== 1 ? 's' : ''}</span>
            </div>
            {messages.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <p className="text-lg font-medium">No messages yet.</p>
                    <p className="text-sm mt-1">Contact form submissions will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <div key={msg.id || msg._id} className="p-5 relative bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-slate-900">{msg.name}</h3>
                                    <p className="text-sm text-slate-500">{msg.email}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{new Date(msg.created_at).toLocaleString()}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-700 hover:bg-rose-50" onClick={() => handleDelete(msg.id || msg._id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                            <div className="mt-2 text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 border border-slate-100 p-3 rounded-lg">{msg.message}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
