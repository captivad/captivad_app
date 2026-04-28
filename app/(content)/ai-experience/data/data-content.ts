// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

import { MultiMediaIcon, LoopIcon, UpIcon } from "@/public";
import { Camera, Cpu, Film, Globe, ImageIcon, Mic } from "lucide-react";

const PILLARS = [
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
  {
    icon: UpIcon,
    title: "Proven Results",
    desc: "1M+ Reach, 20+ Brands",
  },
];

const CAPABILITIES = [
  {
    icon: ImageIcon,
    title: "Image Generation + Content",
    desc: "Dynamically generate millions of unique visual assets tailored instantly to user inputs and behavioral data.",
    size: "large", // spans 2 cols
  },
  {
    icon: Mic,
    title: "Neural Voice Synthesis",
    desc: "Cloned brand voices and real-time conversational agents that speak to your audience with unprecedented human nuance.",
    size: "small",
  },
  {
    icon: Film,
    title: "Interactive Storytelling",
    desc: "Non-linear narrative engines that adapt the storyline based on real-time user choices and metadata.",
    size: "small",
  },
  {
    icon: Camera,
    title: "AI Photobooth Integration",
    desc: "Bridging physical and digital activations with instant, stylized portrait transformations at live events.",
    size: "small",
  },
];

const ARCHITECTURE_STEPS = [
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

const SUCCESS_STORIES = [
  {
    category: "FINANCIAL SERVICES",
    brand: "Moxa: Viral Lebaran Greeting",
    desc: "A highly personalized, AI-generated greeting campaign that drove massive social sharing and brand engagement during the festive season.",
    stats: [
      { value: "#1", label: "Trending Twitter Indonesia" },
      { value: "500+", label: "Media Mentions" },
      { value: "85%", label: "Replay Rate" },
    ],
    img: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1777084651/6733b0bb41a63018dccaaf7e_Screens-Outfront-Media-TSQ-Tower-Furiosa-ad_zgxfbq.jpg",
  },
  {
    category: "QSR RETAIL",
    brand: "KFC: Interactive Greeting & Voucher",
    desc: "An innovative gamified experience combining AI image generation with direct promotional rewards to drive store footfall.",
    stats: [
      { value: "25%", label: "Conversion Rate" },
      { value: "300%", label: "KPI Increase" },
      { value: "Award", label: "Asia Digital Campaign" },
    ],
    img: "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1776923439/successful-executive-asia-young-businesswoman-smart-casual-wear-drawing-writing-using-pen-with-digital-tablet-computer-thinking-inspiration-search-ideas-working-process-modern-office_1_1_bhgo6c.png",
  },
];

const PROCESSES = {
  cloud: {
    label: "Cloud Platform Process",
    icon: Globe,
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

export {
  PILLARS,
  CAPABILITIES,
  ARCHITECTURE_STEPS,
  SUCCESS_STORIES,
  PROCESSES,
};
