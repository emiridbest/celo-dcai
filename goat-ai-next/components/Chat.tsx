"use client";

import { useChat } from "ai/react";
import { Input } from "./ui/input";

export default function Chat() {
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
	} = useChat();

	return (
		<div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
			{messages.map((m) => (
				<div key={m.id} className="whitespace-pre-wrap">
					{m.role === "user" ? "User: " : "AI: "}
					{m.content}
				</div>
			))}

			<form onSubmit={handleSubmit}>
				<Input
					className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
					placeholder="Say Something..."
					value={input}
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
