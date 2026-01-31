import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const MessageManager = () => {
    const [messages, setMessages] = useState<any[]>([]);

    const fetchMessages = async () => {
        const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
        if (error) console.error("Error fetching messages:", error);
        if (data) setMessages(data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        const { error } = await supabase.from("messages").delete().eq("id", id);

        if (error) {
            toast.error("Failed to delete message");
        } else {
            toast.success("Message deleted");
            fetchMessages();
        }
    };

    return (
        <div className="space-y-4 mt-6">
            <h2 className="text-xl font-bold">Inbox</h2>
            {messages.length === 0 ? (
                <p className="text-muted-foreground">No messages yet.</p>
            ) : (
                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <Card key={msg.id} className="p-4 relative">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold">{msg.name}</h3>
                                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(msg.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive"
                                    onClick={() => handleDelete(msg.id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                            <div className="mt-2 text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">
                                {msg.message}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
