"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/nextjs";

const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

export default function ChatList({ onSelect }: { onSelect: (channel: any) => void }) {
    const { user } = useUser();
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchChannels = async () => {
            const filters = { type: "messaging", members: { $in: [user.id] } };
            const sort = { last_message_at: "desc" }; 


            const response = await chatClient.queryChannels({ type: "messaging", members: { $in: [user.id] } }, { last_message_at: "desc" }, { limit: 10 });
            setChannels(response);
        };

        fetchChannels();
    }, [user]);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Your Chats</h2>
            {channels.map((channel) => (
                <Button key={channel.id} onClick={() => onSelect(channel)} className="block w-full">
                    {channel.data.name || "Unnamed Chat"}
                </Button>
            ))}
        </div>
    );
}
