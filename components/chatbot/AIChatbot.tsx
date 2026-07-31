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
    const [avatarVisible, setAvatarVisible] = useState(false);
    const [avatarDismissed, setAvatarDismissed] = useState(false);
    const [typedText, setTypedText] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const BUBBLE_TEXT = "Got a question? I know everything about Rupam 🧠";

    // Stop initial pulse after 8s
    useEffect(() => {
        const t = setTimeout(() => setPulsing(false), 8000);
        return () => clearTimeout(t);
    }, []);

    // Wake up avatar after 3 seconds
    useEffect(() => {
        const t = setTimeout(() => setAvatarVisible(true), 3000);
        return () => clearTimeout(t);
    }, []);

    // Typewriter effect for bubble text
    useEffect(() => {
        if (!avatarVisible || avatarDismissed) return;
        let i = 0;
        setTypedText("");
        const interval = setInterval(() => {
            i++;
            setTypedText(BUBBLE_TEXT.slice(0, i));
            if (i >= BUBBLE_TEXT.length) clearInterval(interval);
        }, 35);
        return () => clearInterval(interval);
    }, [avatarVisible, avatarDismissed]);

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

            {/* ═══════════════ AVATAR WAKE-UP ═══════════════ */}
            <AnimatePresence>
                {!open && avatarVisible && !avatarDismissed && (
                    <motion.div
                        key="avatar-widget"
                        initial={{ y: 120, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 120, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        style={{
                            position: "fixed",
                            bottom: "1.5rem",
                            right: "1.5rem",
                            zIndex: 999,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "0.6rem",
                            pointerEvents: "none",
                        }}
                    >
                        {/* Speech bubble */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
                            style={{
                                background: "rgba(3,3,14,0.95)",
                                border: "1px solid rgba(0,255,255,0.35)",
                                borderRadius: "12px 12px 4px 12px",
                                padding: "0.75rem 1rem",
                                maxWidth: "220px",
                                position: "relative",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(0,255,255,0.08)",
                                backdropFilter: "blur(16px)",
                                pointerEvents: "auto",
                                cursor: "pointer",
                            }}
                            onClick={() => { setOpen(true); setAvatarDismissed(true); }}
                        >
                            {/* Dismiss X */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setAvatarDismissed(true); }}
                                style={{
                                    position: "absolute",
                                    top: "0.35rem",
                                    right: "0.4rem",
                                    background: "none",
                                    border: "none",
                                    color: "#475569",
                                    fontSize: "0.7rem",
                                    cursor: "pointer",
                                    lineHeight: 1,
                                    padding: "0.1rem 0.25rem",
                                }}
                            >✕</button>

                            {/* Who's talking label */}
                            <div style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#00ffff", letterSpacing: "0.2em", marginBottom: "0.4rem", opacity: 0.7 }}>
                                RUPAM.AI
                            </div>

                            {/* Typewriter text */}
                            <p style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#e2e8f0", lineHeight: 1.5, margin: 0 }}>
                                {typedText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                    style={{ color: "#00ffff" }}
                                >▌</motion.span>
                            </p>

                            {/* CTA hint */}
                            <div style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#00ffff", marginTop: "0.5rem", opacity: 0.6 }}>
                                tap to chat →
                            </div>
                        </motion.div>

                        {/* Avatar body */}
                        <motion.div
                            style={{
                                display: "flex",
                                alignItems: "flex-end",
                                gap: "0",
                                pointerEvents: "auto",
                                cursor: "pointer",
                            }}
                            onClick={() => { setOpen(true); setAvatarDismissed(true); }}
                        >
                            {/* Waving arm (left side) */}
                            <motion.div
                                animate={{ rotate: [-10, 30, -10] }}
                                transition={{ duration: 0.7, repeat: 5, ease: "easeInOut" }}
                                style={{ transformOrigin: "bottom right", marginRight: "-4px", marginBottom: "14px" }}
                            >
                                <svg width="18" height="28" viewBox="0 0 18 28">
                                    <rect x="3" y="0" width="10" height="28" rx="5" fill="#1e293b" stroke="#00ffff" strokeWidth="1.5"/>
                                    <circle cx="8" cy="4" r="3" fill="#00ffff" opacity="0.3"/>
                                </svg>
                            </motion.div>

                            {/* Robot body */}
                            <div style={{ position: "relative" }}>
                                {/* Glow under avatar */}
                                <div style={{
                                    position: "absolute",
                                    bottom: -6, left: "50%",
                                    transform: "translateX(-50%)",
                                    width: 60, height: 12,
                                    background: "rgba(0,255,255,0.25)",
                                    borderRadius: "50%",
                                    filter: "blur(6px)",
                                }} />

                                <svg width="72" height="88" viewBox="0 0 72 88" fill="none">
                                    {/* Antenna */}
                                    <line x1="36" y1="4" x2="36" y2="14" stroke="#00ffff" strokeWidth="2"/>
                                    <motion.circle
                                        cx="36" cy="4" r="3"
                                        fill="#00ffff"
                                        animate={{ opacity: [1, 0.3, 1], r: [3, 4, 3] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                    />

                                    {/* Head */}
                                    <rect x="14" y="14" width="44" height="32" rx="8" fill="#0f172a" stroke="#00ffff" strokeWidth="1.5"/>

                                    {/* Eyes */}
                                    <motion.rect
                                        x="21" y="24" width="10" height="7" rx="2"
                                        fill="#00ffff"
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                                    />
                                    <motion.rect
                                        x="41" y="24" width="10" height="7" rx="2"
                                        fill="#00ffff"
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                                    />

                                    {/* Smile */}
                                    <path d="M26 37 Q36 44 46 37" stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

                                    {/* Neck */}
                                    <rect x="30" y="46" width="12" height="6" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1"/>

                                    {/* Body */}
                                    <rect x="10" y="52" width="52" height="30" rx="8" fill="#0f172a" stroke="#9333ea" strokeWidth="1.5"/>

                                    {/* Chest panel */}
                                    <rect x="20" y="60" width="32" height="14" rx="4" fill="#0a0a1a" stroke="#00ffff" strokeWidth="1" opacity="0.8"/>
                                    <motion.circle cx="28" cy="67" r="3" fill="#4ade80"
                                        animate={{ opacity: [1, 0.3, 1] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                    />
                                    <motion.circle cx="36" cy="67" r="3" fill="#00ffff"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                    />
                                    <motion.circle cx="44" cy="67" r="3" fill="#9333ea"
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />

                                    {/* Legs */}
                                    <rect x="18" y="82" width="14" height="6" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
                                    <rect x="40" y="82" width="14" height="6" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
                                </svg>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Compact FAB (shown after avatar dismissed or before avatar appears) ── */}
            {!open && (avatarDismissed || !avatarVisible) && (
                <div style={{
                    position: "fixed",
                    bottom: "1.75rem",
                    right: "1.75rem",
                    zIndex: 999,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={pulsing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                        transition={pulsing ? { duration: 2, repeat: Infinity } : { duration: 0.4 }}
                        style={{ background: "rgba(0,0,0,0.9)", border: "1px solid rgba(0,255,255,0.3)", color: "#00ffff", fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.15em", padding: "0.3rem 0.75rem", borderRadius: "3px", whiteSpace: "nowrap", pointerEvents: "none" }}
                    >✦ ASK RUPAM AI</motion.div>

                    <motion.button
                        id="ask-rupam-chatbot-btn"
                        onClick={() => { setOpen(true); setPulsing(false); }}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.92 }}
                        style={{ position: "relative", width: "64px", height: "64px", borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #0ff5ff18, #000)", border: "2px solid #00ffff", boxShadow: "0 0 24px rgba(0,255,255,0.45), 0 0 60px rgba(0,255,255,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        animate={pulsing ? { boxShadow: ["0 0 24px rgba(0,255,255,0.45)", "0 0 40px rgba(0,255,255,0.8)", "0 0 24px rgba(0,255,255,0.45)"] } : {}}
                        transition={pulsing ? { duration: 2, repeat: Infinity } : {}}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a6 6 0 0 0-6 6c0 2.4 1.4 4.5 3.5 5.5V16h5v-2.5c2.1-1 3.5-3.1 3.5-5.5a6 6 0 0 0-6-6z"/>
                                <path d="M8.5 16h7M10 19h4M11 22h2"/>
                                <circle cx="9.5" cy="8.5" r="0.8" fill="#00ffff"/>
                                <circle cx="14.5" cy="8.5" r="0.8" fill="#00ffff"/>
                            </svg>
                            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                        </div>
                    </motion.button>
                </div>
            )}


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
