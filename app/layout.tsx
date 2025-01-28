import type { Metadata } from "next";
import { DM_Sans } from "@next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientProviders from "@/components/client-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || ""),
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

  authors: [{ name: "CaptivAd Team" }],
  creator: "CaptivAd",
  publisher: "CaptivAd",

  title: {
    default: "Captivad",
    template: "%s | Captivad",
  },
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "CaptivAd",
    title:
      "CaptivAd: Complete Brand Transformation & Knowledge Growth Solutions",
    description:
      "Boost your advertising success with Captivad. Explore expert media strategies, data-driven insights, and cutting-edge tools to elevate your brand and reach your audience effectively.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <body className={`${dmSans.className} ${dmSans.className} antialiased`}>
        <Toaster position="top-center" reverseOrder={false} />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
