import HeroSection from "../components/hero/HeroSection";
import NavBar from "../components/layout/NavBar";
import StoryTimeline from "../components/timeline/StoryTimeline";
import ProjectsSection from "../components/projects/ProjectsSection";
import SkillsSection from "../components/ui/SkillsSection";
import ResearchSection from "../components/ui/ResearchSection";
import ContactTerminal from "../components/contact/ContactTerminal";

export default function Home() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <NavBar />
      <HeroSection />
      <section id="journey">
        <StoryTimeline />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <ResearchSection />
      <section id="contact">
        <ContactTerminal />
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#000",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          padding: "2rem 1rem",
          fontFamily: "monospace",
          fontSize: "0.7rem",
          color: "#4b5563",
          letterSpacing: "0.1em",
        }}
      >
        <span style={{ color: "#00ffff" }}>RUPAM BISWAS</span> © 2026 All Rights Reserved
      </footer>
    </main>
  );
}