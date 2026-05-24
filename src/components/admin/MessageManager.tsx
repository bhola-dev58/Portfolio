import { useState, useEffect } from "react";
import { messages as messagesApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
        <div className="space-y-4 mt-6">
            <h2 className="text-xl font-bold">Inbox</h2>
            {messages.length === 0 ? (
                <p className="text-muted-foreground">No messages yet.</p>
            ) : (
                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <Card key={msg.id || msg._id} className="p-4 relative">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold">{msg.name}</h3>
                                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{new Date(msg.created_at).toLocaleString()}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(msg.id || msg._id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                            <div className="mt-2 text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{msg.message}</div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
