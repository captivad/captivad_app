import { metadata as baseMetadata } from "@/app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Who We Are",
  keywords: [],
};

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
