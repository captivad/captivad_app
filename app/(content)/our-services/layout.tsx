// app/(content)/home/layout.tsx
import { baseMetadata } from "@/app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  title:
    "Our Services | Complete Brand Transformation & Knowledge Growth Solutions",
  description:
    "Unlock your brand's full potential with our complete transformation solutions. We empower businesses through strategic development, knowledge growth, and skill enhancement.",
  keywords: [
    "brand transformation",
    "digital brand solutions",
    "comprehensive brand development",
    "knowledge growth",
    "skills enhancement",
    "professional development",
    "creative brand strategies",
    "business transformation",
    "talent development",
    "brand evolution",
  ],
};

export default function OurServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
