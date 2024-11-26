// app/(content)/home/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Captivad | Our Services",
  description: "Learn more about our services",
};

export default function OurServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
