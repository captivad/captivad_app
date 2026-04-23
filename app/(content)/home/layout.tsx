import { metadata as baseMetadata } from "@/app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Home",
  description:
    "Boost your advertising success with Captivad. Explore expert media strategies, data-driven insights, and cutting-edge tools to elevate your brand and reach your audience effectively.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
