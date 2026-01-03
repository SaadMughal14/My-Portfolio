
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  tech: string;
  link?: string;
  accent: string;
  version?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "project-outreach",
    title: "Project Outreach",
    subtitle: "Agency OS // B2B Command Center",
    version: "v3.0.1",
    description: [
      "Automates lead discovery and hyper-personalized messaging to solve manual prospecting inefficiencies.",
      "Utilizes Gemini 3 Pro with Google Search tool for real-time grounding and synthetic script generation.",
      "Production-ready tactical dashboard with automated batch delivery via SMTP2GO.",
      "Persistent data synchronization through Supabase for high-conversion scalable pipelines."
    ],
    tech: "Gemini 3 Pro, Google Search Tool, Next.js, Supabase, SMTP2GO",
    link: "https://operator1-prospects4-cs2.vercel.app",
    accent: "#a3ff00"
  },
  {
    id: "operator-cs",
    title: "Operator - Control Systems",
    subtitle: "Industrial Digital Storefront",
    version: "v1.0.0",
    description: [
      "Elite technical showcase for high-performance industrial control systems (SCADA).",
      "Prioritizes millisecond-level precision, Zero Trust security, and high-fidelity visualization.",
      "Architected for integration with Gemini 3 Pro for predictive maintenance logic.",
      "Serves as my company's 'billion-dollar face' to demonstrate deployment-ready capabilities."
    ],
    tech: "React, SCADA Visualization, Zero Trust Security, Gemini 3 Pro Ready",
    link: "https://operator-cs.vercel.app",
    accent: "#bf00ff"
  },
  {
    id: "pharma-vision",
    title: "PHARMA-VISION",
    subtitle: "Clean Room Digital Twin HMI",
    version: "v2.2.0",
    description: [
      "Monitors sterile filling lines to prevent batch contamination and equipment failure.",
      "Utilizes Gemini 3 Flash to analyze complex telemetry and provide predictive maintenance insights.",
      "Physics-based conveyor animations and integrated environmental gauges for GMP-grade support.",
      "Automated defect detection system to eliminate manual inspection errors."
    ],
    tech: "Gemini 3 Flash, React, Physics Engine, Real-time Telemetry",
    link: "https://pharma-vision.vercel.app",
    accent: "#00f5ff"
  },
  {
    id: "project-dispatch",
    title: "Project DISPATCH",
    subtitle: "Automated Logistics Dashboard",
    version: "v2.5.0",
    description: [
      "Optimizes HVAC technician routing to solve real-world fleet inefficiency and communication delays.",
      "Utilizes Gemini 2.5 Flash to generate professional radio-style dispatch messages.",
      "Interactive vector/satellite mapping with real-time telemetry analysis.",
      "Live performance charting with Recharts and persistent fleet management."
    ],
    tech: "Gemini 2.5 Flash, React, Recharts, LocalStorage, Maps API",
    link: "https://project-dispatch-psi.vercel.app",
    accent: "#a3ff00"
  },
  {
    id: "sync-ops",
    title: "Project SYNC // OPS",
    subtitle: "Intelligent Automation Hub",
    version: "v2.1.0",
    description: [
      "Bridges Shopify, Airtable, and Slack to solve manual order monitoring bottlenecks.",
      "Transforms raw data into insights like VIP alerts or reorder protocols using Gemini 2.5 Flash.",
      "High-fidelity topology visualizer with real-time metrics and configuration suite.",
      "Utilizes Shopify Webhooks and Airtable API for intelligent record-keeping."
    ],
    tech: "Gemini 2.5 Flash, Shopify Webhooks, Airtable API, Slack Integration",
    link: "https://project-sync-ops.vercel.app",
    accent: "#00f5ff"
  },
  {
    id: "pulse-lake",
    title: "Project PULSE",
    subtitle: "Autonomous Infrastructure Monitor",
    version: "v1.8.4",
    description: [
      "Autonomous health monitoring tracking CPU, memory, and latency across server nodes.",
      "Root cause analysis performed by Gemini 2.5 Flash on error logs during service crashes.",
      "Triggers automated 'restart protocol' state machine for zero-touch restoration.",
      "Instant detection of service interruptions with intelligent response."
    ],
    tech: "Gemini 2.5 Flash, Node Telemetry, State Machines, Root Cause Analysis",
    link: "https://project-pulse-lake.vercel.app",
    accent: "#ff0044"
  },
  {
    id: "amplify",
    title: "Project AMPLIFY",
    subtitle: "AI Distribution Engine",
    version: "v2.0.0",
    description: [
      "Automates short-form video repurposing for TikTok, Reels, and YouTube Shorts.",
      "Gemini 2.5 Flash high-speed visual analysis with JSON Response Schema enforcement.",
      "Enterprise-ready white-label dashboard with campaign history tracking.",
      "Optimizes viral-ready content Repurposing with Structured Metadata."
    ],
    tech: "Gemini 2.5 Flash, JSON Schema, Browser APIs, Tailwind CSS",
    link: "https://project-amplify-beige.vercel.app",
    accent: "#bf00ff"
  },
  {
    id: "booking-zeta",
    title: "Project BOOKING",
    subtitle: "Practice Management AI",
    version: "v1.2.0",
    description: [
      "Matches high-priority waitlisted patients to vacated slots using Gemini 2.5 Flash.",
      "Drafts personalized SMS/WhatsApp confirmations to eliminate revenue loss.",
      "Dynamic white-labeling theme studio and persistent data engine.",
      "Solves the challenge of empty clinical chairs via intelligent patient matching."
    ],
    tech: "Gemini 2.5 Flash, Structured JSON, LocalStorage, React",
    link: "https://project-booking-zeta.vercel.app",
    accent: "#a3ff00"
  },
  {
    id: "scout-os",
    title: "Project SCOUT",
    subtitle: "Automated Recruitment OS",
    version: "v2.4.0",
    description: [
      "Parses PDF resumes and scores candidates against job criteria using AI.",
      "Structured JSON extraction of precise skills and experience via Gemini 2.5 Flash.",
      "One-click Google Calendar scheduling and pre-filled email automation.",
      "Solves the manual bottleneck of high-volume HR screening."
    ],
    tech: "Gemini 2.5 Flash, PDF Parsing, Google Calendar API, React",
    link: "https://project-scout.vercel.app",
    accent: "#00f5ff"
  },
  {
    id: "lumina-ai",
    title: "Lumina Support AI",
    subtitle: "Autonomous E-commerce Concierge",
    version: "v3.1.0",
    description: [
      "Automates FAQ resolution, order tracking, and complex return inquiries.",
      "Gemini 2.5 Flash function calling for real-time interaction with business logic.",
      "Dual-view dashboard with a 'Setup Wizard' for instant brand deployment.",
      "Elegant customer interface paired with detailed system monitoring."
    ],
    tech: "Gemini 2.5 Flash, Function Calling, Setup Wizard, Mock-DB",
    link: "https://lumina-support-ai.vercel.app",
    accent: "#bf00ff"
  },
  {
    id: "stockpile",
    title: "Project STOCKPILE",
    subtitle: "High-Fidelity Inventory Dashboard",
    version: "v2.5.0",
    description: [
      "Synchronizes stock levels across Shopify, Amazon, and physical POS in real-time.",
      "Proactive supply chain risk analysis powered by Gemini 2.5 Flash.",
      "Developer-centric JSON webhook injector for testing realistic sync engines.",
      "Prevents overselling by mimicking live API traffic across connected channels."
    ],
    tech: "Gemini 2.5 Flash, Webhooks, Shopify/Amazon Simulation, LocalStorage",
    link: "https://project-stockpile-jade.vercel.app",
    accent: "#a3ff00"
  },
  {
    id: "extract-ai",
    title: "Project EXTRACT",
    subtitle: "Automated Financial Pipeline",
    version: "v2.0.0",
    description: [
      "Instantly parses PDF and image invoices using multimodal Gemini 2.5 Flash.",
      "Structured JSON Schema enforcement for categorization and data extraction.",
      "Interactive AI document auditing (chat) and webhook-ready ERP synchronization.",
      "Transforms raw financial files into actionable accounting data."
    ],
    tech: "Gemini 2.5 Flash, Multimodal OCR, JSON Schema, React",
    link: "https://project-extract.vercel.app",
    accent: "#00f5ff"
  },
  {
    id: "nexus-logic",
    title: "NEXUS",
    subtitle: "Digital Logic Architect",
    version: "v2.5.0",
    description: [
      "Simplifies design and simulation of complex circuits from natural language prompts.",
      "Zen ADHD focus mode with automated Truth Table analysis.",
      "Gemini 2.5 Flash structured JSON generation for circuit architecture.",
      "Crash-proof workflow with Auto-Save and 3-session recovery history."
    ],
    tech: "Gemini 2.5 Flash, Logic Simulation, Truth Table Analysis, React",
    link: "https://nexus-logic-architect.vercel.app",
    accent: "#a3ff00"
  }
];

