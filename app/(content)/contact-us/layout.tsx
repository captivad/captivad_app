// app/(content)/home/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us for any inquiries or feedback.",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
