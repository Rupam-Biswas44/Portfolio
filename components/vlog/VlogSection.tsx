"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const posts = [
    {
        id: "BYTE-001",
        date: "JUL 2026",
        tag: "MULTI-AGENT SYSTEMS",
        tagColor: "#00ffff",
        title: "The Day I Stopped Thinking in Single Agents",
        excerpt: "I spent the last three months building with LangGraph and something shifted in how I think about AI. A single LLM trying to do everything is like asking one person to be the analyst, the coder, the reviewer, and the deployer — simultaneously. It breaks down. What actually works is specialisation.",
        body: `I spent the last three months building with LangGraph and something shifted in how I think about AI.

A single LLM trying to do everything is like asking one person to be the analyst, the coder, the reviewer, and the deployer — simultaneously. It breaks down. What actually works is specialisation.

LangGraph lets you define a graph of agents — each with a focused role, tools, and memory. A "Planner" breaks down the task. A "Coder" writes the solution. A "Critic" reviews it. A "Deployer" pushes it. The magic is in the edges: how state flows between nodes, how agents hand off context, how cycles enable self-correction.

What surprised me most was how naturally this maps onto real software teams. It's not science fiction. It's software architecture — just for agents.

I'm currently combining this with MCP (Anthropic's Model Context Protocol) for standardised tool interfaces. The idea: an agent shouldn't care whether it's calling a local function or a remote API — it should just call a "tool" and get a result. MCP makes that contract explicit.

Where I'm going next: hierarchical agents where a top-level orchestrator spawns sub-agents dynamically based on task complexity. Think MapReduce, but for language models.`,
        readTime: "4 min read",
    },
    {
        id: "BYTE-002",
        date: "JUN 2026",
        tag: "PYTORCH",
        tagColor: "#9333ea",
        title: "Why I'm Going Deeper Into PyTorch After Production",
        excerpt: "Coming from TensorFlow in production, PyTorch felt like switching from a formal office environment to a research garage. More chaotic, more powerful. The reason I'm investing in it now: PyTorch is where the research happens first.",
        body: `Coming from TensorFlow in production, PyTorch felt like switching from a formal office environment to a research garage. More chaotic, more powerful.

The reason I'm investing in it now: PyTorch is where the research happens first. Nearly every paper I read on arXiv has a PyTorch implementation. If I want to reproduce RLHF, implement a custom attention variant, or train a small diffusion model, I need PyTorch at my fingertips — not a TensorFlow port that lags six months behind.

What I love most is the pythonic training loop. There's no magic. You write forward(), you compute loss, you call loss.backward(), you call optimizer.step(). That's it. You see every gradient update. When things break, you know exactly where.

For my research work (federated learning, medical imaging), the flexibility matters. Our LungNet-CAM paper uses custom attention gates that we couldn't express cleanly in Keras. In PyTorch, it's just subclassing nn.Module.

Currently working on: implementing a custom DataLoader for our Non-IID federated learning setup, and experimenting with torch.compile() for training speed-ups.`,
        readTime: "3 min read",
    },
    {
        id: "BYTE-003",
        date: "MAY 2026",
        tag: "BANKING SYSTEMS",
        tagColor: "#00ffff",
        title: "What Production Banking Taught Me That University Didn't",
        excerpt: "Two banks. Zero tolerance for errors. 200+ ATMs reconciling overnight. Working at Data Edge Ltd was my most intense engineering experience — not because the code was complex, but because the stakes were real.",
        body: `Two banks. Zero tolerance for errors. 200+ ATMs reconciling overnight.

Working at Data Edge Ltd was my most intense engineering experience — not because the code was complex, but because the stakes were real.

The Trust Bank real-time monitoring system had to track every transaction in flight between Linux backends and .NET frontends. A missed event meant an unrecorded transaction. At a bank, that's not a bug — that's a compliance failure. We used SignalR for push notifications and SQL Server for the transaction ledger, with Python scripts handling the reconciliation logic between systems.

The BRAC Bank ATM reconciliation was different: batch processing, but with hard deadlines. The overnight batch had to close before the morning shift started. If it didn't — human intervention, manual audits, angry management calls.

What university doesn't teach: the difference between code that's correct and code that's correct under failure. Error handling isn't about catching exceptions. It's about knowing what state the world is in when something goes wrong — and making sure you can recover from it safely.

Three things I carry from that job into every system I build: explicit error states, idempotent operations, and observable side-effects.`,
        readTime: "5 min read",
    },
];

