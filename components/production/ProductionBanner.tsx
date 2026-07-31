"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductionBanner() {
    const { t } = useLanguage();
    const p = t.production;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const stats = [p.stat1, p.stat2, p.stat3];
    const statColors = ["#00ffff", "#9333ea", "#4ade80"];

    return (
        <section
            ref={ref}
            style={{
                background: "#000",
                padding: "clamp(3rem, 8vw, 7rem) 1rem",
                position: "relative",
                overflow: "hidden",
                borderTop: "1px solid rgba(0,255,255,0.06)",
                borderBottom: "1px solid rgba(147,51,234,0.06)",
            }}
        >
            {/* Background gradient */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 20% 50%, rgba(0,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(147,51,234,0.04) 0%, transparent 60%)",
                pointerEvents: "none",
            }} />

            {/* Grid overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
                pointerEvents: "none",
            }} />

            {/* Moving scan line */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "25%",
                    background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.03), transparent)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 5 }}>
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "3rem" }}
                >
                    <span style={{
                        color: "#4ade80",
                        fontFamily: "monospace",
                        letterSpacing: "0.5em",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "0.75rem",
                    }}>
                        {p.label}
                    </span>
                    <h2 style={{
                        fontSize: "clamp(2rem, 6vw, 4rem)",
                        fontWeight: 900,
                        color: "#fff",
                        margin: "0 0 0.75rem 0",
                        letterSpacing: "-0.04em",
                    }}>
                        {p.heading}{" "}
                        <span style={{ color: "transparent", WebkitTextStroke: "2px #4ade80" }}>
                            {p.headingAccent}
                        </span>
                    </h2>
                    <p style={{
                        fontFamily: "monospace",
                        fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                        color: "#64748b",
                        letterSpacing: "0.05em",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}>
                        {p.subheading}
                    </p>
                </motion.div>

                {/* Stats bar */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "clamp(1.5rem, 5vw, 4rem)",
                    marginBottom: "3rem",
                    flexWrap: "wrap",
                }}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                            style={{ textAlign: "center" }}
                        >
                            <div style={{
                                fontFamily: "monospace",
                                fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
                                color: statColors[i],
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                padding: "0.4rem 1rem",
                                border: `1px solid ${statColors[i]}44`,
                                background: `${statColors[i]}08`,
                                borderRadius: "2px",
                            }}>
                                {stat}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bank cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
                    gap: "1.5rem",
                }}>
                    {/* Trust Bank */}
                    <BankCard
                        inView={inView}
                        delay={0.2}
                        color="#00ffff"
                        index={0}
                        title={p.bankTitle}
                        desc={p.bankDesc}
                        ndaBadge={p.ndaBadge}
                        tags={["Python", ".NET Core", "SignalR", "SQL Server", "Linux"]}
                        icon="🏦"
                        id="PROT-BANK-01"
                    />
                    {/* BRAC Bank */}
                    <BankCard
                        inView={inView}
                        delay={0.35}
                        color="#9333ea"
                        index={1}
                        title={p.bracTitle}
                        desc={p.bracDesc}
                        ndaBadge={p.ndaBadge}
                        tags={["Python", "SQL Server", "Linux", "Automation"]}
                        icon="🏧"
                        id="PROT-ATM-02"
                    />
                </div>
            </div>
        </section>
    );
}

function BankCard({
    inView, delay, color, index, title, desc, ndaBadge, tags, icon, id,
}: {
    inView: boolean; delay: number; color: string; index: number;
    title: string; desc: string; ndaBadge: string; tags: string[]; icon: string; id: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.93 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay, type: "spring", stiffness: 55 }}
            style={{ position: "relative" }}
        >
            <div style={{
                position: "relative",
                background: "rgba(5,5,5,0.9)",
                border: `1px solid ${color}33`,
                borderRadius: "0.75rem",
                padding: "2rem",
                overflow: "hidden",
                backdropFilter: "blur(20px)",
                transition: "border-color 0.3s ease",
            }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = color + "88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = color + "33"; }}
            >
                {/* Corner glow */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "12rem", height: "12rem",
                    background: `radial-gradient(circle at 0% 0%, ${color}12, transparent 70%)`,
                    pointerEvents: "none",
                }} />

                {/* Scan animation */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 4 + index, repeat: Infinity, ease: "linear", delay: index * 1.5 }}
                    style={{
                        position: "absolute",
                        top: 0, bottom: 0,
                        width: "20%",
                        background: `linear-gradient(90deg, transparent, ${color}08, transparent)`,
                        pointerEvents: "none",
                    }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <motion.div
                                animate={{ filter: [`drop-shadow(0 0 6px ${color})`, `drop-shadow(0 0 18px ${color})`, `drop-shadow(0 0 6px ${color})`] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                style={{ fontSize: "2rem" }}
                            >
                                {icon}
                            </motion.div>
                            <div>
                                <p style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#64748b", letterSpacing: "0.2em", margin: "0 0 0.2rem 0" }}>{id}</p>
                                <h3 style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                                    {title}
                                </h3>
                            </div>
                        </div>
                        <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                padding: "0.25rem 0.6rem",
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.4)",
                                color: "#ef4444",
                                fontFamily: "monospace",
                                fontSize: "0.55rem",
                                letterSpacing: "0.1em",
                                borderRadius: "2px",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                            }}
                        >
                            🔒 {ndaBadge}
                        </motion.div>
                    </div>

                    <p style={{ color: "#9ca3af", fontSize: "clamp(0.8rem, 2vw, 0.9rem)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                        {desc}
                    </p>

                    {/* Tech tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    padding: "0.25rem 0.65rem",
                                    border: `1px solid ${color}33`,
                                    color: color + "cc",
                                    fontFamily: "monospace",
                                    fontSize: "0.65rem",
                                    letterSpacing: "0.05em",
                                    borderRadius: "2px",
                                    background: color + "08",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
