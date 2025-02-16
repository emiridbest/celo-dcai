"use client";

import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Chat() {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
    } = useChat();

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto h-[calc(100vh-2rem)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex gap-2 w-full",
                            message.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "rounded-lg px-4 py-2 max-w-[80%] break-words",
                                message.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                            )}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form 
                onSubmit={handleSubmit}
                className="p-4 border-t dark:border-gray-800 bg-white dark:bg-gray-900"
            >
                <div className="flex gap-2">
                    <Input
                        className="flex-1"
                        placeholder="Type your message..."
                        value={input}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    <Button 
                        type="submit" 
                        disabled={isLoading || !input.trim()}
                        size="icon"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
}