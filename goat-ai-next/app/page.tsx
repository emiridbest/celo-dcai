'use client';

import { useState } from 'react';
import { generateAIResponse } from '../lib/agent';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    try {
      const response = await generateAIResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-2xl space-y-4">
        <div className="h-[600px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
          {messages.map((message, i) => (
            <div key={i} className={`mb-4 ${message.role === 'assistant' ? 'text-blue-600' : 'text-gray-800'}`}>
              <strong>{message.role === 'assistant' ? 'AI: ' : 'You: '}</strong>
              <p>{message.content}</p>
            </div>
          ))}
          {loading && <div className="text-gray-400">AI is thinking...</div>}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Ask something..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}