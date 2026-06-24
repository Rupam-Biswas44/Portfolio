"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const NeuralNetworkCanvas = dynamic(() => import("../particles/NeuralNetworkCanvas"), { ssr: false });



const papers = [
    {
        title: "LUNGNET-CAM: HYBRID CONVOLUTION & ATTENTION",
        venue: "IEEE QPAIN 2026 // MEDICAL AI",
        status: "STATUS: ACCEPTED",
        id: "LAB-RES-001",
        color: "#00ffff",
        icon: "🫁",
        abstract: "A high-precision framework for CT-based lung cancer detection using custom attention gates and ensemble convolution layers.",
    },
    {
        title: "RESOURCE-EFFICIENT FEDERATED LEARNING",
        venue: "SPICSCON 2026 // DISTRIBUTED ML",
        status: "STATUS: UNDER_REVIEW",
        id: "LAB-RES-002",
        color: "#9333ea",
        icon: "🧬",
        abstract: "Addressing Non-IID data distribution challenges in tumor classification through attention-ensemble CNN units and federated aggregation.",
    },
];

function PaperCard({ paper, index }: { paper: (typeof papers)[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: index * 0.25, type: "spring", stiffness: 50 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                background: "rgba(3,3,3,0.85)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${hovered ? paper.color + "88" : "rgba(255,255,255,0.05)"}`,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                alignItems: "flex-start",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
                overflow: "hidden",
                boxShadow: hovered ? `0 40px 80px rgba(0,0,0,0.5), 0 0 60px ${paper.color}22` : "0 20px 40px rgba(0,0,0,0.3)",
            }}
        >
            {/* Lightning arc effect on hover */}
            {hovered && (
                <>
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            animate={{
                                opacity: [0, 1, 0, 1, 0],
                                scaleX: [0.5, 1, 0.8, 1, 0.5],
                            }}
                            transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.1 }}
                            style={{
                                position: "absolute",
                                top: `${20 + i * 30}%`,
                                left: 0,
                                right: 0,
                                height: 1,
                                background: `linear-gradient(90deg, transparent, ${paper.color}66, transparent)`,
                                filter: "blur(1px)",
                                pointerEvents: "none",
                                zIndex: 0,
                            }}
                        />
                    ))}
                </>
            )}

            {/* Full-panel radial glow */}
            <motion.div
                animate={hovered ? {
                    opacity: [0.1, 0.4, 0.1],
                    scale: [0.8, 1.2, 0.8],
                } : { opacity: 0.04, scale: 1 }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 10% 50%, ${paper.color}1a, transparent 60%)`,
                    zIndex: 0,
                }}
            />

            {/* Persistent slow-scanning border */}
            <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 4 + index, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "15%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${paper.color}0a, transparent)`,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            {/* Numerical ID */}
            <div style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontFamily: "monospace",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.2em"
            }}>
                {paper.id}
            </div>

            {/* Icon Capsule */}
            <motion.div
                animate={hovered ? {
                    boxShadow: [`0 0 20px ${paper.color}33`, `0 0 60px ${paper.color}66`, `0 0 20px ${paper.color}33`],
                    scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    flexShrink: 0,
                    width: "4.5rem",
                    height: "4.5rem",
                    background: "rgba(0,0,0,0.5)",
                    border: `2px solid ${paper.color}44`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    transition: "all 0.4s ease",
                    zIndex: 1,
                    position: "relative",
                }}
            >
                {paper.icon}
                {/* Rotating ring around icon */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: "absolute",
                        inset: -6,
                        borderRadius: "50%",
                        border: `1px solid ${paper.color}44`,
                        borderTopColor: paper.color,
                    }}
                />
            </motion.div>

            <div style={{ flex: 1, zIndex: 1 }}>
                <div style={{
                    display: "inline-block",
                    padding: "0.2rem 0.75rem",
                    background: `${paper.color}22`,
                    color: paper.color,
                    fontSize: "0.6rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.15em",
                    marginBottom: "1rem",
                    borderRadius: "2px"
                }}>
                    {paper.status}
                </div>

                <h3 style={{
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    color: "#fff",
                    margin: "0 0 0.5rem 0",
                    letterSpacing: "-0.01em"
                }}>
                    {paper.title}
                </h3>

                <p style={{
                    color: paper.color,
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    marginBottom: "1.5rem"
                }}>
                    {paper.venue}
                </p>

                <p style={{
                    color: "#9ca3af",
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    lineHeight: 1.7,
                    margin: 0,
                }}>
                    {paper.abstract}
                </p>
            </div>

            {/* Arrow */}
            <motion.div
                animate={{ x: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
                style={{ fontSize: "1.5rem", color: paper.color, zIndex: 1 }}
            >
                ⇉
            </motion.div>
        </motion.div>
    );
}

export default function ResearchSection() {
    return (
        <section
            id="research"
            style={{
                background: "#000",
                padding: "clamp(4rem, 10vw, 10rem) 1rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Neural Network background canvas */}
            <NeuralNetworkCanvas />


            {/* Atmospheric glow layers */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.12, 0.05],
                    scale: [1, 1.05, 1],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 30% 50%, rgba(0,255,255,0.08) 0%, transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />
            <motion.div
                animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1.05, 1, 1.05],
                }}
                transition={{ duration: 6, repeat: Infinity, delay: 3 }}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 70% 50%, rgba(147,51,234,0.08) 0%, transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ textAlign: "center", marginBottom: "8rem", position: "relative", zIndex: 5 }}
            >
                <span style={{ color: "#9333ea", fontFamily: "monospace", letterSpacing: "0.5em", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    Academic Intelligence
                </span>
                <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    PUB.<span style={{ color: "#00ffff" }}>LOGS</span>
                </h2>
            </motion.div>

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    position: "relative",
                    zIndex: 5,
                }}
            >
                {papers.map((p, i) => (
                    <PaperCard key={p.id} paper={p} index={i} />
                ))}
            </div>
        </section>
    );
}
