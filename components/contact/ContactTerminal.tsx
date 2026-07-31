"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const NeuralNetworkCanvas = dynamic(() => import("../particles/NeuralNetworkCanvas"), { ssr: false });

function Line({ line, delay, started }: { line: { text: string; color: string }; delay: number; started: boolean }) {
    const [visible, setVisible] = useState(false);
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        if (!started) return;
        const t = setTimeout(() => {
            setVisible(true);
            setGlitch(true);
            setTimeout(() => setGlitch(false), 150);
        }, delay * 100);
        return () => clearTimeout(t);
    }, [started, delay]);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            style={{
                fontFamily: "monospace",
                fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                lineHeight: 1.8,
                color: glitch ? "#ff00ff" : line.color,
                letterSpacing: "0.05em",
                whiteSpace: "pre-wrap",
                minHeight: "1.2rem",
                textShadow: glitch
                    ? "2px 0 #00ffff, -2px 0 #ff00ff"
                    : line.color === "#00ffff"
                        ? "0 0 8px #00ffff66"
                        : line.color === "#9333ea"
                            ? "0 0 8px #9333ea66"
                            : "none",
            }}
        >
            {line.text}
        </motion.div>
    );
}

// Interactive terminal command responses
function getCommandResponse(cmd: string, t: ReturnType<typeof useLanguage>["t"]): string | null {
    const c = cmd.trim().toLowerCase();
    if (c === "help") return t.contact.terminalHelp;
    if (c === "whoami") return "UID: RUPAM BISWAS | ROLE: AI ENGINEER / DATA SCIENCE | TU DORTMUND";
    if (c === "projects") return "PROT-CHAT-05 | PROT-BANK-01 | PROT-RAG-02 | PROT-FRD-06 | PROT-AGRI-03 | PROT-SAL-07 | PROT-SRCH-04";
    if (c === "education") return "B.E. COMP ENG, GTU, India (ICCR Scholarship) → M.Sc. DATA SCIENCE, TU Dortmund, Germany";
    if (c === "skills") return "Python | C# | .NET Core | FastAPI | TensorFlow | PyTorch | LLMs | RAG | FAISS | Docker";
    if (c === "hire" || c === "sudo hire rupam") return t.contact.terminalHired;
    if (c === "github") return "→ https://github.com/Rupam-Biswas44";
    if (c === "contact") return "📧 rupambiswasbd44@gmail.com | 📱 +49 1521 2378154";
    if (c === "download_cv" || c === "lebenslauf") return "→ Downloading /rupam_biswas_cv.pdf ...";
    if (c === "clear") return "__CLEAR__";
    return `Command not found: '${cmd}'. Type 'help' for available commands.`;
}

