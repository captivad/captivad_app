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
  metadataBase: new URL("https://captivad.vercel.app"),
  keywords: [
    "Captivad",
    "Digital Advertising",
    "Digital Advertising",
    "Digital Advertising",
    "Digital Advertising",
  ],

  title: {
    default: "Captivad",
    template: "%s | Captivad",
  },
  openGraph: {
    description:
      "Boost your advertising success with Captivad. Explore expert media strategies, data-driven insights, and cutting-edge tools to elevate your brand and reach your audience effectively.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${dmSans.className} antialiased`}>
        <Toaster position="top-center" reverseOrder={false} />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