export const EXPERIENCE = [
  {
    title: "Founder & Technical Lead",
    company: "Operator Control Systems",
    period: "2025 – Present",
    bullets: [
      "Founded industrial control systems company building modern HMI/SCADA solutions.",
      "Developed high-fidelity AI-powered platforms (Project Outreach, Pharma Vision) as core company assets.",
      "Spearheaded multi-industry deployment of Zero Trust industrial architectures.",
      "Leading R&D for predictive maintenance logic using Gemini 3 Pro."
    ]
  },
  {
    title: "E-Commerce Entrepreneur",
    company: "Watch Mafia & Multiple Brands",
    period: "2021 – 2024",
    bullets: [
      "Founded and scaled multiple profitable brands using advanced SEO and marketing automation.",
      "Developed internal AI tools to manage inventory and client acquisition at scale.",
      "Successfully exited 5 e-commerce brands."
    ]
  }
];

export const SKILLS = {
  "AI & Agentic": "Gemini 2.5/3, LLM Orchestration, Function Calling, JSON Schema Extraction",
  "Full-Stack": "React, Next.js, TypeScript, Node.js, Supabase, PostgreSQL",
  "Industrial Tech": "HMI/SCADA, OPC UA, Industrial IoT, Real-time Telemetry Systems",
  "DevOps & Utils": "Docker, Webhooks, SMTP2GO, Recharts, Canvas API"
};
