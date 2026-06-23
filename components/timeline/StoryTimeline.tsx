"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const NeuralNetworkCanvas = dynamic(() => import("../particles/NeuralNetworkCanvas"), { ssr: false });

const journey = [
    {
        year: "1999",
        title: "BANGLADESH",
        subtitle: "ORIGIN POINT",
        desc: "System initialization. Root directory established in the heart of South Asia.",
        icon: "🌏",
        color: "#00ffff",
    },
    {
        year: "2020",
        title: "GUJARAT TECH",
        subtitle: "GOVT. SCHOLARSHIP // B.E. COMP ENG",
        desc: "Acquired Govt. ICCR Scholarship. Computer Engineering fundamentals and research optimization. Final grade optimized to 1.5.",
        icon: "🎓",
        color: "#9333ea",
    },
    {
        year: "2022-2024",
        title: "IOT SPECIALIZATION",
        subtitle: "MINOR DEGREE // ADDITIONAL CORE",
        desc: "Completed a specialized two-year minor degree in Internet of Things alongside regular undergraduate studies.",
        icon: "🔌",
        color: "#00ffff",
    },
    {
        year: "JAN 2024",
        title: "SAP INDIA",
        subtitle: "DATA SCIENCE INTERN // CODEUNNATI",
        desc: "Deep analysis layer integrated. IoT, ML, and Image Processing pipelines developed for industry datasets.",
        icon: "💼",
        color: "#9333ea",
    },
    {
        year: "FEB 2025",
        title: "DATA EDGE LTD",
        subtitle: "ASSOCIATE SOFTWARE ENGINEER",
        desc: "Deployment of Real-Time Bank Monitoring (Trust Bank PLC). ATM Reconciliation systems (BRAC Bank) maintained in production.",
        icon: "🏦",
        color: "#00ffff",
    },
    {
        year: "2026",
        title: "RESEARCH LAB",
        subtitle: "LUNGNET-CAM // FEDERATED LEARNING",
        desc: "Neural network optimization for oncology. IEEE QPAIN publications. Attention-based medical imaging frameworks.",
        icon: "📄",
        color: "#9333ea",
    },
    {
        year: "APR 2026",
        title: "TU DORTMUND",
        subtitle: "M.SC. DATA SCIENCE // GERMANY",
        desc: "Currently executing Master's protocols. Seeking high-intensity Werkstudent positions in AI / ML ecosystems.",
        icon: "🚀",
        color: "#00ffff",
    },
];

