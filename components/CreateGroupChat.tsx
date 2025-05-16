"use client";

import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Button } from "./ui/button";
import { Input } from "./ui/input"


const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

export default function CreateGroupChat() {
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState(""); // Comma-separated user IDs

    const createGroup = async () => {
        if (!groupName || !members) return;

        const memberArray = members.split(",").map((id) => id.trim());

        const channel = chatClient.channel("messaging", {
            name: groupName,
            members: memberArray,
        });

        await channel.create();
        alert("Group Created!");
    };

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Create Group Chat</h2>
            <Input
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
            <Input
                placeholder="Enter User IDs (comma separated)"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
            />
            <Button onClick={createGroup} className="mt-2">
                Create Group
            </Button>
        </div>
    );
}
