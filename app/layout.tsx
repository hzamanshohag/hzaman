import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import FooterSection from "@/components/shared/FooterSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hzaman.vercel.app"),

  title: {
    default:
      "Md Hasanuzzaman Shohag | Full-Stack Developer & Digital Marketing Strategist",
    template: "%s | Md Hasanuzzaman Shohag",
  },

  description:
    "Md Hasanuzzaman Shohag is a Full-Stack Developer and Digital Marketing Strategist specializing in Next.js, TypeScript, scalable web applications, SEO, and performance-driven digital solutions.",

  keywords: [
    "Md Hasanuzzaman Shohag",
    "Full Stack Developer",
    "MERN Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Digital Marketing Strategist",
    "SEO Specialist",
    "MongoDB Developer",
  ],

  authors: [{ name: "Md Hasanuzzaman Shohag" }],

  creator: "Md Hasanuzzaman Shohag",

  openGraph: {
    title:
      "Md Hasanuzzaman Shohag | Full-Stack MERN Developer & Digital Marketing Strategist",
    description:
      "Building scalable MERN applications and integrating data-driven marketing strategies to drive measurable business growth.",
    url: "https://hzaman.vercel.app",
    siteName: "Md Hasanuzzaman Shohag Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://hzaman.netlify.app/images/hero/2.png",
        width: 1200,
        height: 630,
        alt: "Md Hasanuzzaman Shohag - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Md Hasanuzzaman Shohag | Full-Stack MERN Developer & Digital Marketing Strategist",
    description:
      "Full-Stack MERN Developer specializing in scalable applications, Next.js, TypeScript, SEO & performance optimization.",
    images: ["https://hzaman.netlify.app/images/hero/2.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <FooterSection />
        {/* ===== JSON-LD SCHEMA ===== */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Md Hasanuzzaman Shohag",
              url: "https://hzaman.vercel.app",
              jobTitle:
                "Full-Stack MERN Developer & Digital Marketing Strategist",
              image: "https://hzaman.netlify.app/images/hero/2.png",
              sameAs: [
                "https://github.com/hzamanshohag",
                "https://www.linkedin.com/in/hzaman-shohag",
              ],
              knowsAbout: [
                "React.js",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "SEO",
                "Digital Marketing",
                "Performance Optimization",
              ],
              description:
                "Full-Stack MERN Developer and Digital Marketing Strategist specializing in scalable web applications and growth-driven digital solutions.",
            }),
          }}
        />
      </body>
    </html>
  );
}
