"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "de";

export type Translations = typeof en;

const en = {
    lang: "en" as Lang,
    // Navbar
    nav: {
        memories: "MEMORIES",
        nodes: "NODES",
        schema: "SCHEMA",
        plots: "PLOTS",
        bytes: "BYTES",
        uplink: "UPLINK",
        hireMe: "HIRE_ME",
        langToggle: "🇩🇪 DE",
    },
    // Hero
    hero: {
        tagline: "AI Engineer • Data Science • Software Developer",
        degree: "MSc Data Science",
        university: "TU Dortmund University",
        statusLabel: "Status",
        statusValue: "Available for Werkstudent",
        locationLabel: "Location",
        locationValue: "Dortmund, Germany",
        viewProjects: "View Projects",
        github: "GitHub",
        linkedin: "LinkedIn",
        neuralCore: "Neural Core Active",
        systemOptimal: "System Optimal",
        scroll: "Scroll",
    },
    // Production Banner
    production: {
        label: "Production Experience",
        heading: "REAL-WORLD",
        headingAccent: "DEPLOYMENTS",
        subheading: "Enterprise systems running in live banking environments — not student projects.",
        bankTitle: "Trust Bank PLC",
        bankDesc: "Real-time transaction monitoring system. Managed live data flow between Linux backends and .NET frontends via SignalR with zero-latency.",
        bracTitle: "BRAC Bank",
        bracDesc: "ATM Reconciliation pipelines maintained in production. Automated financial data reconciliation across hundreds of ATMs.",
        ndaBadge: "NDA PROTECTED",
        stat1: "2 Banks Deployed",
        stat2: "Production Systems",
        stat3: "Zero Downtime",
    },
    // Timeline
    timeline: {
        label: "Memory Access Block",
        heading: "LIFE.",
        headingAccent: "DATA",
        items: [
            {
                year: "1999",
                title: "BANGLADESH",
                subtitle: "ORIGIN POINT",
                desc: "System initialization. Root directory established in the heart of South Asia.",
            },
            {
                year: "2020\u20132024",
                title: "GUJARAT TECHNOLOGICAL UNIVERSITY",
                subtitle: "GOVT. SCHOLARSHIP // B.E. COMP ENG",
                desc: "Acquired Govt. ICCR Scholarship. Computer Engineering fundamentals and research optimization. Final grade optimized to 1.5 German Equivalent.",
            },
            {
                year: "2022\u20132024",
                title: "IOT SPECIALIZATION",
                subtitle: "MINOR DEGREE // 28.4 ADDITIONAL ECTS",
                desc: "Completed a specialized two-year minor degree in Internet of Things alongside regular undergraduate studies, earning 28.4 additional ECTS. Gained hands-on experience in how IoT systems integrate with AI \u2014 sensor data pipelines, edge inference, and intelligent automation.",
            },
            {
                year: "JUN\u2013JUL 2023",
                title: "MAXGEN TECHNOLOGIES",
                subtitle: "MACHINE LEARNING INTERN // PVT. LTD.",
                desc: "Summer internship in Machine Learning at Maxgen Technologies PVT. LTD. Applied Python, Pandas, NumPy for data analysis and ML model development.",
            },
            {
                year: "JAN 2024\u2013MAY 2024",
                title: "SAP INDIA",
                subtitle: "DATA SCIENCE INTERN // CODEUNNATI",
                desc: "Deep analysis layer integrated. IoT, ML, and Image Processing pipelines developed for industry datasets.",
            },
            {
                year: "FEB 2025\u2013APR 2026",
                title: "DATA EDGE LTD",
                subtitle: "ASSOCIATE SOFTWARE ENGINEER",
                desc: "Deployment of Real-Time Bank Monitoring (Trust Bank PLC). ATM Reconciliation systems (BRAC Bank) maintained in production.",
            },
            {
                year: "2025\u20132026",
                title: "RESEARCH LAB",
                subtitle: "LUNGNET-CAM // FEDERATED LEARNING",
                desc: "Neural network optimization for oncology. IEEE QPAIN publications. Attention-based medical imaging frameworks.",
            },
            {
                year: "APR 2026",
                title: "TU DORTMUND",
                subtitle: "M.SC. DATA SCIENCE // GERMANY",
                desc: "Currently executing Master's protocols. Seeking high-intensity Werkstudent positions in AI / ML / Software Engineering ecosystems.",
            },
        ],
    },
    // Projects
    projects: {
        label: "Project Archives",
        heading: "CORE.",
        headingAccent: "BUILDS",
        viewSource: "VIEW SOURCE",
        items: [
            {
                title: "AI-DocumentQA-System",
                tagline: "FINANCIAL QA AGENT",
                desc: "Interactive chatbot answering questions on financial policy docs. FAISS + Sentence Transformers for semantic search, with optional OpenAI GPT orchestration.",
            },
            {
                title: "TRUST BANK MONITOR",
                tagline: "REAL-TIME TRANSACTION KERNEL",
                desc: "Live enterprise system deployed at Trust Bank PLC & BRAC Bank. Managed real-time transaction data flow between Linux backends and .NET frontends with zero-latency monitoring via SignalR. ATM reconciliation pipelines maintained in production. Source code is proprietary \u2014 NDA protected.",
            },
            {
                title: "MULTILINGUAL RAG",
                tagline: "NEURAL KNOWLEDGE RETRIEVAL",
                desc: "End-to-end RAG pipeline supporting English & Bengali. OCR integration, FAISS vector indexing, and OpenAI orchestration.",
            },
            {
                title: "CREDIT CARD FRAUD",
                tagline: "ANOMALY DETECTION",
                desc: "Neural anomaly detection system for credit card transactions identifying fraudulent patterns in high-dimensional financial data spaces.",
            },
            {
                title: "PLANT DISEASE AI",
                tagline: "CV + LLM DIAGNOSIS",
                desc: "Computer vision model identifying plant pathology. Integrated with Meta LLaMA for solution generation. Streamlit deployment.",
            },
            {
                title: "SALARY PREDICTION",
                tagline: "ML REGRESSION MODEL",
                desc: "Predictive machine learning application utilizing regression algorithms to forecast salary ranges based on multiple professional features.",
            },
            {
                title: "GENAI SEARCH",
                tagline: "SEMANTIC RESOURCE FINDER",
                desc: "Fine-tuned Hugging Face models with attention mechanisms for semantic resource recommendation and learning path mapping.",
            },
            {
                title: "AERORESCUE AI",
                tagline: "DISASTER RESPONSE INTELLIGENCE",
                desc: "Real-time disaster response system using YOLOv8 for RGB and Thermal sensor fusion. Features Survivor Priority Scoring, multi-object tracking, and a live emergency dashboard.",
            },
            {
                title: "CEREBRUM",
                tagline: "ENTERPRISE MULTI-AGENT AI PLATFORM",
                desc: "Production-grade, open-source enterprise AI platform that autonomously ingests data, coordinates specialized AI agents, trains ML models, and generates insights.",
            },
            {
                title: "NOVA OS",
                tagline: "AI OPERATING SYSTEM",
                desc: "A production-grade personal AI assistant inspired by JARVIS. Combines AI reasoning, voice interaction, computer vision, modular agents, and long-term memory.",
            },
        ],
    },
    // Skills
    skills: {
        label: "Neural Architecture",
        heading: "TECH.",
        headingAccent: "STACK",
        currentlyLearning: "CURRENTLY LEARNING",
    },
    // Vlog
    vlog: {
        label: "Dev Thoughts",
        heading: "BYTES.",
        headingAccent: "LOG",
        subheading: "Raw thoughts from the terminal. No polish. Just signal.",
    },
    // Research
    research: {
        label: "Academic Intelligence",
        heading: "PUB.",
        headingAccent: "LOGS",
        items: [
            {
                status: "STATUS: ACCEPTED",
                title: "LUNGNET-CAM: HYBRID CONVOLUTION & ATTENTION",
                venue: "IEEE QPAIN 2026 // MEDICAL AI",
                abstract: "A high-precision framework for CT-based lung cancer detection using custom attention gates and ensemble convolution layers.",
            },
            {
                status: "STATUS: UNDER_REVIEW",
                title: "RESOURCE-EFFICIENT FEDERATED LEARNING",
                venue: "SPICSCON 2026 // DISTRIBUTED ML",
                abstract: "Addressing Non-IID data distribution challenges in tumor classification through attention-ensemble CNN units and federated aggregation.",
            },
        ],
    },
    // Contact
    contact: {
        label: "Encrypted Uplink",
        heading: "SYS.",
        headingAccent: "TALK",
        sendButton: "SEND_DATA_PACKET",
        missionStatus: "MISSION STATUS",
        available: "AVAILABLE FOR AI/ML WERKSTUDENT",
        responseTime: "INTERVIEW RESPONSE: < 24 HRS",
        downloadCV: "DOWNLOAD CV",
        scheduleInterview: "SCHEDULE INTERVIEW",
        terminalLines: [
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
            { text: "\uD83D\uDCE7 EMAIL: rupambiswasbd44@gmail.com", color: "#fff" },
            { text: "\uD83D\uDCF1 PHONE: +49 1521 2378154", color: "#fff" },
            { text: "\uD83D\uDD17 LINKEDIN: linkedin.com/in/rupam-biswas-7788891a7", color: "#fff" },
            { text: "\uD83D\uDC19 GITHUB: Rupam-Biswas44", color: "#fff" },
            { text: "----------------------------------------", color: "#334155" },
            { text: "UPLINK ESTABLISHED. SEND MESSAGE?", color: "#9333ea" },
        ],
        terminalHelp: "Available commands: help | projects | education | skills | hire | whoami | download_cv | github | contact",
        terminalHired: "\u2705 ACCESS GRANTED. Interview scheduled. Expect a response within 24 hours.",
        placeholder: "type a command...",
    },
    // Chatbot
    chatbot: {
        title: "ASK RUPAM",
        subtitle: "AI ASSISTANT ONLINE",
        placeholder: "Ask me anything about Rupam...",
        send: "SEND",
        close: "CLOSE",
        suggestions: [
            "What projects has Rupam done?",
            "Tell me about his banking experience.",
            "Does he know RAG?",
            "What is his research about?",
            "Is he available for Werkstudent?",
        ],
        systemPrompt: `You are Rupam Biswas's AI portfolio assistant. Answer questions about Rupam concisely and professionally.

About Rupam Biswas:
- M.Sc. Data Science student at TU Dortmund University, Germany (started April 2026)
- Available for Werkstudent (part-time) positions in AI/ML/Software Engineering in Germany
- Location: Dortmund, Germany
- Email: rupambiswasbd44@gmail.com | Phone: +49 1521 2378154
- LinkedIn: linkedin.com/in/rupam-biswas-7788891a7 | GitHub: Rupam-Biswas44

Education:
- M.Sc. Data Science, TU Dortmund, Germany (2026–present)
- B.E. Computer Engineering, Gujarat Technological University (2020–2024), ICCR Government Scholarship, 1.5 German Equivalent grade
- IoT Minor Degree, 28.4 additional ECTS (2022–2024)

Experience:
- Associate Software Engineer at Data Edge Ltd (Feb 2025–Apr 2026): Deployed real-time bank monitoring system at Trust Bank PLC (SignalR, .NET Core, SQL Server, Python, Linux). Maintained ATM Reconciliation pipelines at BRAC Bank in production.
- Data Science Intern, SAP India / CodeUnnati (Jan–May 2024): IoT, ML, and image processing pipelines.
- Machine Learning Intern, Maxgen Technologies (Jun–Jul 2023): Python, Pandas, NumPy, ML models.

Projects:
1. AI Policy Chatbot — FAISS + Sentence Transformers + OpenAI GPT for financial document QA
2. Trust Bank Monitor — Real-time banking system, NDA protected, enterprise production
3. Multilingual RAG — English & Bengali RAG pipeline with OCR, FAISS, FastAPI, OpenAI
4. Credit Card Fraud Detection — Neural anomaly detection
5. Plant Disease AI — TensorFlow/Keras + Meta LLaMA for plant pathology diagnosis
6. Salary Prediction — Flask + ML regression
7. GenAI Search — Fine-tuned Hugging Face transformers for semantic search
8. Federated Medical AI — Distributed learning for hospital CT datasets, SPICSCON 2026
9. AeroRescue System — Emergency response AI with FastAPI, flight path optimization
10. IoT Smart Home — Edge ML inference, sensor fusion, embedded hardware

Research:
1. LungNet-CAM: Hybrid Convolution & Attention — CT-based lung cancer detection, IEEE QPAIN 2026 (ACCEPTED)
2. Resource-Efficient Federated Learning — Non-IID tumor classification, SPICSCON 2026 (UNDER REVIEW)

Skills: Python, C#, SQL, TypeScript, Bash, .NET Core, FastAPI, TensorFlow, PyTorch, Keras, SignalR, Docker, Git, Transformers, LLMs, RAG, CNNs, FAISS, GANs
Currently Learning: LangGraph, MCP, AI Agents, Multi-Agent Systems, PyTorch (Deep), LlamaIndex, RLHF

CV: /rupam_biswas_cv.pdf
Portfolio: https://rupambiswasde.netlify.app

Keep answers concise and professional. If asked to download CV, mention: "/rupam_biswas_cv.pdf"`,
    },
};