export default function ContactTerminal() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState("");
    const [commandHistory, setCommandHistory] = useState<{ cmd: string; response: string }[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const bottomRef = useRef<HTMLDivElement>(null);

    const terminalLines = t.contact.terminalLines;

    useEffect(() => {
        if (commandHistory.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [commandHistory]);

    const handleCommand = () => {
        const cmd = inputValue.trim();
        if (!cmd) return;
        const response = getCommandResponse(cmd, t);
        if (response === "__CLEAR__") {
            setCommandHistory([]);
        } else {
            setCommandHistory((prev) => [...prev, { cmd, response: response || "" }]);
        }
        setInputValue("");
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIdx = Math.min(historyIndex + 1, commandHistory.length - 1);
            setHistoryIndex(newIdx);
            setInputValue(commandHistory[commandHistory.length - 1 - newIdx]?.cmd || "");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const newIdx = Math.max(historyIndex - 1, -1);
            setHistoryIndex(newIdx);
            setInputValue(newIdx === -1 ? "" : commandHistory[commandHistory.length - 1 - newIdx]?.cmd || "");
        }
    };

    return (
        <section
            id="contact"
            style={{
                background: "#000",
                padding: "clamp(4rem, 10vw, 10rem) 1rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Neural Network background canvas */}
            <NeuralNetworkCanvas />
            {/* Halo rings pulsing from center */}
            {[1, 2, 3, 4].map(i => (
                <motion.div
                    key={i}
                    animate={{ scale: [0.3, 2.5], opacity: [0.25, 0] }}
                    transition={{ duration: 5, delay: i * 1.2, repeat: Infinity, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: 200,
                        height: 200,
                        marginLeft: -100,
                        marginTop: -100,
                        borderRadius: "50%",
                        border: `1px solid #9333ea`,
                        boxShadow: "0 0 30px #9333ea44",
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />
            ))}

            {/* Background glow */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(147,51,234,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 1,
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                style={{ textAlign: "center", marginBottom: "6rem", position: "relative", zIndex: 5 }}
            >
                <span style={{ color: "#00ffff", fontFamily: "monospace", letterSpacing: "0.5em", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    {t.contact.label}
                </span>
                <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    {t.contact.heading}<span style={{ color: "transparent", WebkitTextStroke: "2px #9333ea" }}>{t.contact.headingAccent}</span>
                </h2>
            </motion.div>

            <div ref={containerRef} style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 5 }}>
                {/* Terminal Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 40 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, type: "spring", stiffness: 60 }}
                    style={{
                        background: "rgba(5,5,5,0.9)",
                        border: "1px solid #1e293b",
                        boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(0,255,255,0.06), 0 0 120px rgba(147,51,234,0.04)",
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    {/* Animated border gradient */}
                    <motion.div
                        animate={{ opacity: [0.3, 0.8, 0.3], boxShadow: ["inset 0 0 30px rgba(0,255,255,0.03)", "inset 0 0 50px rgba(0,255,255,0.08)", "inset 0 0 30px rgba(0,255,255,0.03)"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ position: "absolute", inset: 0, borderRadius: "0.5rem", border: "1px solid rgba(0,255,255,0.1)", pointerEvents: "none", zIndex: 0 }}
                    />

                    {/* Top Bar */}
                    <div style={{ background: "#1e293b44", padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", borderBottom: "1px solid #1e293b" }}>
                        {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                style={{ width: "0.7rem", height: "0.7rem", borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }}
                            />
                        ))}
                        <div style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: "0.6rem", color: "#64748b", letterSpacing: "0.2em" }}>
                            REMOTE_CONNECTION: ACTIVE
                        </div>
                        <motion.div
                            animate={{ opacity: [1, 0, 1], scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
                        />
                    </div>

                    {/* CRT Overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 4px, 3px 100%", pointerEvents: "none", zIndex: 10 }} />

                    {/* Scan line */}
                    <motion.div
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ position: "absolute", left: 0, right: 0, height: "30px", background: "linear-gradient(to bottom, transparent, rgba(0,255,255,0.03), transparent)", pointerEvents: "none", zIndex: 11 }}
                    />

                    {/* Terminal Body */}
                    <div
                        style={{ padding: "clamp(1rem, 4vw, 2.5rem)", minHeight: "400px", position: "relative", zIndex: 5, cursor: "text" }}
                        onClick={() => inputRef.current?.focus()}
                    >
                        {/* Boot lines */}
                        {terminalLines.map((line, i) => (
                            <Line key={i} line={line} delay={i * 2} started={inView} />
                        ))}

                        {/* Interactive command history */}
                        <AnimatePresence>
                            {commandHistory.map((entry, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{ marginTop: "0.25rem" }}
                                >
                                    <div style={{ fontFamily: "monospace", fontSize: "clamp(0.7rem, 2vw, 0.85rem)", color: "#00ffff", letterSpacing: "0.05em" }}>
                                        &gt; {entry.cmd}
                                    </div>
                                    <div style={{ fontFamily: "monospace", fontSize: "clamp(0.7rem, 2vw, 0.85rem)", color: entry.response.includes("ACCESS GRANTED") ? "#4ade80" : "#9ca3af", letterSpacing: "0.03em", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                                        {entry.response}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Interactive Input Line */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                            <span style={{ fontFamily: "monospace", fontSize: "clamp(0.7rem, 2vw, 0.85rem)", color: "#00ffff", letterSpacing: "0.05em", flexShrink: 0 }}>
                                &gt;
                            </span>
                            <input
                                ref={inputRef}
                                id="terminal-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t.contact.placeholder}
                                style={{
                                    flex: 1,
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    color: "#e2e8f0",
                                    fontFamily: "monospace",
                                    fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
                                    letterSpacing: "0.04em",
                                    caretColor: "#00ffff",
                                    minWidth: 0,
                                }}
                            />
                            {/* Blinking Cursor */}
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                style={{ display: "inline-block", width: "0.6rem", height: "1.1rem", background: "#00ffff", marginLeft: "0.1rem", flexShrink: 0, boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff66" }}
                            />
                        </div>
                        <div ref={bottomRef} />
                    </div>
                </motion.div>

                {/* Action Button — original */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 4.5, duration: 1 }}
                    style={{ textAlign: "center", marginTop: "4rem" }}
                >
                    <motion.a
                        href="mailto:rupambiswasbd44@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            position: "relative",
                            display: "inline-block",
                            padding: "1rem 3rem",
                            background: "transparent",
                            border: "1px solid #00ffff",
                            color: "#00ffff",
                            fontFamily: "monospace",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            fontSize: "0.8rem",
                            textDecoration: "none",
                            borderRadius: "2px",
                            overflow: "hidden",
                        }}
                    >
                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                            style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.15), transparent)", pointerEvents: "none" }}
                        />
                        {t.contact.sendButton}
                    </motion.a>
                </motion.div>

                {/* Mission Status / Better CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 5.5, duration: 0.8 }}
                    style={{
                        marginTop: "4rem",
                        padding: "2rem",
                        background: "rgba(0,0,0,0.7)",
                        border: "1px solid rgba(74,222,128,0.2)",
                        borderRadius: "0.5rem",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Green scan */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.04), transparent)", pointerEvents: "none" }}
                    />

                    <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#4ade80", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center" }}>
                        {t.contact.missionStatus}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", marginBottom: "2rem" }}>
                        <motion.div
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                        >
                            <motion.div animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px #4ade80" }} />
                            <span style={{ fontFamily: "monospace", fontSize: "clamp(0.7rem, 2vw, 0.9rem)", color: "#fff", letterSpacing: "0.1em" }}>{t.contact.available}</span>
                        </motion.div>
                        <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.15em" }}>{t.contact.responseTime}</span>
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
                        <a
                            href="/rupam_biswas_cv.pdf"
                            download
                            id="download-cv-btn"
                            style={{
                                padding: "0.65rem 1.5rem",
                                background: "#4ade80",
                                color: "#000",
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textDecoration: "none",
                                borderRadius: "2px",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#22c55e"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#4ade80"; }}
                        >
                            ↓ {t.contact.downloadCV}
                        </a>
                        <a
                            href="https://linkedin.com/in/rupam-biswas-7788891a7"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="linkedin-cta-btn"
                            style={{
                                padding: "0.65rem 1.25rem",
                                border: "1px solid #0077b5",
                                color: "#0077b5",
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                letterSpacing: "0.15em",
                                textDecoration: "none",
                                borderRadius: "2px",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,119,181,0.15)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                        >
                            {t.contact.scheduleInterview}
                        </a>
                        <a
                            href="https://github.com/Rupam-Biswas44"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="github-cta-btn"
                            style={{
                                padding: "0.65rem 1.25rem",
                                border: "1px solid rgba(255,255,255,0.15)",
                                color: "#9ca3af",
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                letterSpacing: "0.15em",
                                textDecoration: "none",
                                borderRadius: "2px",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                        >
                            GitHub
                        </a>
                        <a
                            href="mailto:rupambiswasbd44@gmail.com"
                            id="email-cta-btn"
                            style={{
                                padding: "0.65rem 1.25rem",
                                border: "1px solid rgba(0,255,255,0.3)",
                                color: "#00ffff",
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                letterSpacing: "0.15em",
                                textDecoration: "none",
                                borderRadius: "2px",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,255,0.1)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                        >
                            Email
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

