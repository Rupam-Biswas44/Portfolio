"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

// Glitch text effect
function GlitchName() {
    const [glitching, setGlitching] = useState(false);
    const name = "RUPAM";

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitching(true);
            setTimeout(() => setGlitching(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: "relative", lineHeight: 0.9 }}>
            {/* Shadow layer 1 */}
            <span
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    fontSize: "clamp(3.5rem, 14vw, 13rem)",
                    fontWeight: 900,
                    color: "#00ffff",
                    opacity: glitching ? 0.8 : 0,
                    transform: glitching ? "translate(-4px, 2px)" : "none",
                    transition: "all 0.05s",
                    clipPath: "polygon(0 20%, 100% 20%, 100% 45%, 0 45%)",
                    letterSpacing: "-0.04em",
                    fontStyle: "italic",
                    mixBlendMode: "screen",
                    userSelect: "none",
                }}
            >
                {name}
            </span>
            {/* Shadow layer 2 */}
            <span
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    fontSize: "clamp(3.5rem, 14vw, 13rem)",
                    fontWeight: 900,
                    color: "#ff00ff",
                    opacity: glitching ? 0.7 : 0,
                    transform: glitching ? "translate(4px, -2px)" : "none",
                    transition: "all 0.05s",
                    clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
                    letterSpacing: "-0.04em",
                    fontStyle: "italic",
                    mixBlendMode: "screen",
                    userSelect: "none",
                }}
            >
                {name}
            </span>
            {/* Main text */}
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{
                    display: "block",
                    fontSize: "clamp(3.5rem, 14vw, 13rem)",
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                    fontStyle: "italic",
                    WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                    position: "relative",
                }}
            >
                {name}
            </motion.span>
        </div>
    );
}

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayed, setDisplayed] = useState("");
    const chars = "!<>-_\\/[]{}—=+*^?#@&$%";
    const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const startTime = Date.now() + delay * 1000;
        let iteration = 0;

        const animate = () => {
            if (Date.now() < startTime) {
                ref.current = setTimeout(animate, 50);
                return;
            }
            if (iteration >= text.length * 3) {
                setDisplayed(text);
                return;
            }
            const progress = Math.floor(iteration / 3);
            setDisplayed(
                text
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (i < progress) return char;
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );
            iteration++;
            ref.current = setTimeout(animate, 40);
        };

        animate();
        return () => { if (ref.current) clearTimeout(ref.current); };
    }, [text, delay]);

    return <span>{displayed}</span>;
}

