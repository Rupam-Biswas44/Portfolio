"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const NeuralNetworkCanvas = dynamic(() => import("../particles/NeuralNetworkCanvas"), { ssr: false });

const terminalLines = [
    { text: "INITIALIZING AUTHENTICATION PROTOCOL...", color: "#00ffff" },
    { text: "ACCESSING BIOMETRIC DATABASE: R_BISWAS_44", color: "#fff" },
    { text: "DECRYPTING CONTACT_NODES...", color: "#9333ea" },
    { text: "PROTOCOL STACK (V4.2.0): ONLINE", color: "#00ffff" },
    { text: "----------------------------------------", color: "#334155" },
    { text: "> identity --get", color: "#00ffff" },
    { text: "UID: RUPAM BISWAS", color: "#fff" },
    { text: "ROLE: AI ENGINEER / DATA SCIENCE", color: "#fff" },
    { text: "> location --sync", color: "#00ffff" },
    { text: "COORD: DORTMUND, GERMANY [UTC+2]", color: "#fff" },
    { text: "> status --check", color: "#00ffff" },
    { text: "[OK] AVAILABLE FOR WERKSTUDENT HIRING", color: "#4ade80" },
    { text: "> contact --open", color: "#00ffff" },
    { text: "📧 EMAIL: rupambiswasbd44@gmail.com", color: "#fff" },
    { text: "📱 PHONE: +49 1521 2378154", color: "#fff" },
    { text: "🔗 LINKEDIN: linkedin.com/in/rupam-biswas-7788891a7", color: "#fff" },
    { text: "🐙 GITHUB: Rupam-Biswas44", color: "#fff" },
    { text: "----------------------------------------", color: "#334155" },
    { text: "UPLINK ESTABLISHED. SEND MESSAGE?", color: "#9333ea" },
];

function Line({ line, delay, started }: { line: (typeof terminalLines)[0], delay: number, started: boolean }) {
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

export default function ContactTerminal() {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });

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
                    animate={{
                        scale: [0.3, 2.5],
                        opacity: [0.25, 0],
                    }}
                    transition={{
                        duration: 5,
                        delay: i * 1.2,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
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
                    Encrypted Uplink
                </span>
                <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", margin: "1rem 0", letterSpacing: "-0.05em" }}>
                    SYS.<span style={{ color: "transparent", WebkitTextStroke: "2px #9333ea" }}>TALK</span>
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
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            boxShadow: [
                                "inset 0 0 30px rgba(0,255,255,0.03)",
                                "inset 0 0 50px rgba(0,255,255,0.08)",
                                "inset 0 0 30px rgba(0,255,255,0.03)",
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "0.5rem",
                            border: "1px solid rgba(0,255,255,0.1)",
                            pointerEvents: "none",
                            zIndex: 0,
                        }}
                    />

                    {/* Top Bar */}
                    <div style={{
                        background: "#1e293b44",
                        padding: "0.75rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        borderBottom: "1px solid #1e293b"
                    }}>
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
                        {/* Active pulse dot */}
                        <motion.div
                            animate={{ opacity: [1, 0, 1], scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
                        />
                    </div>

                    {/* CRT Overlay */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                        backgroundSize: "100% 4px, 3px 100%",
                        pointerEvents: "none",
                        zIndex: 10
                    }} />

                    {/* Scan line */}
                    <motion.div
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: "30px",
                            background: "linear-gradient(to bottom, transparent, rgba(0,255,255,0.03), transparent)",
                            pointerEvents: "none",
                            zIndex: 11,
                        }}
                    />

                    {/* Terminal Body */}
                    <div style={{ padding: "clamp(1rem, 4vw, 2.5rem)", minHeight: "400px", position: "relative", zIndex: 5 }}>
                        {terminalLines.map((line, i) => (
                            <Line key={i} line={line} delay={i * 2} started={inView} />
                        ))}

                        {/* Blinking Cursor */}
                        <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            style={{
                                display: "inline-block",
                                width: "0.6rem",
                                height: "1.1rem",
                                background: "#00ffff",
                                marginLeft: "0.5rem",
                                verticalAlign: "middle",
                                boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff66",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Action Button */}
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
                        {/* Button fill animation */}
                        <motion.div
                            animate={{
                                x: ["-100%", "200%"],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.15), transparent)",
                                pointerEvents: "none",
                            }}
                        />
                        SEND_DATA_PACKET
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
