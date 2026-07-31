"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
    {
        id: "LANG",
        label: "Languages",
        icon: "⌨",
        color: "#00ffff",
        skills: [
            { name: "Python", level: 95, years: "4yr", note: "Primary language. NumPy, Pandas, Scikit-learn." },
            { name: "C# / .NET", level: 82, years: "2yr", note: "Enterprise backends, SignalR, real-time systems." },
            { name: "SQL", level: 88, years: "4yr", note: "SQL Server, complex queries, stored procedures." },
            { name: "TypeScript", level: 72, years: "2yr", note: "Next.js, React, Node.js ecosystems." },
            { name: "Bash", level: 70, years: "3yr", note: "Linux automation, deployment scripts." },
        ],
    },
    {
        id: "FRAME",
        label: "Frameworks",
        icon: "⚙",
        color: "#9333ea",
        skills: [
            { name: "TensorFlow / Keras", level: 90, years: "3yr", note: "CNNs, image classification, transfer learning." },
            { name: "PyTorch", level: 78, years: "2yr", note: "Research models, custom training loops." },
            { name: ".NET Core", level: 82, years: "2yr", note: "REST APIs, SignalR, enterprise .NET." },
            { name: "FastAPI", level: 85, years: "2yr", note: "Python REST APIs, async, OpenAPI." },
            { name: "Streamlit", level: 88, years: "3yr", note: "ML dashboards, rapid prototyping." },
            { name: "Docker", level: 70, years: "2yr", note: "Containerisation, deployment pipelines." },
        ],
    },
    {
        id: "AI",
        label: "AI / ML",
        icon: "🧠",
        color: "#00ffff",
        skills: [
            { name: "LLMs & RAG", level: 90, years: "2yr", note: "OpenAI, FAISS, Sentence Transformers, vector DBs." },
            { name: "Transformers", level: 88, years: "2yr", note: "BERT, ViT, attention mechanisms, Hugging Face." },
            { name: "CNNs", level: 92, years: "3yr", note: "VGG, ResNet, EfficientNet, custom architectures." },
            { name: "Federated Learning", level: 75, years: "1yr", note: "Non-IID challenges, medical imaging research." },
            { name: "GANs", level: 70, years: "1yr", note: "Generative models, image synthesis." },
            { name: "Computer Vision", level: 88, years: "3yr", note: "Detection, segmentation, OCR pipelines." },
        ],
    },
    {
        id: "DOMAIN",
        label: "Domains",
        icon: "🏦",
        color: "#9333ea",
        skills: [
            { name: "Fintech Systems", level: 92, years: "2yr", note: "Banking monitoring, ATM reconciliation, production NDA." },
            { name: "Medical Imaging", level: 82, years: "2yr", note: "CT scan analysis, oncology AI, IEEE publications." },
            { name: "Semantic Search", level: 85, years: "2yr", note: "Vector indexing, embedding search, GenAI." },
            { name: "Real-Time Systems", level: 88, years: "2yr", note: "SignalR, live data pipelines, zero-latency monitoring." },
            { name: "Data Engineering", level: 80, years: "3yr", note: "ETL pipelines, Pandas, big data processing." },
        ],
    },
];

const learningItems = [
    { label: "PyTorch (Deep)", done: true, note: "Custom CUDA kernels, research loops" },
    { label: "LangGraph", done: true, note: "Graph-based LLM orchestration" },
    { label: "MCP (Model Context Protocol)", done: true, note: "Anthropic's agent-tool protocol" },
    { label: "AI Agents", done: true, note: "ReAct, tool-calling, memory patterns" },
    { label: "Multi-Agent Systems", done: false, note: "Swarms, hierarchical agents" },
    { label: "LlamaIndex", done: false, note: "Document indexing, knowledge graphs" },
    { label: "RLHF", done: false, note: "Reinforcement learning from human feedback" },
];

