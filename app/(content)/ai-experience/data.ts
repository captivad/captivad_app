import { Cpu, Globe, Layers, Map, BadgeCheck, Cloud } from "lucide-react";
import {
  AiPhotobooth,
  Camera,
  Images,
  Interactive,
  LoopIcon,
  MultiMediaIcon,
  UpIcon,
} from "@/public";

// ─── PILLARS ────────────────────────────────────────────────────────────────
export const PILLARS = [
  {
    icon: MultiMediaIcon,
    title: "Multi-Modal AI",
    desc: "Text, Image, Voice, Video",
  },
  {
    icon: LoopIcon,
    title: "End-to-End Solutions",
    desc: "Concept → Develop → Launch",
  },
  { icon: UpIcon, title: "Proven Results", desc: "1M+ Reach, 20+ Brands" },
];

// ─── CAPABILITIES ────────────────────────────────────────────────────────────
export const CAPABILITIES = [
  {
    imgSrc: Images,
    isLucide: false,
    title: "Image Generation + Content",
    desc: "Dynamically generate millions of unique visual assets tailored instantly to user inputs and behavioral data.",
    size: "large" as const,
    bgImage:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777223005/AI_Image_Generation_ogrmqd.png",
    features: [
      "Text-to-image for instant food",
      "Auto-generated recipes based on taste & portion",
      "Bilingual output (ID / AR)",
      "Ready to share on WhatsApp & IG",
    ],
  },
  {
    imgSrc: null,
    isLucide: true,
    title: "Neural Voice Synthesis",
    desc: "Cloned brand voices and real-time conversational agents that speak to your audience with unprecedented human nuance.",
    size: "small" as const,
    bgImage: null,
    features: [
      "Two-way calls in Indonesian",
      "Real-time risk analysis & credit scoring",
      "Automated insight recaps + transcripts",
      "CRM integration & WhatsApp follow-up",
    ],
  },
  {
    imgSrc: Interactive,
    isLucide: false,
    title: "Visual Storytelling",
    desc: "Non-linear narrative engines that adapt the storyline based on real-time user choices and metadata.",
    size: "small" as const,
    bgImage: null,
    features: [
      "Consistent AI illustrations per character",
      "Stories & dialogues customizable with child's name",
      "Automatic soothing voice-overs (ID/EN)",
      "Downloadable 10-page PDF book",
    ],
  },
  {
    imgSrc: Camera,
    isLucide: false,
    title: "AI Photobooth Integration",
    desc: "Bridging physical and digital activations with instant, stylized portrait transformations at live events.",
    size: "large" as const,
    bgImage:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776923439/successful-executive-asia-young-businesswoman-smart-casual-wear-drawing-writing-using-pen-with-digital-tablet-computer-thinking-inspiration-search-ideas-working-process-modern-office_1_1_bhgo6c.png",
    features: [
      "Snap photo → instant AI editing",
      "Custom brand overlays & stickers",
      "QR download + lead capture data",
      "Real-time engagement statistics",
    ],
  },
];

// ─── ARCHITECTURE STEPS ──────────────────────────────────────────────────────
export const ARCHITECTURE_STEPS = [
  {
    no: "01",
    title: "Concept & Strategy",
    desc: "Collaborate with Captivad & Rupa.AI to design a unique and impactful AI campaign concept.",
  },
  {
    no: "02",
    title: "AI & Microsite Dev",
    desc: "Rupa.AI team builds your custom AI solutions and interactive microsites.",
  },
  {
    no: "03",
    title: "Launch & Interaction",
    desc: "Your campaign is live! Users are enjoying a stunning, personalized AI experience.",
  },
  {
    no: "04",
    title: "Result & Real Impact",
    desc: "Measure success through engagement, viral reach, and achieving your brand goals.",
  },
];

// ─── SUCCESS STORIES ─────────────────────────────────────────────────────────
export const SUCCESS_STORIES = [
  {
    category: "1000000+ Reach",
    brand: "Moxa: Viral Lebaran Greeting",
    desc: "A highly personalized, AI-generated greeting campaign that drove massive social sharing and brand engagement during the festive season.",
    stats: [
      { value: "#1", label: "Trending Twitter Indonesia" },
      { value: "500+", label: "Media Mentions" },
      { value: "85%", label: "Replay Rate" },
    ],
    thumbnail: "https://img.youtube.com/vi/njKfVi6RBTc/maxresdefault.jpg",
    youtubeId: "njKfVi6RBTc",
    startAt: 5,
    logoBrand:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777393535/logo01_jppgtr.webp",
  },
  {
    category: "521 Vouchers Redeemed",
    brand: "KFC: Interactive Greeting & Voucher",
    desc: "An innovative gamified experience combining AI image generation with direct promotional rewards to drive store footfall.",
    stats: [
      { value: "25%", label: "Conversion Rate" },
      { value: "300%", label: "KPI Increase" },
      { value: "Award", label: "Asia Digital Campaign" },
    ],
    thumbnail: "https://img.youtube.com/vi/KVVJLKqyKHo/maxresdefault.jpg",
    youtubeId: "KVVJLKqyKHo",
    startAt: 3,
    logoBrand:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777393535/clipart2311164_xw4ppq.png",
  },
];

// ─── PARTNERSHIP FEATURES ────────────────────────────────────────────────────
export const PARTNERSHIP_FEATURES = [
  {
    icon: Cpu,
    label: "Multi-Model Tech",
    desc: "We're not just API users. Rupa.AI combines the best AI models and refines them with expert engineering expertise to deliver superior, secure results.",
  },
  {
    icon: Layers,
    label: "Custom Microsites",
    desc: "From Figma concept and design, backend and frontend development, to hosting and post-launch support — the Rupa.AI team handles all technical aspects.",
  },
  {
    icon: Map,
    label: "Local Context",
    desc: "Captivad ensures every AI Xperience is implemented with deep understanding of the Indonesian market, culture, and audience.",
  },
  {
    icon: BadgeCheck,
    label: "Proven Track Record",
    desc: "Our portfolio demonstrates our ability to produce AI campaigns that go viral and are recognized by the industry.",
  },
];

// ─── PROCESSES ───────────────────────────────────────────────────────────────
export const PROCESSES = {
  cloud: {
    label: "Cloud Platform Process",
    icon: Cloud,
    steps: [
      "Fast setup in days",
      "Available template customization",
      "Team training & onboarding",
      "Campaign ready to launch",
    ],
  },
  enterprise: {
    label: "Enterprise Bespoke Process",
    icon: Cpu,
    steps: [
      "Discovery & requirement analysis",
      "Custom development & integration",
      "Testing & quality assurance",
      "Deployment & ongoing support",
    ],
  },
};
