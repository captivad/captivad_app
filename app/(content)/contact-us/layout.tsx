// app/(content)/home/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Captivad | Home",
  description: "Welcome to Captiad",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
