"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! Your business is already listed on SolarInstallersTX.com. Want to grab your free Verified badge and get bumped to the top of your city? Takes 2 minutes.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const autoOpenTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Auto-open after 45 seconds
  useEffect(() => {
    autoOpenTimerRef.current = setTimeout(() => {
      if (!open) setOpen(true);
    }, 45000);
    return () => clearTimeout(autoOpenTimerRef.current);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          sessionId,
          sourcePage: window.location.pathname,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Having trouble connecting — you can claim your badge at solarinstallerstx.com/claim-your-listing or call us anytime.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Chat with us"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-4rem)] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <div>
            <div className="font-semibold text-sm leading-tight">SolarInstallersTX</div>
            <div className="text-xs text-slate-400">Texas Solar Directory</div>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className="hover:bg-slate-700 rounded p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-orange-500 text-white rounded-br-sm"
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm shadow-sm px-3 py-2">
              <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-3 flex gap-2 bg-white flex-shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg px-3 py-2 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
