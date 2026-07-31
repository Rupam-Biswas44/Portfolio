"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function AIChatbot() {
    const { t } = useLanguage();
    const cb = t.chatbot;

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [pulsing, setPulsing] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Stop initial pulse after 8s
    useEffect(() => {
        const t = setTimeout(() => setPulsing(false), 8000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (messages.length > 0 || loading) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;
        const userMsg: Message = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    systemPrompt: cb.systemPrompt,
                }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply || data.error || "Error occurred." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Connection error. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") sendMessage(input);
    };

    return (
        <>
            {/* ── Floating Action Button (Chatbot trigger) ── */}
            <div
                style={{
                    position: "fixed",
                    bottom: "1.75rem",
                    right: "1.75rem",
                    zIndex: 999,
                    display: open ? "none" : "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                {/* Tooltip label — always visible, pulses until clicked */}
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={pulsing ? { opacity: [0.7, 1, 0.7], y: 0 } : { opacity: 1, y: 0 }}
                    transition={pulsing ? { duration: 2, repeat: Infinity } : { duration: 0.4 }}
                    style={{
                        background: "rgba(0,0,0,0.9)",
                        border: "1px solid rgba(0,255,255,0.3)",
                        color: "#00ffff",
                        fontFamily: "monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        padding: "0.3rem 0.75rem",
                        borderRadius: "3px",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    ✦ ASK RUPAM AI
                </motion.div>

                {/* Main circular button */}
                <motion.button
                    id="ask-rupam-chatbot-btn"
                    onClick={() => { setOpen(true); setPulsing(false); }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                        position: "relative",
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 35% 35%, #0ff5ff18, #000)",
                        border: "2px solid #00ffff",
                        boxShadow: "0 0 24px rgba(0,255,255,0.45), 0 0 60px rgba(0,255,255,0.12), inset 0 0 20px rgba(0,255,255,0.05)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                    animate={pulsing ? {
                        boxShadow: [
                            "0 0 24px rgba(0,255,255,0.45), 0 0 60px rgba(0,255,255,0.12)",
                            "0 0 40px rgba(0,255,255,0.8), 0 0 90px rgba(0,255,255,0.3)",
                            "0 0 24px rgba(0,255,255,0.45), 0 0 60px rgba(0,255,255,0.12)",
                        ],
                    } : {}}
                    transition={pulsing ? { duration: 2, repeat: Infinity } : {}}
                >
                    {/* Outer pulsing ring */}
                    {pulsing && (
                        <motion.div
                            animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                position: "absolute",
                                inset: "-6px",
                                borderRadius: "50%",
                                border: "2px solid #00ffff",
                                pointerEvents: "none",
                            }}
                        />
                    )}
                    {/* Second pulsing ring (offset) */}
                    {pulsing && (
                        <motion.div
                            animate={{ scale: [1, 1.45, 1.45], opacity: [0.4, 0, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                            style={{
                                position: "absolute",
                                inset: "-3px",
                                borderRadius: "50%",
                                border: "1px solid rgba(0,255,255,0.5)",
                                pointerEvents: "none",
                            }}
                        />
                    )}

                    {/* Brain / AI icon */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2a6 6 0 0 0-6 6c0 2.4 1.4 4.5 3.5 5.5V16h5v-2.5c2.1-1 3.5-3.1 3.5-5.5a6 6 0 0 0-6-6z"/>
                            <path d="M8.5 16h7M10 19h4M11 22h2"/>
                            <circle cx="9.5" cy="8.5" r="0.8" fill="#00ffff"/>
                            <circle cx="14.5" cy="8.5" r="0.8" fill="#00ffff"/>
                        </svg>
                        {/* Online status dot */}
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
                        />
                    </div>
                </motion.button>
            </div>


            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "fixed",
                            bottom: "2rem",
                            right: "2rem",
                            zIndex: 999,
                            width: "min(420px, calc(100vw - 2rem))",
                            maxHeight: "min(620px, 85vh)",
                            display: "flex",
                            flexDirection: "column",
                            background: "rgba(3,3,3,0.97)",
                            border: "1px solid rgba(0,255,255,0.25)",
                            borderRadius: "0.75rem",
                            overflow: "hidden",
                            boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(0,255,255,0.08)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        {/* CRT Overlay */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.18) 50%), linear-gradient(90deg, rgba(255,0,0,0.04), rgba(0,255,0,0.01), rgba(0,0,255,0.04))",
                            backgroundSize: "100% 4px, 3px 100%",
                            pointerEvents: "none",
                            zIndex: 10,
                            borderRadius: "0.75rem",
                        }} />

                        {/* Animated top border */}
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{
                                position: "absolute",
                                top: 0, left: 0, right: 0,
                                height: "1px",
                                background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
                                pointerEvents: "none",
                                zIndex: 11,
                            }}
                        />

                        {/* Header */}
                        <div style={{
                            padding: "1rem 1.25rem",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "rgba(0,255,255,0.03)",
                            position: "relative",
                            zIndex: 5,
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: "1.5rem", height: "1.5rem",
                                        border: "2px solid #00ffff",
                                        borderTopColor: "transparent",
                                        borderRadius: "50%",
                                    }}
                                />
                                <div>
                                    <div style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 900, color: "#00ffff", letterSpacing: "0.15em" }}>
                                        {cb.title}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                        <motion.div
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ duration: 1.2, repeat: Infinity }}
                                            style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px #4ade80" }}
                                        />
                                        <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#4ade80", letterSpacing: "0.15em" }}>
                                            {cb.subtitle}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                style={{
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#64748b",
                                    fontFamily: "monospace",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.1em",
                                    cursor: "pointer",
                                    padding: "0.3rem 0.6rem",
                                    borderRadius: "2px",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.borderColor = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "#64748b";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                }}
                            >
                                {cb.close} ✕
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            position: "relative",
                            zIndex: 5,
                            scrollbarWidth: "thin",
                            scrollbarColor: "#1e293b transparent",
                        }}>
                            {/* Welcome + suggestions */}
                            {messages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
                                >
                                    <div style={{
                                        fontFamily: "monospace",
                                        fontSize: "0.72rem",
                                        color: "#9ca3af",
                                        lineHeight: 1.6,
                                        padding: "0.75rem 1rem",
                                        background: "rgba(0,255,255,0.04)",
                                        border: "1px solid rgba(0,255,255,0.12)",
                                        borderRadius: "4px",
                                    }}>
                                        <span style={{ color: "#00ffff" }}>RUPAM_AI &gt;</span> {t.lang === "de" ? "Hallo! Ich bin Rupams KI-Assistent. Stell mir eine Frage oder wähle eine Option unten." : "Hello! I'm Rupam's AI assistant. Ask me anything or pick a suggestion below."}
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                        {cb.suggestions.map((s, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => sendMessage(s)}
                                                style={{
                                                    padding: "0.4rem 0.75rem",
                                                    background: "rgba(147,51,234,0.08)",
                                                    border: "1px solid rgba(147,51,234,0.3)",
                                                    color: "#a855f7",
                                                    fontFamily: "monospace",
                                                    fontSize: "0.6rem",
                                                    letterSpacing: "0.05em",
                                                    cursor: "pointer",
                                                    borderRadius: "3px",
                                                    textAlign: "left",
                                                    transition: "all 0.2s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(147,51,234,0.2)";
                                                    e.currentTarget.style.borderColor = "#9333ea";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(147,51,234,0.08)";
                                                    e.currentTarget.style.borderColor = "rgba(147,51,234,0.3)";
                                                }}
                                            >
                                                {s}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Chat messages */}
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        display: "flex",
                                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                                    }}
                                >
                                    <div style={{
                                        maxWidth: "85%",
                                        padding: "0.6rem 0.9rem",
                                        borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                                        background: msg.role === "user"
                                            ? "rgba(0,255,255,0.12)"
                                            : "rgba(147,51,234,0.08)",
                                        border: `1px solid ${msg.role === "user" ? "rgba(0,255,255,0.25)" : "rgba(147,51,234,0.2)"}`,
                                        fontFamily: "monospace",
                                        fontSize: "0.72rem",
                                        lineHeight: 1.6,
                                        color: msg.role === "user" ? "#e2e8f0" : "#cbd5e1",
                                        whiteSpace: "pre-wrap",
                                    }}>
                                        {msg.role === "assistant" && (
                                            <span style={{ color: "#00ffff", marginRight: "0.4rem", fontSize: "0.6rem" }}>
                                                RUPAM_AI &gt;
                                            </span>
                                        )}
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading indicator */}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ display: "flex", gap: "0.4rem", alignItems: "center", paddingLeft: "0.25rem" }}
                                >
                                    <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#00ffff" }}>RUPAM_AI &gt;</span>
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                            style={{ width: 5, height: 5, borderRadius: "50%", background: "#9333ea" }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input Area */}
                        <div style={{
                            padding: "0.75rem 1rem",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            gap: "0.5rem",
                            background: "rgba(0,0,0,0.5)",
                            position: "relative",
                            zIndex: 5,
                        }}>
                            <span style={{
                                fontFamily: "monospace",
                                fontSize: "0.7rem",
                                color: "#00ffff",
                                alignSelf: "center",
                                flexShrink: 0,
                            }}>
                                &gt;
                            </span>
                            <input
                                id="ask-rupam-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={cb.placeholder}
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    color: "#e2e8f0",
                                    fontFamily: "monospace",
                                    fontSize: "0.72rem",
                                    letterSpacing: "0.04em",
                                    caretColor: "#00ffff",
                                }}
                            />
                            <motion.button
                                id="ask-rupam-send-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => sendMessage(input)}
                                disabled={loading || !input.trim()}
                                style={{
                                    background: "transparent",
                                    border: "1px solid #00ffff",
                                    color: "#00ffff",
                                    fontFamily: "monospace",
                                    fontSize: "0.6rem",
                                    letterSpacing: "0.1em",
                                    cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                                    padding: "0.35rem 0.75rem",
                                    borderRadius: "2px",
                                    opacity: loading || !input.trim() ? 0.4 : 1,
                                    transition: "all 0.2s ease",
                                    flexShrink: 0,
                                }}
                            >
                                {cb.send}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