// Staircase spiral orbiting ring that floats around each card
function OrbitalRing({ color, index }: { color: string; index: number }) {
    const size = 200 + index * 30;
    return (
        <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            pointerEvents: "none",
            zIndex: 0,
        }}>
            {[0, 1, 2].map(r => (
                <motion.div
                    key={r}
                    animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
                    transition={{
                        duration: 4 + r * 2 - index * 0.3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        inset: r * 8,
                        borderRadius: "50%",
                        border: `1px solid ${color}`,
                        opacity: 0.3 - r * 0.08,
                        boxShadow: `0 0 ${8 + r * 4}px ${color}44, inset 0 0 ${4 + r * 2}px ${color}22`,
                    }}
                />
            ))}
            {/* Orbiting dot */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3 - index * 0.2, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", inset: 0 }}
            >
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: 8,
                    height: 8,
                    marginLeft: -4,
                    marginTop: -4,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 12px ${color}, 0 0 30px ${color}88`,
                }} />
            </motion.div>
        </div>
    );
}

// Staircase background layer — stepped glowing rings descending
function StaircaseBackground() {
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
            {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: ["0%", "-100%"],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 8,
                        delay: i * 0.8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        left: `${(i % 5) * 22}%`,
                        bottom: "-10%",
                        width: 2,
                        height: `${15 + (i % 3) * 10}%`,
                        background: i % 2 === 0
                            ? "linear-gradient(to top, #00ffff, #00ffff44, transparent)"
                            : "linear-gradient(to top, #9333ea, #9333ea44, transparent)",
                        borderRadius: 4,
                        filter: "blur(1px)",
                    }}
                />
            ))}
            {/* Staircase stepped layers */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={`step-${i}`}
                    animate={{ x: ["-10%", "110%"] }}
                    transition={{
                        duration: 12 + i * 2,
                        delay: i * 2.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        top: `${15 + i * 17}%`,
                        left: 0,
                        width: "20%",
                        height: 1,
                        background: `linear-gradient(to right, transparent, ${i % 2 === 0 ? "#00ffff" : "#9333ea"}88, transparent)`,
                        filter: "blur(1px)",
                    }}
                />
            ))}
        </div>
    );
}

function TimelineItem({
    item,
    index,
}: {
    item: (typeof journey)[0];
    index: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const isLeft = index % 2 === 0;

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: "12rem",
            }}
        >
            {/* Orbital Rings around center node */}
            <OrbitalRing color={item.color} index={index} />

            {/* Connector Line Glow */}
            <motion.div
                initial={{ height: 0 }}
                animate={inView ? { height: "100%" } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "1rem",
                    width: "2px",
                    background: `linear-gradient(to bottom, ${item.color}, transparent)`,
                    zIndex: 1,
                    boxShadow: `0 0 8px ${item.color}`,
                }}
            />

            {/* Centre Core Multi-layer */}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                }}
            >
                {/* Pulsing halo */}
                <motion.div
                    animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.4, 0, 0.4],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        inset: "-1.5rem",
                        background: item.color,
                        borderRadius: "50%",
                        filter: "blur(16px)",
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        inset: "-1rem",
                        background: item.color,
                        borderRadius: "50%",
                        filter: "blur(12px)",
                    }}
                />
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        borderRadius: "50%",
                        background: "#fff",
                        border: `3px solid ${item.color}`,
                        boxShadow: `0 0 15px ${item.color}, 0 0 40px ${item.color}66`,
                    }}
                />
            </div>

            {/* Cyberpunk Card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -100 : 100, scale: 0.8 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
                style={{
                    width: "45%",
                    marginLeft: isLeft ? "0" : "auto",
                    marginRight: isLeft ? "auto" : "0",
                    position: "relative",
                }}
            >
                {/* Animated border glow */}
                <motion.div
                    animate={{
                        boxShadow: [
                            `0 0 15px ${item.color}33`,
                            `0 0 40px ${item.color}66`,
                            `0 0 15px ${item.color}33`,
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid ${item.color}55`,
                        clipPath: "polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%)",
                        backdropFilter: "blur(20px)",
                        zIndex: -1,
                    }}
                />

                {/* Corner fire sparks */}
                {[0, 1].map(c => (
                    <motion.div
                        key={c}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5 + c * 0.7, repeat: Infinity }}
                        style={{
                            position: "absolute",
                            top: c === 0 ? -2 : "auto",
                            bottom: c === 1 ? -2 : "auto",
                            right: c === 0 ? 30 : "auto",
                            left: c === 1 ? 30 : "auto",
                            width: 4,
                            height: 4,
                            background: item.color,
                            borderRadius: "50%",
                            boxShadow: `0 0 10px ${item.color}`,
                        }}
                    />
                ))}

                <div style={{ padding: "2.5rem" }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                        <motion.span
                            animate={{ filter: [`drop-shadow(0 0 5px ${item.color})`, `drop-shadow(0 0 15px ${item.color})`, `drop-shadow(0 0 5px ${item.color})`] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontSize: "2rem" }}
                        >
                            {item.icon}
                        </motion.span>
                        <div>
                            <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: item.color, letterSpacing: "0.4em" }}>{item.year}</p>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>{item.title}</h3>
                        </div>
                    </div>

                    <p style={{ color: item.color, fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", borderLeft: `2px solid ${item.color}`, paddingLeft: "0.75rem" }}>
                        {item.subtitle}
                    </p>

                    <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
                        {item.desc}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function StoryTimeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section
            ref={containerRef}
            style={{
                background: "#000",
                padding: "10rem 1rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Neural Network background canvas */}
            <NeuralNetworkCanvas />

            {/* Staircase animated lines */}
            <StaircaseBackground />

            {/* Parallax Background Elements */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle at 50% 50%, rgba(147,51,234,0.08) 0%, transparent 70%)",
                    y: backgroundY,
                    pointerEvents: "none",
                }}
            />

            {/* Grid Scan Lines */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "linear-gradient(transparent 95%, rgba(0,255,255,0.03) 95%), linear-gradient(90deg, transparent 95%, rgba(0,255,255,0.03) 95%)",
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                }}
            />

            {/* Animated scan sweep */}
            <motion.div
                animate={{ y: ["-5%", "105%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "linear-gradient(90deg, transparent, #00ffff66, #00ffff, #00ffff66, transparent)",
                    boxShadow: "0 0 20px #00ffff, 0 0 60px #00ffff44",
                    pointerEvents: "none",
                    zIndex: 2,
                }}
            />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, scale: 1.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ textAlign: "center", marginBottom: "10rem", position: "relative", zIndex: 5 }}
            >
                <span style={{ color: "#00ffff", fontFamily: "monospace", letterSpacing: "0.5em", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    Memory Access Block
                </span>
                <h2 style={{ fontSize: "5rem", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    LIFE.<span style={{ color: "transparent", WebkitTextStroke: "2px #9333ea" }}>DATA</span>
                </h2>
                <div style={{ width: "100px", height: "1px", background: "#334155", margin: "0 auto" }} />
            </motion.div>

            {/* Timeline Wrapper */}
            <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", zIndex: 5 }}>
                {/* Main Vertical Axis */}
                <motion.div
                    animate={{
                        boxShadow: [
                            "0 0 5px #00ffff44",
                            "0 0 20px #9333ea88",
                            "0 0 5px #00ffff44",
                        ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        bottom: 0,
                        width: "1px",
                        background: "linear-gradient(to bottom, #00ffff44, #9333ea44, #00ffff44)",
                        transform: "translateX(-50%)",
                    }}
                />

                {journey.map((item, i) => (
                    <TimelineItem key={i} item={item} index={i} />
                ))}
            </div>
        </section>
    );
}