const de: Translations = {
    lang: "de",
    nav: {
        memories: "VERLAUF",
        nodes: "PROJEKTE",
        schema: "F\u00c4HIGKEITEN",
        plots: "FORSCHUNG",
        bytes: "BYTES",
        uplink: "KONTAKT",
        hireMe: "EINSTELLEN",
        langToggle: "\uD83C\uDDEC\uD83C\uDDE7 EN",
    },
    hero: {
        tagline: "KI-Ingenieur \u2022 Data Science \u2022 Softwareentwickler",
        degree: "M.Sc. Data Science",
        university: "TU Dortmund",
        statusLabel: "Status",
        statusValue: "Verf\u00fcgbar f\u00fcr Werkstudent",
        locationLabel: "Standort",
        locationValue: "Dortmund, Deutschland",
        viewProjects: "Projekte ansehen",
        github: "GitHub",
        linkedin: "LinkedIn",
        neuralCore: "Neuralkern Aktiv",
        systemOptimal: "System Optimal",
        scroll: "Scrollen",
    },
    production: {
        label: "Produktionserfahrung",
        heading: "REALE",
        headingAccent: "DEPLOYMENTS",
        subheading: "Unternehmenssysteme in Live-Bankumgebungen \u2014 keine Studentenprojekte.",
        bankTitle: "Trust Bank PLC",
        bankDesc: "Echtzeit-Transaktions\u00fcberwachungssystem. Live-Datenfluss zwischen Linux-Backends und .NET-Frontends \u00fcber SignalR mit null Latenz.",
        bracTitle: "BRAC Bank",
        bracDesc: "ATM-Abstimmungs-Pipelines in der Produktion gewartet. Automatisierte Finanzabstimmung \u00fcber hunderte von Geldautomaten.",
        ndaBadge: "NDA GESCH\u00dcTZT",
        stat1: "2 Banken Deployed",
        stat2: "Produktionssysteme",
        stat3: "Null Ausfallzeit",
    },
    timeline: {
        label: "Speicherzugriffsblock",
        heading: "LEBENS.",
        headingAccent: "DATEN",
        items: [
            {
                year: "1999",
                title: "BANGLADESCH",
                subtitle: "URSPRUNGSPUNKT",
                desc: "Systeminitialisierung. Stammverzeichnis im Herzen S\u00fcdasiens eingerichtet.",
            },
            {
                year: "2020\u20132024",
                title: "GUJARAT TECHNISCHE UNIVERSIT\u00c4T",
                subtitle: "REGIERUNGSSTIPENDIUM // B.E. INFORMATIK",
                desc: "ICCR-Regierungsstipendium erhalten. Grundlagen der Informatik und Forschungsoptimierung. Abschlussnote entspricht 1,5 (deutsches \u00c4quivalent).",
            },
            {
                year: "2022\u20132024",
                title: "IOT-SPEZIALISIERUNG",
                subtitle: "MINOR-ABSCHLUSS // 28,4 ZUS\u00c4TZLICHE ECTS",
                desc: "Zweij\u00e4hriger Minor-Abschluss in Internet of Things neben dem regul\u00e4ren Studium abgeschlossen, mit 28,4 zus\u00e4tzlichen ECTS. Praktische Erfahrung in der Integration von IoT-Systemen mit KI.",
            },
            {
                year: "JUN\u2013JUL 2023",
                title: "MAXGEN TECHNOLOGIES",
                subtitle: "MACHINE-LEARNING-PRAKTIKUM // PVT. LTD.",
                desc: "Sommerpraktikum im Bereich Machine Learning bei Maxgen Technologies. Python, Pandas, NumPy f\u00fcr Datenanalyse und ML-Modellentwicklung eingesetzt.",
            },
            {
                year: "JAN 2024\u2013MAI 2024",
                title: "SAP INDIEN",
                subtitle: "DATA-SCIENCE-PRAKTIKUM // CODEUNNATI",
                desc: "Deep-Analysis-Schicht integriert. IoT-, ML- und Bildverarbeitungspipelines f\u00fcr Industriedatens\u00e4tze entwickelt.",
            },
            {
                year: "FEB 2025\u2013APR 2026",
                title: "DATA EDGE LTD",
                subtitle: "ASSOCIATE SOFTWARE ENGINEER",
                desc: "Echtzeit-Bank\u00fcberwachung (Trust Bank PLC) deployed. ATM-Abstimmungssysteme (BRAC Bank) in der Produktion gewartet.",
            },
            {
                year: "2025\u20132026",
                title: "FORSCHUNGSLABOR",
                subtitle: "LUNGNET-CAM // FEDERATED LEARNING",
                desc: "Neuronale Netzwerkoptimierung f\u00fcr die Onkologie. IEEE-QPAIN-Ver\u00f6ffentlichungen. Attention-basierte Frameworks f\u00fcr medizinische Bildgebung.",
            },
            {
                year: "APR 2026",
                title: "TU DORTMUND",
                subtitle: "M.SC. DATA SCIENCE // DEUTSCHLAND",
                desc: "Master-Protokolle werden derzeit ausgef\u00fchrt. Suche nach Werkstudentenstellen in KI / ML / Software Engineering.",
            },
        ],
    },
    projects: {
        label: "Projektarchive",
        heading: "KERN.",
        headingAccent: "BUILDS",
        viewSource: "QUELLCODE",
        items: [
            {
                title: "KI-RICHTLINIEN-CHATBOT",
                tagline: "FINANZ-QA-AGENT",
                desc: "Interaktiver Chatbot zur Beantwortung von Fragen zu Finanzrichtliniendokumenten. FAISS + Sentence Transformers f\u00fcr semantische Suche mit optionaler OpenAI-GPT-Orchestrierung.",
            },
            {
                title: "TRUST BANK MONITOR",
                tagline: "ECHTZEIT-TRANSAKTIONSKERN",
                desc: "Live-Unternehmenssystem bei Trust Bank PLC & BRAC Bank deployed. Echtzeit-Transaktionsdatenfluss zwischen Linux-Backends und .NET-Frontends via SignalR. Quellcode ist propriet\u00e4r \u2014 NDA-gesch\u00fctzt.",
            },
            {
                title: "MEHRSPRACHIGES RAG",
                tagline: "NEURONALES WISSENSABRUF",
                desc: "End-to-End-RAG-Pipeline mit Unterst\u00fctzung f\u00fcr Englisch & Bengalisch. OCR-Integration, FAISS-Vektorindizierung und OpenAI-Orchestrierung.",
            },
            {
                title: "KREDITKARTENBETRUG",
                tagline: "ANOMALIEERKENNUNG",
                desc: "Neuronales Anomalieerkennungssystem f\u00fcr Kreditkartentransaktionen zur Identifizierung betr\u00fcgerischer Muster in hochdimensionalen Finanzdatenr\u00e4umen.",
            },
            {
                title: "PFLANZENKRANKHEITS-KI",
                tagline: "CV + LLM-DIAGNOSE",
                desc: "Computer-Vision-Modell zur Erkennung von Pflanzenpathologien. Integration mit Meta LLaMA zur L\u00f6sungsgenerierung. Streamlit-Deployment.",
            },
            {
                title: "GEHALTSVORHERSAGE",
                tagline: "ML-REGRESSIONSMODELL",
                desc: "Pr\u00e4diktive Machine-Learning-Anwendung mit Regressionsalgorithmen zur Prognose von Gehaltsspannen basierend auf beruflichen Merkmalen.",
            },
            {
                title: "AERORESCUE AI",
                tagline: "KATASTROPHENSCHUTZ-INTELLIGENZ",
                desc: "Echtzeit-Katastrophenschutzsystem mit YOLOv8 für RGB- und Wärmebild-Sensorfusion. Bietet Survivor Priority Scoring, Multi-Object-Tracking und ein Live-Notfall-Dashboard.",
            },
            {
                title: "CEREBRUM",
                tagline: "ENTERPRISE MULTI-AGENT KI-PLATTFORM",
                desc: "Produktionsreife Open-Source-KI-Plattform, die autonom Daten aufnimmt, spezialisierte KI-Agenten koordiniert, ML-Modelle trainiert und Erkenntnisse generiert.",
            },
            {
                title: "NOVA OS",
                tagline: "KI BETRIEBSSYSTEM",
                desc: "Ein produktionsreifer persönlicher KI-Assistent, inspiriert von JARVIS. Kombiniert KI-Reasoning, Sprachinteraktion, Computer Vision, modulare Agenten und Langzeitgedächtnis.",
            },
        ],
    },
    skills: {
        label: "Neuronale Architektur",
        heading: "TECH.",
        headingAccent: "STACK",
        currentlyLearning: "AKTUELL IN AUSBILDUNG",
    },
    vlog: {
        label: "Entwicklergedanken",
        heading: "BYTES.",
        headingAccent: "LOG",
        subheading: "Rohe Gedanken aus dem Terminal. Kein Hochglanz. Nur Signal.",
    },
    research: {
        label: "Akademische Intelligenz",
        heading: "VER\u00d6FF.",
        headingAccent: "PROTOKOLLE",
        items: [
            {
                status: "STATUS: ANGENOMMEN",
                title: "LUNGNET-CAM: HYBRIDE FALTUNG & ATTENTION",
                venue: "IEEE QPAIN 2026 // MEDIZINISCHE KI",
                abstract: "Ein hochpr\u00e4zises Framework zur CT-basierten Lungenkrebserkennung mit benutzerdefinierten Attention-Gates und Ensemble-Faltungsschichten.",
            },
            {
                status: "STATUS: IN BEGUTACHTUNG",
                title: "RESSOURCENEFFIZIENTES FEDERATED LEARNING",
                venue: "SPICSCON 2026 // VERTEILTES ML",
                abstract: "Adressierung von Non-IID-Datenverteilungsproblemen bei der Tumorklassifikation durch Attention-Ensemble-CNN-Einheiten und f\u00f6derale Aggregation.",
            },
        ],
    },
    contact: {
        label: "Verschl\u00fcsselter Uplink",
        heading: "SYS.",
        headingAccent: "TALK",
        sendButton: "DATENPAKET_SENDEN",
        missionStatus: "MISSIONSSTATUS",
        available: "VERF\u00dcGBAR F\u00dcR KI/ML WERKSTUDENT",
        responseTime: "INTERVIEW-ANTWORT: < 24 STD",
        downloadCV: "LEBENSLAUF HERUNTERLADEN",
        scheduleInterview: "INTERVIEW VEREINBAREN",
        terminalLines: [
            { text: "AUTHENTIFIZIERUNGSPROTOKOLL WIRD INITIALISIERT...", color: "#00ffff" },
            { text: "ZUGRIFF AUF BIOMETRISCHE DATENBANK: R_BISWAS_44", color: "#fff" },
            { text: "KONTAKTKNOTEN WERDEN ENTSCHL\u00dcSSELT...", color: "#9333ea" },
            { text: "PROTOKOLL-STACK (V4.2.0): ONLINE", color: "#00ffff" },
            { text: "----------------------------------------", color: "#334155" },
            { text: "> identit\u00e4t --abrufen", color: "#00ffff" },
            { text: "UID: RUPAM BISWAS", color: "#fff" },
            { text: "ROLLE: KI-INGENIEUR / DATA SCIENCE", color: "#fff" },
            { text: "> standort --synchronisieren", color: "#00ffff" },
            { text: "KOORDINATEN: DORTMUND, DEUTSCHLAND [UTC+2]", color: "#fff" },
            { text: "> status --pr\u00fcfen", color: "#00ffff" },
            { text: "[OK] VERF\u00dcGBAR F\u00dcR WERKSTUDENT", color: "#4ade80" },
            { text: "> kontakt --\u00f6ffnen", color: "#00ffff" },
            { text: "\uD83D\uDCE7 E-MAIL: rupambiswasbd44@gmail.com", color: "#fff" },
            { text: "\uD83D\uDCF1 TELEFON: +49 1521 2378154", color: "#fff" },
            { text: "\uD83D\uDD17 LINKEDIN: linkedin.com/in/rupam-biswas-7788891a7", color: "#fff" },
            { text: "\uD83D\uDC19 GITHUB: Rupam-Biswas44", color: "#fff" },
            { text: "----------------------------------------", color: "#334155" },
            { text: "UPLINK HERGESTELLT. NACHRICHT SENDEN?", color: "#9333ea" },
        ],
        terminalHelp: "Verf\u00fcgbare Befehle: help | projekte | ausbildung | f\u00e4higkeiten | einstellen | whoami | lebenslauf | github | kontakt",
        terminalHired: "\u2705 ZUGANG GEW\u00c4HRT. Interview vereinbart. Antwort innerhalb von 24 Stunden.",
        placeholder: "Befehl eingeben...",
    },
    chatbot: {
        title: "RUPAM FRAGEN",
        subtitle: "KI-ASSISTENT ONLINE",
        placeholder: "Frag mich alles \u00fcber Rupam...",
        send: "SENDEN",
        close: "SCHLIESSEN",
        suggestions: [
            "Welche Projekte hat Rupam gemacht?",
            "Erz\u00e4hl mir von seiner Bankerfahrung.",
            "Kennt er RAG?",
            "Was ist seine Forschung?",
            "Ist er f\u00fcr Werkstudent verf\u00fcgbar?",
        ],
        systemPrompt: `Du bist Rupam Biswas' KI-Portfolio-Assistent. Beantworte Fragen \u00fcber Rupam pr\u00e4zise und professionell auf Deutsch oder Englisch je nach Sprache des Nutzers.

\u00dcber Rupam Biswas:
- M.Sc. Data Science Student an der TU Dortmund (seit April 2026)
- Verf\u00fcgbar f\u00fcr Werkstudent in KI/ML/Software Engineering in Deutschland
- Standort: Dortmund, Deutschland
- E-Mail: rupambiswasbd44@gmail.com | Telefon: +49 1521 2378154

Ausbildung: M.Sc. Data Science TU Dortmund, B.E. Informatik GTU (ICCR-Stipendium, Note 1,5), IoT Minor (28,4 ECTS)
Erfahrung: Software Engineer bei Data Edge Ltd (Banksysteme), SAP India Praktikum, ML-Praktikum Maxgen Technologies.
Projekte: KI-Chatbot, Banksystem (NDA), RAG-Pipeline, Betrugserkennung, Pflanzenkrankheits-KI, Gehaltsvorhersage, semantische Suche.
Forschung: LungNet-CAM (IEEE QPAIN 2026, ANGENOMMEN), Federated Learning (SPICSCON 2026, IN BEGUTACHTUNG).
Lebenslauf: /rupam_biswas_cv.pdf`,
    },
};

type LanguageContextType = {
    lang: Lang;
    t: Translations;
    toggle: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
    lang: "en",
    t: en,
    toggle: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");
    const toggle = () => setLang((l) => (l === "en" ? "de" : "en"));
    const t = lang === "en" ? en : de;
    return (
        <LanguageContext.Provider value={{ lang, t, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
