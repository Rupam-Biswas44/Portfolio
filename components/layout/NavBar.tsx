"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const navHrefs = [
    "#journey",
    "#projects",
    "#skills",
    "#research",
    "#vlog",
    "#contact",
];

export default function NavBar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { t, toggle } = useLanguage();

    const navLinks = [
        { label: t.nav.memories, href: navHrefs[0] },
        { label: t.nav.nodes,    href: navHrefs[1] },
        { label: t.nav.schema,   href: navHrefs[2] },
        { label: t.nav.plots,    href: navHrefs[3] },
        { label: t.nav.bytes,    href: navHrefs[4] },
        { label: t.nav.uplink,   href: navHrefs[5] },
    ];

    useEffect(() => {
        return scrollY.onChange((v) => setScrolled(v > 50));
    }, [scrollY]);

    // Lock body scroll when menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            {/* ────────────────────────────── TOP BAR ────────────────────────────── */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0,
                    zIndex: 200,
                    padding: scrolled ? "0.6rem 1.25rem" : "1rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: scrolled || menuOpen ? "rgba(0,0,0,0.95)" : "transparent",
                    backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
                    transition: "all 0.35s ease",
                }}
            >
                {/* Logo */}
                <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: "1.1rem", height: "1.1rem", border: "2px solid #00ffff", borderRadius: "2px", flexShrink: 0 }} />
                    <span style={{ fontFamily: "monospace", color: "#fff", fontSize: "0.7rem", fontWeight: 900, letterSpacing: "0.15em" }}>
                        ID:RUPAM <span style={{ color: "#00ffff" }}>[SYS_ROOT]</span>
                    </span>
                </a>

                {/* ── Desktop Links ── */}
                <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }} className="nav-desktop">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            whileHover={{ scale: 1.1, color: "#fff" }}
                            style={{ fontFamily: "monospace", color: "#64748b", fontSize: "0.62rem", letterSpacing: "0.25em", textDecoration: "none", transition: "color 0.2s" }}
                        >
                            {link.label}
                        </motion.a>
                    ))}

                    {/* Language Toggle */}
                    <motion.button
                        id="lang-toggle-btn"
                        onClick={toggle}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: "0.4rem 0.85rem",
                            border: "1px solid rgba(0,255,255,0.35)",
                            color: "#00ffff",
                            background: "rgba(0,255,255,0.06)",
                            fontFamily: "monospace",
                            fontSize: "0.58rem",
                            letterSpacing: "0.15em",
                            borderRadius: "2px",
                            cursor: "pointer",
                        }}
                    >
                        {t.nav.langToggle}
                    </motion.button>

                    {/* Hire Me */}
                    <a
                        href="mailto:rupambiswasbd44@gmail.com"
                        style={{
                            padding: "0.4rem 1.1rem",
                            border: "1px solid #9333ea",
                            color: "#9333ea",
                            fontFamily: "monospace",
                            fontSize: "0.58rem",
                            letterSpacing: "0.2em",
                            textDecoration: "none",
                            borderRadius: "2px",
                            transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#9333ea"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9333ea"; }}
                    >
                        {t.nav.hireMe}
                    </a>
                </div>

                {/* ── Hamburger (always visible on mobile) ── */}
                <button
                    className="nav-hamburger"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                    style={{
                        background: "transparent",
                        border: "1px solid rgba(0,255,255,0.25)",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: "0.45rem 0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        zIndex: 210,
                    }}
                >
                    <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                        style={{ display: "block", width: "22px", height: "2px", background: "#00ffff", borderRadius: "2px", transformOrigin: "center" }} />
                    <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                        style={{ display: "block", width: "22px", height: "2px", background: "#00ffff", borderRadius: "2px" }} />
                    <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                        style={{ display: "block", width: "22px", height: "2px", background: "#00ffff", borderRadius: "2px", transformOrigin: "center" }} />
                </button>
            </motion.nav>

            {/* ─────────────────── MOBILE SLIDE-DOWN DRAWER ─────────────────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: "fixed",
                            top: 0, right: 0,
                            width: "min(320px, 85vw)",
                            height: "100dvh",
                            background: "rgba(2,4,16,0.98)",
                            backdropFilter: "blur(20px)",
                            borderLeft: "1px solid rgba(0,255,255,0.12)",
                            zIndex: 199,
                            display: "flex",
                            flexDirection: "column",
                            padding: "6rem 2rem 3rem 2rem",
                            gap: "0",
                            overflowY: "auto",
                        }}
                    >
                        {/* Decorative top accent */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #00ffff, transparent)" }} />

                        {/* Section label */}
                        <div style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#00ffff", letterSpacing: "0.3em", marginBottom: "1.75rem", opacity: 0.6 }}>
                            // NAVIGATION
                        </div>

                        {/* Nav links */}
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={closeMenu}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.3 }}
                                style={{
                                    fontFamily: "monospace",
                                    color: "#e2e8f0",
                                    fontSize: "0.95rem",
                                    letterSpacing: "0.25em",
                                    textDecoration: "none",
                                    fontWeight: 700,
                                    padding: "0.9rem 0",
                                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "#00ffff"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "#e2e8f0"; }}
                            >
                                <span style={{ color: "#00ffff", fontSize: "0.75rem", fontWeight: 400, opacity: 0.6 }}>0{i + 1}</span>
                                {link.label}
                            </motion.a>
                        ))}

                        {/* Spacer */}
                        <div style={{ flex: 1, minHeight: "2rem" }} />

                        {/* Language Toggle — always visible on mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            style={{ marginBottom: "1rem" }}
                        >
                            <div style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#64748b", letterSpacing: "0.2em", marginBottom: "0.75rem" }}>
                                // LANGUAGE
                            </div>
                            <button
                                id="lang-toggle-mobile-btn"
                                onClick={() => { toggle(); closeMenu(); }}
                                style={{
                                    width: "100%",
                                    padding: "0.85rem",
                                    background: "rgba(0,255,255,0.07)",
                                    border: "1px solid rgba(0,255,255,0.35)",
                                    color: "#00ffff",
                                    fontFamily: "monospace",
                                    fontSize: "0.7rem",
                                    letterSpacing: "0.2em",
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                }}
                            >
                                <span style={{ fontSize: "1rem" }}>🌐</span>
                                {t.nav.langToggle}
                            </button>
                        </motion.div>

                        {/* Hire Me */}
                        <motion.a
                            href="mailto:rupambiswasbd44@gmail.com"
                            onClick={closeMenu}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                display: "block",
                                padding: "0.85rem",
                                background: "rgba(147,51,234,0.1)",
                                border: "1px solid #9333ea",
                                color: "#9333ea",
                                fontFamily: "monospace",
                                fontSize: "0.7rem",
                                letterSpacing: "0.2em",
                                textDecoration: "none",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontWeight: 700,
                            }}
                        >
                            {t.nav.hireMe}
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop tap to close */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                        style={{
                            position: "fixed", inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            zIndex: 198,
                            cursor: "pointer",
                        }}
                    />
                )}
            </AnimatePresence>

            <style>{`
                .nav-desktop { display: none !important; }
                .nav-hamburger { display: flex !important; }
                @media (min-width: 768px) {
                    .nav-desktop { display: flex !important; }
                    .nav-hamburger { display: none !important; }
                }
            `}</style>
        </>
    );
}