function PostCard({ post, index }: { post: typeof posts[0]; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.article
            ref={ref}
            id={post.id}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 50 }}
            style={{
                background: "rgba(5,5,15,0.85)",
                border: `1px solid ${expanded ? post.tagColor + "44" : "#1e293b"}`,
                borderRadius: "0.75rem",
                overflow: "hidden",
                transition: "border-color 0.4s ease",
                boxShadow: expanded ? `0 0 60px ${post.tagColor}11` : "none",
            }}
        >
            {/* Top accent bar */}
            <div style={{ height: "2px", background: `linear-gradient(90deg, ${post.tagColor}, transparent)` }} />

            <div style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                {/* Header row */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.58rem", color: "#475569", letterSpacing: "0.2em" }}>
                        {post.id}
                    </span>
                    <span style={{
                        fontFamily: "monospace", fontSize: "0.6rem", color: post.tagColor,
                        border: `1px solid ${post.tagColor}44`, padding: "0.15rem 0.6rem", borderRadius: "2px",
                        background: `${post.tagColor}0a`,
                    }}>
                        {post.tag}
                    </span>
                    <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#334155", marginLeft: "auto" }}>
                        {post.date} · {post.readTime}
                    </span>
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                    fontWeight: 800,
                    color: "#f1f5f9",
                    lineHeight: 1.3,
                    letterSpacing: "-0.02em",
                    marginBottom: "1rem",
                }}>
                    {post.title}
                </h3>

                {/* Excerpt or full body */}
                <div style={{
                    color: "#94a3b8",
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    lineHeight: 1.8,
                    marginBottom: "1.5rem",
                }}>
                    {expanded ? (
                        <div style={{ whiteSpace: "pre-line" }}>{post.body}</div>
                    ) : (
                        <p style={{ margin: 0 }}>{post.excerpt}</p>
                    )}
                </div>

                {/* Read more / collapse button */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    style={{
                        background: "transparent",
                        border: `1px solid ${post.tagColor}55`,
                        color: post.tagColor,
                        fontFamily: "monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        padding: "0.5rem 1.25rem",
                        cursor: "pointer",
                        borderRadius: "2px",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${post.tagColor}14`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                    <span>{expanded ? "▲ COLLAPSE" : "▼ READ_FULL"}</span>
                </button>
            </div>
        </motion.article>
    );
}

export default function VlogSection() {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="vlog"
            ref={sectionRef}
            style={{
                background: "#050510",
                padding: "clamp(4rem, 10vw, 10rem) 1rem",
                position: "relative",
                overflow: "hidden",
                zIndex: 1,
            }}
        >
            {/* Background grid */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(rgba(0,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.015) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                pointerEvents: "none",
            }} />

            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{ textAlign: "center", marginBottom: "5rem", position: "relative", zIndex: 5 }}
            >
                <span style={{ color: "#9333ea", fontFamily: "monospace", letterSpacing: "0.4em", fontSize: "0.7rem", textTransform: "uppercase" }}>
                    {t.vlog?.label ?? "Dev Thoughts"}
                </span>
                <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    {t.vlog?.heading ?? "BYTES."}<span style={{ color: "transparent", WebkitTextStroke: "2px #00ffff" }}>{t.vlog?.headingAccent ?? "LOG"}</span>
                </h2>
                <p style={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.1em", maxWidth: "500px", margin: "0 auto" }}>
                    {t.vlog?.subheading ?? "Raw thoughts from the terminal. No polish. Just signal."}
                </p>
            </motion.div>

            {/* Post list */}
            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 5 }}>
                {posts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                ))}
            </div>
        </section>
    );
}
