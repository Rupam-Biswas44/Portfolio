"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const NeuralNetworkCanvas = dynamic(() => import("../particles/NeuralNetworkCanvas"), { ssr: false });



const projects = [
    {
        title: "AI POLICY CHATBOT",
        tagline: "FINANCIAL QA AGENT",
        desc: "Interactive chatbot answering questions on financial policy docs. FAISS + Sentence Transformers for semantic search, with optional OpenAI GPT orchestration.",
        tech: ["Python", "Streamlit", "FAISS", "OpenAI", "RAG"],
        color: "#00ffff",
        id: "PROT-CHAT-05",
        status: "DEPLOYED",
        link: "https://github.com/Rupam-Biswas44/AI-Policy-Chatbot.git",
        image: "/proj_ai_chatbot.png"
    },
    {
        title: "TRUST BANK MONITOR",
        tagline: "REAL-TIME TRANSACTION KERNEL",
        desc: "Critical production system for Trust Bank PLC. Managed real-time data flow between Linux backends and .NET frontends. Zero-latency monitoring via SignalR.",
        tech: ["Python", ".NET Core", "SQL Server", "SignalR", "Linux"],
        color: "#00ffff",
        id: "PROT-BANK-01",
        status: "PRODUCTION_LIVE",
        image: "/proj_bank_monitor.png"
    },
    {
        title: "MULTILINGUAL RAG",
        tagline: "NEURAL KNOWLEDGE RETRIEVAL",
        desc: "End-to-end RAG pipeline supporting English & Bengali. OCR integration, FAISS vector indexing, and OpenAI orchestration.",
        tech: ["FastAPI", "OpenAI", "FAISS", "Vector DB", "RAG"],
        color: "#9333ea",
        id: "PROT-RAG-02",
        status: "DEPLOYED",
        link: "https://github.com/Rupam-Biswas44/Multilingual-Retrieval-Augmented-Generation-RAG-System.git",
        image: "/proj_multilingual_rag.png"
    },
    {
        title: "CREDIT CARD FRAUD",
        tagline: "ANOMALY DETECTION",
        desc: "Neural anomaly detection system for credit card transactions identifying fraudulent patterns in high-dimensional financial data spaces.",
        tech: ["Jupyter", "Machine Learning", "Data Science", "Python"],
        color: "#9333ea",
        id: "PROT-FRD-06",
        status: "RESEARCH",
        link: "https://github.com/Rupam-Biswas44/Credit-Card-Fraud.git",
        image: "/proj_fraud_detection.png"
    },
    {
        title: "PLANT DISEASE AI",
        tagline: "CV + LLM DIAGNOSIS",
        desc: "Computer vision model identifying plant pathology. Integrated with Meta LLaMA for solution generation. Streamlit deployment.",
        tech: ["TensorFlow", "Keras", "LLaMA", "Streamlit"],
        color: "#00ffff",
        id: "PROT-AGRI-03",
        status: "ALPHA_BUILD",
        link: "https://github.com/Rupam-Biswas44/Plant-Disease-AI.git", // Assuming link
        image: "/proj_plant_disease.png"
    },
    {
        title: "SALARY PREDICTION",
        tagline: "ML REGRESSION MODEL",
        desc: "Predictive machine learning application utilizing regression algorithms to forecast salary ranges based on multiple professional features.",
        tech: ["Python", "HTML", "Flask", "Machine Learning"],
        color: "#00ffff",
        id: "PROT-SAL-07",
        status: "DEPLOYED",
        link: "https://github.com/Rupam-Biswas44/SALARY-PREDICTION.git",
        image: "/proj_salary_prediction.png"
    },
    {
        title: "GENAI SEARCH",
        tagline: "SEMANTIC RESOURCE FINDER",
        desc: "Fine-tuned Hugging Face models with attention mechanisms for semantic resource recommendation and learning path mapping.",
        tech: ["Hugging Face", "Transformers", "Attention", "LLMs"],
        color: "#9333ea",
        id: "PROT-SRCH-04",
        status: "RESEARCH",
        link: "https://github.com/Rupam-Biswas44/Local-Search-Engine.git",
        image: "/proj_genai_search.png"
    },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [hovered, setHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.85, y: 80 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: index * 0.15, type: "spring", stiffness: 60 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1200px", height: "100%" }}
        >
            <motion.div
                style={{ rotateX, rotateY, height: "100%", position: "relative", transformStyle: "preserve-3d" }}
            >
                {/* Card base with hover image integration */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(5,5,5,0.85)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${hovered ? project.color + "99" : project.color + "33"}`,
                    borderRadius: "1.5rem",
                    transition: "border-color 0.3s ease",
                    zIndex: -1,
                    overflow: "hidden"
                }}>
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        opacity: hovered ? 0.35 : 0.05,
                        transition: "opacity 0.5s ease",
                        zIndex: 0,
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)"
                    }}>
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        )}
                    </div>
                </div>

                {/* Plasma burst on hover */}
                <motion.div
                    animate={hovered ? {
                        opacity: [0.1, 0.35, 0.1],
                        scale: [0.9, 1.15, 0.9],
                    } : { opacity: 0.05, scale: 1 }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        inset: -20,
                        borderRadius: "2rem",
                        background: `radial-gradient(circle at 50% 50%, ${project.color}22, transparent 70%)`,
                        filter: "blur(10px)",
                        zIndex: 0,
                    }}
                />

                {/* Always-on rotating subtle ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + index * 2, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: "absolute",
                        inset: -2,
                        borderRadius: "1.6rem",
                        border: `1px solid transparent`,
                        borderTopColor: project.color + "66",
                        borderBottomColor: project.color + "33",
                        zIndex: 0,
                    }}
                />

                {/* Six corner sparks on hover */}
                {hovered && [
                    { top: -4, left: "20%", w: 60, h: 2 },
                    { top: -4, right: "20%", w: 60, h: 2 },
                    { bottom: -4, left: "20%", w: 60, h: 2 },
                    { bottom: -4, right: "20%", w: 60, h: 2 },
                ].map((pos, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                        style={{
                            position: "absolute",
                            ...pos,
                            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                            zIndex: 5,
                        }}
                    />
                ))}

                <div style={{ padding: "2.5rem", height: "100%", display: "flex", flexDirection: "column", transform: "translateZ(20px)", position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                        <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: project.color, letterSpacing: "0.2em" }}>{project.id}</p>
                        <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ padding: "0.2rem 0.6rem", border: `1px solid ${project.color}66`, borderRadius: "4px", fontSize: "0.55rem", color: project.color, fontFamily: "monospace", textTransform: "uppercase" }}
                        >
                            {project.status}
                        </motion.div>
                    </div>

                    <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 0.5rem 0" }}>{project.title}</h3>
                    <p style={{ color: project.color, fontSize: "0.75rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>{project.tagline}</p>

                    <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem", flex: 1 }}>{project.desc}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "auto", marginBottom: "1.5rem" }}>
                        {project.tech.map((t, ti) => (
                            <motion.span
                                key={t}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.15 + ti * 0.05 + 0.5 }}
                                whileHover={{
                                    background: project.color + "22",
                                    borderColor: project.color,
                                    color: "#fff",
                                    boxShadow: `0 0 10px ${project.color}44`,
                                }}
                                style={{ padding: "0.3rem 0.7rem", borderRadius: "4px", border: `1px solid #334155`, color: "#94a3b8", fontSize: "0.65rem", fontFamily: "monospace", cursor: "default", transition: "all 0.2s ease" }}
                            >
                                {t}
                            </motion.span>
                        ))}
                    </div>
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                color: project.color,
                                textDecoration: "none",
                                fontFamily: "monospace",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                transition: "all 0.3s ease",
                                padding: "0.8rem 1.5rem",
                                border: `1px solid ${project.color}`,
                                borderRadius: "4px",
                                width: "max-content",
                                background: hovered ? project.color + "22" : "transparent",
                                boxShadow: hovered ? `0 0 15px ${project.color}44` : "none"
                            }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>VIEW SOURCE</span>
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ProjectsSection() {
    return (
        <section
            style={{
                background: "#0a0a0a",
                padding: "clamp(4rem, 10vw, 10rem) 1rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Neural Network background canvas */}
            <NeuralNetworkCanvas />


            {/* Grid overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(rgba(147,51,234,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.03) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                pointerEvents: "none",
                zIndex: 1,
            }} />

            {/* Sweeping diagonal beam */}
            <motion.div
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "30%",
                    background: "linear-gradient(105deg, transparent 30%, rgba(147,51,234,0.04) 50%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: "center", marginBottom: "clamp(3rem, 8vw, 8rem)", position: "relative", zIndex: 5 }}
            >
                <span style={{ color: "#9333ea", fontFamily: "monospace", letterSpacing: "0.5em", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    Project Archives
                </span>
                <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    CORE.<span style={{ color: "#00ffff" }}>BUILDS</span>
                </h2>
            </motion.div>

            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                    gap: "1.5rem",
                    position: "relative",
                    zIndex: 5,
                }}
            >
                {projects.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                ))}
            </div>
        </section>
    );
}
