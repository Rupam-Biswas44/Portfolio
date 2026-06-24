"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
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
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => setScrolled(latest > 50));
    }, [scrollY]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
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
                    padding: scrolled ? "0.75rem 1.5rem" : "1.25rem 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: scrolled || menuOpen ? "rgba(0,0,0,0.92)" : "transparent",
                    backdropFilter: scrolled || menuOpen ? "blur(15px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Logo / System ID */}
                <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "1.2rem", height: "1.2rem", border: "2px solid #00ffff", borderRadius: "2px", flexShrink: 0 }} />
                    <span style={{ fontFamily: "monospace", color: "#fff", fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.15em" }}>
                        ID:RUPAM <span style={{ color: "#00ffff" }}>[SYS_ROOT]</span>
                    </span>
                </a>

                {/* Desktop Nav Links */}
                <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="nav-desktop">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            whileHover={{ scale: 1.1, color: "#fff" }}
                            style={{
                                fontFamily: "monospace",
                                color: "#64748b",
                                fontSize: "0.65rem",
                                letterSpacing: "0.25em",
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
                            padding: "0.45rem 1.25rem",
                            border: "1px solid #9333ea",
                            color: "#9333ea",
                            fontFamily: "monospace",
                            fontSize: "0.6rem",
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

                {/* Mobile Hamburger */}
                <button
                    className="nav-hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        zIndex: 110,
                    }}
                >
                    <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: "block", width: "22px", height: "2px", background: "#00ffff", borderRadius: "2px", transition: "all 0.3s" }} />
                    <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} style={{ display: "block", width: "22px", height: "2px", background: "#00ffff", borderRadius: "2px", transition: "all 0.3s" }} />
                    <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: "block", width: "22px", height: "2px", background: "#00ffff", borderRadius: "2px", transition: "all 0.3s" }} />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "rgba(0,0,0,0.97)",
                            zIndex: 99,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "2.5rem",
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={closeMenu}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                style={{
                                    fontFamily: "monospace",
                                    color: "#fff",
                                    fontSize: "1.4rem",
                                    letterSpacing: "0.3em",
                                    textDecoration: "none",
                                    fontWeight: 700,
                                }}
                            >
                                <span style={{ color: "#00ffff" }}>/</span>{link.label}
                            </motion.a>
                        ))}
                        <a
                            href="mailto:rupambiswasbd44@gmail.com"
                            onClick={closeMenu}
                            style={{
                                marginTop: "1rem",
                                padding: "0.75rem 2.5rem",
                                border: "1px solid #9333ea",
                                color: "#9333ea",
                                fontFamily: "monospace",
                                fontSize: "0.75rem",
                                letterSpacing: "0.2em",
                                textDecoration: "none",
                                borderRadius: "2px",
                            }}
                        >
                            HIRE_ME
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-desktop { display: none; }
                .nav-hamburger { display: flex; }
                @media (min-width: 768px) {
                    .nav-desktop { display: flex; }
                    .nav-hamburger { display: none; }
                }
            `}</style>
        </>
    );
}
