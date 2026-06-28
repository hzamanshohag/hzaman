import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import FooterSection from "@/components/shared/FooterSection";
import HzamanImage from "@/public/hero-img-1.jpg";


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
    default: "Md Hasanuzzaman Shohag | Full-Stack Developer",
    template: "%s | Md Hasanuzzaman Shohag",
  },

  description:
    "Md Hasanuzzaman Shohag is a Junior Full-Stack Developer specializing in Next.js, React, TypeScript, Node.js, Express.js, MongoDB, and building scalable web applications.",

  keywords: [
    "Md Hasanuzzaman Shohag",
    "Hasanuzzaman Shohag",
    "Full Stack Developer",
    "Junior Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Express.js Developer",
    "MongoDB Developer",
    "Portfolio",
  ],

  authors: [
    {
      name: "Md Hasanuzzaman Shohag",
      url: "https://hzaman.vercel.app",
    },
  ],

  creator: "Md Hasanuzzaman Shohag",
  publisher: "Md Hasanuzzaman Shohag",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hzaman.vercel.app",
    siteName: "Hzaman Portfolio",

    title: "Md Hasanuzzaman Shohag | Full-Stack Developer",

    description:
      "Explore the portfolio of Md Hasanuzzaman Shohag, a Junior Full-Stack Developer building modern web applications using React, Next.js, TypeScript, Node.js, Express.js, and MongoDB.",

    images: [
      {
        url: HzamanImage.src,
        width: 1200,
        height: 630,
        alt: "Md Hasanuzzaman Shohag - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Md Hasanuzzaman Shohag | Full-Stack Developer",

    description:
      "Junior Full-Stack Developer passionate about React, Next.js, TypeScript, Node.js, Express.js, MongoDB, and building scalable web applications.",

    creator: "@hzaman_shohag",

    images: [HzamanImage.src],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://hzaman.vercel.app",
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
