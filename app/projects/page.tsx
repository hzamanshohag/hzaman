"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Globe,
  Code,
  Smartphone,
  Palette,
  Search,
  X,
  Layers,
  Tag,
  Star,
  ArrowUpRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Loader from "@/components/shared/Loader";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "web" | "mobile" | "design" | "saas" | "other";
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 9;

  /* ---------------- PROJECT DATA ---------------- */
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
      technologies: ["Next.js", "TypeScript", "Recharts", "Prisma", "Supabase"],
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
      githubUrl: "#"
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
      technologies: ["React", "Node.js", "PostgreSQL", "Prisma", "TypeScript"],
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
    { id: "all", name: "All", icon: <Layers size={15} /> },
    { id: "web", name: "Web Apps", icon: <Globe size={15} /> },
    { id: "saas", name: "SaaS", icon: <Code size={15} /> },
    { id: "mobile", name: "Mobile", icon: <Smartphone size={15} /> },
    { id: "design", name: "Design", icon: <Palette size={15} /> },
    { id: "other", name: "Other", icon: <Tag size={15} /> },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE,
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AnimatePresence>
      <section className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* ================= HERO SECTION ================= */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6"
            >
              <Code size={14} />
              Featured Work
            </motion.span>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              My Creative{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Project Library
              </span>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />

            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Scalable web apps, SaaS platforms, mobile applications, and design
              systems — built with MERN, Next.js, and TypeScript.
            </p>
          </motion.div>

          {/* ================= FILTER BAR ================= */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => {
                const isActive = selectedCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, ease: "easeOut" }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium
                      transition-all duration-300 whitespace-nowrap backdrop-blur-xl border border-white/10
                      ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white scale-[1.03]"
                          : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    {category.icon}
                    {category.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-sm -z-10"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64 md:ml-auto">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                placeholder="Search projects..."
                className="pl-9 bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-500 rounded-full backdrop-blur-xl focus:border-cyan-400/50 focus:ring-cyan-400/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          {/* ================= PROJECTS GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map((project) => (
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

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="mt-14 flex justify-center">
              <Pagination>
                <PaginationContent className="gap-2">
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={`
                        cursor-pointer bg-white/5 border border-white/10 text-slate-300
                        hover:bg-cyan-500/20 hover:text-white transition-all duration-300 backdrop-blur-xl
                        ${currentPage === 1 ? "opacity-40 pointer-events-none" : ""}
                      `}
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={isActive}
                          className={`
                            cursor-pointer rounded-lg border transition-all duration-300 backdrop-blur-xl
                            ${
                              isActive
                                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20 scale-105"
                                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                            }
                          `}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={`
                        cursor-pointer bg-white/5 border border-white/10 text-slate-300
                        hover:bg-cyan-500/20 hover:text-white transition-all duration-300 backdrop-blur-xl
                        ${currentPage === totalPages ? "opacity-40 pointer-events-none" : ""}
                      `}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </AnimatePresence>
  );
}
