import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#121212" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Mithun Gowda B | Full-Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Mithun Gowda B - Engineering student at DBIT, Co-Founder of NextGenXplorrers, full-stack developer, and open-source contributor specializing in AI frameworks, mobile apps, and web development.",
  keywords: [
    "Mithun Gowda B",
    "Full-Stack Developer",
    "AI Developer",
    "Open Source",
    "React",
    "Next.js",
    "Python",
    "Flutter",
    "SuperClaude",
    "NextGenXplorrers",
    "DBIT",
    "Don Bosco Institute of Technology",
  ],
  authors: [{ name: "Mithun Gowda B" }],
  icons: {
    icon: "/99024517.jpeg",
    shortcut: "/99024517.jpeg",
    apple: "/99024517.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mithun50.github.io",
    title: "Mithun Gowda B | Full-Stack Developer & AI Enthusiast",
    description:
      "Portfolio of Mithun Gowda B - Engineering student at DBIT, Co-Founder of NextGenXplorrers",
    siteName: "Mithun Gowda B Portfolio",
    images: [
      {
        url: "https://github.com/mithun50.png",
        width: 400,
        height: 400,
        alt: "Mithun Gowda B",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithun Gowda B | Full-Stack Developer & AI Enthusiast",
    description:
      "Portfolio of Mithun Gowda B - Engineering student at DBIT, Co-Founder of NextGenXplorrers",
    images: ["https://github.com/mithun50.png"],
    creator: "@MithunGowdaB",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