export default function HeroSection() {
    return (
        <section
            style={{
                width: "100%",
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                background: "#000",
                display: "flex",
                alignItems: "center",
            }}
        >
            {/* 3D particle background */}
            <HeroCanvas />

            {/* Dramatic gradient vignette */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse at 70% 50%, rgba(147,51,234,0.25) 0%, transparent 60%), radial-gradient(ellipse at 30% 50%, rgba(0,255,255,0.15) 0%, transparent 60%), linear-gradient(to bottom, transparent 60%, #000 100%)",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            />

            {/* Grid overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            />

            {/* Corner scan lines effect */}
            <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, #00ffff44, #00ffff, #00ffff44, transparent)",
                    top: "30%",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />

            {/* Main layout */}
            <div className="hero-layout">
                {/* Left — Text */}
                <div className="hero-text">
                    {/* Pre-label */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <div
                            style={{
                                width: "2.5rem",
                                height: "1px",
                                background: "#00ffff",
                                flexShrink: 0,
                            }}
                        />
                        <span
                            style={{
                                fontFamily: "monospace",
                                fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                                color: "#00ffff",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                            }}
                        >
                            <ScrambleText text="AI Engineer • Data Science" delay={0.5} />
                        </span>
                    </motion.div>

                    {/* Glitch name */}
                    <GlitchName />

                    {/* Last name — outline style */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                        style={{
                            fontSize: "clamp(3.5rem, 14vw, 13rem)",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            lineHeight: 0.9,
                            color: "transparent",
                            WebkitTextStroke: "2px rgba(147,51,234,0.8)",
                            fontStyle: "italic",
                            marginBottom: "2rem",
                        }}
                    >
                        BISWAS
                    </motion.div>

                    {/* Subtitle stack */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2.5rem" }}>
                        {[
                            { label: "MSc Data Science", val: "TU Dortmund University" },
                            { label: "Status", val: "Available for Werkstudent" },
                            { label: "Location", val: "Dortmund, Germany" },
                        ].map(({ label, val }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    fontFamily: "monospace",
                                    fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                                    flexWrap: "wrap",
                                }}
                            >
                                <span style={{ color: "#4b5563", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: "7rem", flexShrink: 0 }}>
                                    {label}
                                </span>
                                <span style={{ color: "#9ca3af", letterSpacing: "0.05em" }}>{val}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.6 }}
                        style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
                    >
                        <a
                            href="#projects"
                            style={{
                                padding: "0.75rem 2rem",
                                background: "#00ffff",
                                color: "#000",
                                fontFamily: "monospace",
                                fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                fontWeight: 700,
                                borderRadius: "2px",
                                transition: "all 0.3s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            View Projects
                        </a>
                        <a
                            href="https://github.com/Rupam-Biswas44"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: "0.75rem 1.5rem",
                                border: "1px solid #9333ea",
                                color: "#9333ea",
                                fontFamily: "monospace",
                                fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                borderRadius: "2px",
                                transition: "all 0.3s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/rupam-biswas-7788891a7"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: "0.75rem 1.5rem",
                                border: "1px solid #00ffff",
                                color: "#00ffff",
                                fontFamily: "monospace",
                                fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                borderRadius: "2px",
                                transition: "all 0.3s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            LinkedIn
                        </a>
                    </motion.div>
                </div>

                {/* Right — Abstract Portrait */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="hero-portrait-wrapper"
                >
                    {/* Animated glow ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute",
                            inset: "-20px",
                            borderRadius: "50%",
                            border: "1px solid transparent",
                            borderTopColor: "#00ffff",
                            borderBottomColor: "#9333ea",
                            zIndex: 0,
                        }}
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute",
                            inset: "-10px",
                            borderRadius: "50%",
                            border: "1px solid transparent",
                            borderLeftColor: "#00ffff44",
                            borderRightColor: "#9333ea44",
                            zIndex: 0,
                        }}
                    />

                    {/* Hexagon clip portrait */}
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            zIndex: 1,
                            clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src="/rupam-portrait-new.png"
                            alt="Rupam Biswas"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                            priority
                        />
                        {/* Colour overlay for the cyberpunk feel */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(135deg, rgba(0,255,255,0.15) 0%, transparent 50%, rgba(147,51,234,0.25) 100%)",
                                mixBlendMode: "screen",
                            }}
                        />
                    </div>

                    {/* Floating data badges — hidden on mobile via CSS */}
                    {[
                        { text: "Python", top: "10%", left: "-15%", color: "#00ffff" },
                        { text: ".NET Core", top: "30%", right: "-18%", color: "#9333ea" },
                        { text: "LLMs", bottom: "25%", left: "-12%", color: "#00ffff" },
                        { text: "Deep Learning", bottom: "10%", right: "-16%", color: "#9333ea" },
                    ].map(({ text, color, ...pos }, i) => (
                        <motion.div
                            key={text}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.2, duration: 0.5, type: "spring" }}
                            className="hero-badge"
                            style={{
                                position: "absolute",
                                ...pos,
                                padding: "0.35rem 0.75rem",
                                border: `1px solid ${color}66`,
                                background: `${color}11`,
                                color,
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                letterSpacing: "0.1em",
                                borderRadius: "4px",
                                whiteSpace: "nowrap",
                                zIndex: 5,
                            }}
                        >
                            {text}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom HUD bar */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    padding: "1rem 1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                >
                    <p style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#00ffff", letterSpacing: "0.25em", margin: 0, textTransform: "uppercase" }}>
                        Neural Core Active
                    </p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, ease: "circOut", delay: 2.2 }}
                        style={{ width: "6rem", height: "1px", background: "#00ffff", transformOrigin: "left", marginTop: "0.35rem" }}
                    />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
                >
                    <span style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#4b5563", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        Scroll
                    </span>
                    <div style={{ width: "1px", height: "2.5rem", background: "linear-gradient(to bottom, #4b5563, transparent)" }} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    style={{ textAlign: "right" }}
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2, ease: "circOut", delay: 2.2 }}
                        style={{ width: "6rem", height: "1px", background: "#9333ea", transformOrigin: "right", marginBottom: "0.35rem", marginLeft: "auto" }}
                    />
                    <p style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#9333ea", letterSpacing: "0.25em", margin: 0, textTransform: "uppercase" }}>
                        System Optimal
                    </p>
                </motion.div>
            </div>

            <style>{`
                .hero-layout {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 6rem 1.25rem 8rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 3rem;
                }
                .hero-text {
                    width: 100%;
                }
                .hero-portrait-wrapper {
                    position: relative;
                    flex-shrink: 0;
                    width: min(280px, 70vw);
                    height: min(340px, 85vw);
                }
                .hero-badge {
                    display: none;
                }
                @media (min-width: 768px) {
                    .hero-layout {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 2rem;
                        min-height: 100vh;
                    }
                    .hero-text {
                        flex: 1;
                        max-width: 700px;
                    }
                    .hero-portrait-wrapper {
                        width: min(420px, 38vw);
                        height: min(520px, 47vw);
                    }
                    .hero-badge {
                        display: block;
                    }
                }
            `}</style>
        </section>
    );
}
