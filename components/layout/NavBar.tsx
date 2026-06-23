"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
    { label: "MEMORIES", href: "#journey" },
    { label: "NODES", href: "#projects" },
    { label: "SCHEMA", href: "#skills" },
    { label: "PLOTS", href: "#research" },
    { label: "UPLINK", href: "#contact" },
];

export default function NavBar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => setScrolled(latest > 50));
    }, [scrollY]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: scrolled ? "1rem 3rem" : "2rem 3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
                backdropFilter: scrolled ? "blur(15px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            {/* Logo / System ID */}
            <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "1.2rem", height: "1.2rem", border: "2px solid #00ffff", borderRadius: "2px" }} />
                <span style={{ fontFamily: "monospace", color: "#fff", fontSize: "0.8rem", fontWeight: 900, letterSpacing: "0.2em" }}>
                    ID:RUPAM <span style={{ color: "#00ffff" }}>[SYS_ROOT]</span>
                </span>
            </a>

            {/* Nav Links */}
            <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
                {navLinks.map((link, i) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        whileHover={{ scale: 1.1, color: "#fff" }}
                        style={{
                            fontFamily: "monospace",
                            color: "#64748b",
                            fontSize: "0.7rem",
                            letterSpacing: "0.3em",
                            textDecoration: "none",
                            transition: "color 0.2s ease"
                        }}
                    >
                        {link.label}
                    </motion.a>
                ))}

                <a
                    href="mailto:rupambiswasbd44@gmail.com"
                    style={{
                        padding: "0.5rem 1.5rem",
                        border: "1px solid #9333ea",
                        color: "#9333ea",
                        fontFamily: "monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.2em",
                        textDecoration: "none",
                        borderRadius: "2px",
                        transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#9333ea";
                        e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#9333ea";
                    }}
                >
                    HIRE_ME
                </a>
            </div>
        </motion.nav>
    );
}
