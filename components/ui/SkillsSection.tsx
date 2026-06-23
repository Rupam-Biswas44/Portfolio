"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const NeuralNetworkCanvas = dynamic(() => import("../particles/NeuralNetworkCanvas"), { ssr: false });



const skillCategories = [
    {
        title: "LANGUAGES",
        color: "#00ffff",
        skills: ["Python", "C#", "SQL", "TypeScript", "Bash"],
    },
    {
        title: "ENGINES & FRAMEWORKS",
        color: "#9333ea",
        skills: [".NET Core", "FastAPI", "TensorFlow", "PyTorch", "Keras", "SignalR", "Docker", "Git"],
    },
    {
        title: "NEURAL ARCHITECTURES",
        color: "#00ffff",
        skills: ["Transformers", "LLMs", "RAG", "CNNs", "FAISS", "Attention", "GANs"],
    },
    {
        title: "DOMAIN PROTOCOLS",
        color: "#9333ea",
        skills: ["Medical Imaging", "Fintech Fraud Detection", "Semantic Search", "Real-Time Monitoring"],
    },
];

function SkillChip({ skill, color, index }: { skill: string; color: string; index: number }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.04, type: "spring" }}
            whileHover={{ scale: 1.1, y: -4 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                padding: "0.6rem 1.25rem",
                border: `1px solid ${hovered ? color : color + "44"}`,
                background: hovered ? `${color}18` : "transparent",
                color: hovered ? "#fff" : color + "cc",
                fontFamily: "monospace",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
                cursor: "default",
                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                borderRadius: "2px",
                overflow: "hidden",
                boxShadow: hovered ? `0 0 20px ${color}44, 0 0 40px ${color}22` : "none",
            }}
        >
            {/* Scanning bar */}
            {hovered && (
                <motion.div
                    initial={{ top: "-100%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                        filter: "blur(1px)",
                        zIndex: 10,
                    }}
                />
            )}
            {/* Energize pulse on hover */}
            {hovered && (
                <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: color + "09",
                    }}
                />
            )}
            {skill}
        </motion.div>
    );
}

function SkillCategory({ cat, index }: { cat: (typeof skillCategories)[0]; index: number }) {
    const ref = useRef(null);
    const catInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={catInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.12, type: "spring", stiffness: 60 }}
            style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Animated corner light */}
            <motion.div
                animate={{
                    opacity: [0, 0.8, 0],
                    x: ["-10%", "110%"],
                }}
                transition={{ duration: 3 + index, repeat: Infinity, delay: index * 0.7, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "30%",
                    height: "100%",
                    background: `linear-gradient(105deg, transparent, ${cat.color}08, transparent)`,
                    pointerEvents: "none",
                }}
            />

            {/* Rotating category ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + index * 5, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: `1px solid ${cat.color}22`,
                    pointerEvents: "none",
                }}
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15 + index * 3, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: `1px solid ${cat.color}44`,
                    pointerEvents: "none",
                }}
            />

            {/* Category Label with Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <motion.div
                    animate={{ scaleY: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    style={{ width: "4px", height: "1.2rem", background: cat.color, borderRadius: 2, boxShadow: `0 0 8px ${cat.color}` }}
                />
                <h3 style={{
                    color: cat.color,
                    fontSize: "0.8rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.3em",
                    margin: 0,
                    textTransform: "uppercase"
                }}>
                    {cat.title}
                </h3>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {cat.skills.map((s, si) => (
                    <SkillChip key={s} skill={s} color={cat.color} index={si} />
                ))}
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    return (
        <section
            id="skills"
            style={{
                background: "#000",
                padding: "10rem 1rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Neural Network background canvas */}
            <NeuralNetworkCanvas />


            {/* Radial pulse waves */}
            {[1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    animate={{
                        scale: [0.5, 2.5],
                        opacity: [0.3, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.3,
                        ease: "easeOut",
                    }}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: 300,
                        height: 300,
                        marginLeft: -150,
                        marginTop: -150,
                        borderRadius: "50%",
                        border: `1px solid ${i % 2 === 0 ? "#00ffff" : "#9333ea"}`,
                        boxShadow: `0 0 20px ${i % 2 === 0 ? "#00ffff" : "#9333ea"}44`,
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ textAlign: "center", marginBottom: "8rem", position: "relative", zIndex: 5 }}
            >
                <span style={{ color: "#00ffff", fontFamily: "monospace", letterSpacing: "0.5em", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    Neural Architecture
                </span>
                <h2 style={{ fontSize: "5rem", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    TECH.<span style={{ color: "#9333ea" }}>STACK</span>
                </h2>
            </motion.div>

            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
                    gap: "2rem",
                    position: "relative",
                    zIndex: 5,
                }}
            >
                {skillCategories.map((c, i) => (
                    <SkillCategory key={c.title} cat={c} index={i} />
                ))}
            </div>
        </section>
    );
}
