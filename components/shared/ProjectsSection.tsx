"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  Code,
  Smartphone,
  Globe,
  Palette,
  Slice,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const projects: Project[] = [
      {
        id: "1",
        title: "Scalable E-Commerce Platform",
        description:
          "High-performance MERN e-commerce solution with secure Stripe payments, cart management, and admin dashboard. Supports multi-vendor architecture and real-time inventory tracking.",
        category: "web",
        image: "https://picsum.photos/seed/ecommerce/800/450.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "2",
        title: "Task Management SaaS",
        description:
          "Real-time collaborative project management built with Next.js. Features Kanban boards, drag & drop, team workspaces, and Slack integration.",
        category: "saas",
        image: "https://picsum.photos/seed/taskapp/800/450.jpg",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "3",
        title: "Telemedicine WebRTC App",
        description:
          "Real-time health consultation platform with video calling, appointment scheduling, and prescription management for doctors and patients.",
        category: "web",
        image: "https://picsum.photos/seed/health/800/450.jpg",
        technologies: ["React", "WebRTC", "Node.js", "MongoDB", "Twilio"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "4",
        title: "SaaS Analytics Dashboard",
        description:
          "Professional data analytics dashboard with real-time charts, custom reporting, and role-based access control for business intelligence.",
        category: "saas",
        image: "https://picsum.photos/seed/dashboard/800/450.jpg",
        technologies: [
          "Next.js",
          "TypeScript",
          "Recharts",
          "Prisma",
          "Supabase",
        ],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "5",
        title: "Real-Time Chat Application",
        description:
          "WhatsApp-like messaging app with rooms, file sharing, read receipts, push notifications, and end-to-end encryption.",
        category: "web",
        image: "https://picsum.photos/seed/chat/800/450.jpg",
        technologies: ["React", "Socket.io", "Node.js", "Redis", "MongoDB"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "6",
        title: "Fitness Tracker Mobile App",
        description:
          "Cross-platform mobile app for workout logging, nutrition tracking, progress charts, and AI-powered exercise recommendations.",
        category: "mobile",
        image: "https://picsum.photos/seed/fitness/800/450.jpg",
        technologies: ["React Native", "TypeScript", "Expo", "Firebase"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "7",
        title: "Portfolio Design System",
        description:
          "Complete design system with reusable components, tokens, and guidelines built for developer portfolios and personal branding.",
        category: "design",
        image: "https://picsum.photos/seed/portfolio/800/450.jpg",
        technologies: ["Figma", "Next.js", "Tailwind CSS", "Storybook"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "8",
        title: "Food Delivery Platform",
        description:
          "Full-featured food ordering system with restaurant onboarding, real-time order tracking, and driver dispatch management.",
        category: "web",
        image: "https://picsum.photos/seed/food/800/450.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Google Maps API"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "9",
        title: "AI Content Generator SaaS",
        description:
          "OpenAI-powered content creation platform for marketers. Generates blog posts, social captions, ad copy, and SEO meta tags at scale.",
        category: "saas",
        image: "https://picsum.photos/seed/aigenerator/800/450.jpg",
        technologies: ["Next.js", "OpenAI API", "Prisma", "Stripe", "Tailwind"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "10",
        title: "Event Booking Mobile App",
        description:
          "Mobile ticketing platform for concerts and events with QR code tickets, seat selection, and payment processing.",
        category: "mobile",
        image: "https://picsum.photos/seed/events/800/450.jpg",
        technologies: ["React Native", "Expo", "Stripe", "Firebase"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "11",
        title: "Blog CMS Platform",
        description:
          "Headless CMS with markdown editor, SEO optimization tools, scheduled publishing, and multi-author support.",
        category: "web",
        image: "https://picsum.photos/seed/blog/800/450.jpg",
        technologies: ["Next.js", "Sanity.io", "TypeScript", "Tailwind"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "12",
        title: "Brand Identity Design",
        description:
          "Complete brand identity and UI kit for a fintech startup — logo, typography, color system, and component library.",
        category: "design",
        image: "https://picsum.photos/seed/brand/800/450.jpg",
        technologies: ["Figma", "Adobe Illustrator", "Framer"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "13",
        title: "HR Management System",
        description:
          "Enterprise HR platform with employee onboarding, leave management, payroll processing, and performance review workflows.",
        category: "saas",
        image: "https://picsum.photos/seed/hr/800/450.jpg",
        technologies: [
          "React",
          "Node.js",
          "PostgreSQL",
          "Prisma",
          "TypeScript",
        ],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "14",
        title: "Crypto Portfolio Tracker",
        description:
          "Live cryptocurrency dashboard with portfolio analytics, price alerts, and market data from multiple exchanges.",
        category: "web",
        image: "https://picsum.photos/seed/crypto/800/450.jpg",
        technologies: ["React", "TypeScript", "CoinGecko API", "Recharts"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        id: "15",
        title: "Learning Management System",
        description:
          "E-learning platform with video courses, quizzes, certificates, progress tracking, and instructor dashboards.",
        category: "saas",
        image: "https://picsum.photos/seed/lms/800/450.jpg",
        technologies: ["Next.js", "MongoDB", "Cloudinary", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
      },
    ];

  const categories = [
    { id: "all", name: "All Projects", icon: <Globe size={18} /> },
    { id: "web", name: "Web Applications", icon: <Code size={18} /> },
    { id: "mobile", name: "Mobile Apps", icon: <Smartphone size={18} /> },
    { id: "design", name: "UI / UX Design", icon: <Palette size={18} /> },
  ];

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
    >
      {/* ================= BACKGROUND EFFECTS ================= */}

      {/* Cyan Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ======================================================= */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Projects
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Scalable web applications and SaaS platforms built with MERN,
            Next.js, and TypeScript — focused on performance and business
            growth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition group"
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="
        rounded-full 
        border border-white/20 
        text-slate-300 
        bg-white/10 
        hover:border-cyan-400 
        hover:text-cyan-400 
        hover:bg-cyan-400/10
        transition-all duration-300
      "
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All — only shows if there are more than 6 */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-14">
            <Link href="/projects">
              <Button
                size="lg"
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white shadow-lg"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