function SkillBar({ skill, color, index, isVisible }: {
    skill: typeof categories[0]["skills"][0];
    color: string;
    index: number;
    isVisible: boolean;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                marginBottom: "1.1rem",
                cursor: "default",
            }}
        >
            {/* Skill name + level row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "clamp(0.7rem, 2vw, 0.82rem)", color: hovered ? "#fff" : "#e2e8f0", transition: "color 0.2s" }}>
                        {skill.name}
                    </span>
                    <span style={{
                        fontFamily: "monospace", fontSize: "0.58rem", color: color,
                        border: `1px solid ${color}44`, padding: "0.05rem 0.35rem", borderRadius: "2px",
                        opacity: 0.8
                    }}>
                        {skill.years}
                    </span>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: color }}>{skill.level}%</span>
            </div>

            {/* Bar track */}
            <div style={{ height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden", position: "relative" }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${color}99, ${color})`,
                        borderRadius: "2px",
                        boxShadow: `0 0 8px ${color}66`,
                        position: "relative",
                    }}
                >
                    {/* Shimmer */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.3) 60%, transparent 80%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s infinite linear",
                    }} />
                </motion.div>
            </div>

            {/* Tooltip on hover */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "calc(100% + 4px)",
                            background: "rgba(5,5,20,0.95)",
                            border: `1px solid ${color}55`,
                            borderRadius: "4px",
                            padding: "0.4rem 0.75rem",
                            fontFamily: "monospace",
                            fontSize: "0.65rem",
                            color: "#94a3b8",
                            pointerEvents: "none",
                            zIndex: 20,
                            whiteSpace: "nowrap",
                            boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 12px ${color}22`,
                        }}
                    >
                        {skill.note}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function SkillsSection() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState(0);
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    const cat = categories[activeCategory];

    return (
        <section
            id="skills"
            ref={sectionRef}
            style={{
                background: "#000",
                padding: "clamp(4rem, 10vw, 10rem) 1rem",
                position: "relative",
                overflow: "hidden",
                zIndex: 1,
            }}
        >
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 5 }}
            >
                <span style={{ color: "#00ffff", fontFamily: "monospace", letterSpacing: "0.4em", fontSize: "0.7rem", textTransform: "uppercase" }}>
                    {t.skills.label}
                </span>
                <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    {t.skills.heading}<span style={{ color: "transparent", WebkitTextStroke: "2px #9333ea" }}>{t.skills.headingAccent}</span>
                </h2>
            </motion.div>

            <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 5 }}>
                {/* Main panel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    style={{
                        background: "rgba(5,5,15,0.85)",
                        border: "1px solid #1e293b",
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(0,255,255,0.04)",
                    }}
                >
                    {/* Terminal top bar */}
                    <div style={{
                        background: "#0f172a",
                        padding: "0.75rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        borderBottom: "1px solid #1e293b",
                    }}>
                        {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
                            <div key={i} style={{ width: "0.65rem", height: "0.65rem", borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                        ))}
                        <span style={{ marginLeft: "1rem", fontFamily: "monospace", fontSize: "0.6rem", color: "#475569", letterSpacing: "0.2em" }}>
                            SKILL_MATRIX.SYS — INTERACTIVE
                        </span>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "0.4rem", alignItems: "center" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse-dot 2s infinite" }} />
                            <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#22c55e" }}>ONLINE</span>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {/* Category Tabs */}
                        <div style={{
                            display: "flex",
                            borderBottom: "1px solid #1e293b",
                            overflowX: "auto",
                            scrollbarWidth: "none",
                        }}>
                            {categories.map((c, i) => (
                                <button
                                    key={c.id}
                                    onClick={() => setActiveCategory(i)}
                                    style={{
                                        flex: "1 1 auto",
                                        padding: "0.85rem 1.2rem",
                                        background: activeCategory === i ? `${c.color}12` : "transparent",
                                        border: "none",
                                        borderBottom: activeCategory === i ? `2px solid ${c.color}` : "2px solid transparent",
                                        color: activeCategory === i ? c.color : "#475569",
                                        fontFamily: "monospace",
                                        fontSize: "clamp(0.6rem, 2vw, 0.72rem)",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        cursor: "pointer",
                                        transition: "all 0.25s ease",
                                        whiteSpace: "nowrap",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "0.4rem",
                                    }}
                                >
                                    <span style={{ fontSize: "1rem" }}>{c.icon}</span>
                                    {c.label}
                                </button>
                            ))}
                        </div>

                        {/* Skills grid */}
                        <div style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Category header */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                                        <div style={{ width: "2.5rem", height: "1px", background: cat.color }} />
                                        <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: cat.color, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                                            {cat.id} — {cat.label}
                                        </span>
                                        <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${cat.color}44, transparent)` }} />
                                        <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#334155" }}>
                                            {cat.skills.length} MODULES
                                        </span>
                                    </div>

                                    {/* Two-column skill bar layout */}
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                                        gap: "0 3rem",
                                    }}>
                                        {cat.skills.map((skill, i) => (
                                            <SkillBar
                                                key={skill.name}
                                                skill={skill}
                                                color={cat.color}
                                                index={i}
                                                isVisible={inView}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Currently Learning Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.5 }}
                    style={{
                        marginTop: "2rem",
                        background: "rgba(5,5,15,0.8)",
                        border: "1px solid #00ffff22",
                        borderRadius: "0.75rem",
                        padding: "clamp(1.5rem, 4vw, 2rem)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Scan line effect */}
                    <div style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
                        animation: "scan-h 4s linear infinite",
                    }} />

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                        <div style={{ width: "1.5rem", height: "1px", background: "#00ffff" }} />
                        <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#00ffff", letterSpacing: "0.3em" }}>
                            {t.skills.currentlyLearning}
                        </span>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ffff", boxShadow: "0 0 10px #00ffff", animation: "pulse-dot 1.5s infinite" }} />
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                        {learningItems.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.6 + i * 0.07, type: "spring" }}
                                title={item.note}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.45rem 0.9rem",
                                    border: `1px solid ${item.done ? "#00ffff55" : "#33415588"}`,
                                    borderRadius: "4px",
                                    background: item.done ? "rgba(0,255,255,0.06)" : "rgba(255,255,255,0.02)",
                                    fontFamily: "monospace",
                                    fontSize: "0.72rem",
                                    color: item.done ? "#e2e8f0" : "#475569",
                                    cursor: "default",
                                    transition: "all 0.2s",
                                }}
                            >
                                <span style={{
                                    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                                    background: item.done ? "#00ffff" : "#334155",
                                    boxShadow: item.done ? "0 0 8px #00ffff" : "none",
                                    animation: item.done ? "pulse-dot 2s infinite" : "none",
                                }} />
                                {item.label}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
                @keyframes scan-h {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
}
