"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

type Message = {
  id: number;
  user: string;
  content: string;
  timestamp: string;
};

export default function TeamChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'Alice', content: 'Hey everyone, how\'s the video quality?', timestamp: '2:30 PM' },
    { id: 2, user: 'Bob', content: 'It\'s great on my end!', timestamp: '2:31 PM' },
    { id: 3, user: 'Charlie', content: 'Same here, crystal clear.', timestamp: '2:32 PM' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message: Message = {
        id: messages.length + 1,
        user: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto border rounded-lg overflow-hidden bg-white text-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-white-1">Chat</h2>
      </div>

      {/* Messages Scroll Area */}
      <ScrollArea className="flex-grow p-4 bg-white">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start mb-4">
            <Avatar className="w-8 h-8 mr-2">
              <AvatarFallback className="text-gray-800 bg-gray-200">{message.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-semibold text-white-2 mr-2">{message.user}</span>
                <span className="text-xs text-white-1">{message.timestamp}</span>
              </div>
              <p className="text-sm text-white-1">{message.content}</p>
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Message Input Form */}
      <div className="p-4 border-t border-gray-300">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2 bg-gray-100 text-gray-900 placeholder-gray-500"
          />
          <Button type="submit" size="icon" className="bg-orange-1 hover:bg-orange-600">
            <Send className="h-4 w-4 text-white-1" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}