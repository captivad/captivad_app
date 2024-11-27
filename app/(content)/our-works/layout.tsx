import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Captivad | Our Services",
  description: "Learn more about our services",
};

export default function OurWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
