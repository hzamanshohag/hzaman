"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Globe,
  Code,
  Search,
  Layers,
  Server,
  Monitor,
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
import Image, { StaticImageData } from "next/image";
import Loader from "@/components/shared/Loader";
import project1Image from "@/public/img/project/dotmart.png";

// motion-wrapped Next.js Image for whileHover scroll-pan effect
const MotionImage = motion(Image);

interface Project {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  technologies: string[];
  category: "frontend" | "backend" | "fullstack";
  liveUrl?: string;
  githubUrl: {
    frontend?: string;
    backend?: string;
  };
}

// ── Defined OUTSIDE the component so it's a stable reference ──────────────────
 const projects: Project[] = [
   {
     id: "1",
     title: "Dot Mart E-Commerce",
     description:
       "A modern MERN e-commerce platform with authentication, payment integration, admin dashboard, and order management.",
     category: "fullstack",
     image: project1Image,
     technologies: [
       "Next.js",
       "TypeScript",
       "Node.js",
       "Express.js",
       "MongoDB",
       "Tailwind CSS",
     ],
     liveUrl: "https://dotmart.com",
     githubUrl: {
       frontend: "https://github.com/hzamanshohag/dot-mart-client",
       backend: "https://github.com/hzamanshohag/dot-mart-server",
     },
   },
   {
     id: "2",
     title: "Portfolio Website",
     description:
       "Responsive developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
     category: "frontend",
     image: project1Image,
     technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
     liveUrl: "https://portfolio.com",
     githubUrl: {
       frontend: "https://github.com/hzamanshohag/portfolio",
     },
   },
   {
     id: "3",
     title: "REST API",
     description:
       "Secure REST API with JWT authentication, MongoDB, and Express.",
     category: "backend",
     image: project1Image,
     technologies: ["Node.js", "Express.js", "MongoDB"],
     githubUrl: {
       backend: "https://github.com/hzamanshohag/rest-api",
     },
   },
   {
     id: "4",
     title: "PH University Management System",
     description:
       "A university management system with role-based authentication, student enrollment, course management, and admin dashboard.",
     category: "fullstack",
     image: project1Image,
     technologies: [
       "React",
       "Node.js",
       "Express.js",
       "MongoDB",
       "Mongoose",
       "JWT",
       "Redux Toolkit",
     ],
     liveUrl: "https://university-demo.vercel.app",
     githubUrl: {
       frontend: "https://github.com/username/university-client",
       backend: "https://github.com/username/university-server",
     },
   },
   {
     id: "5",
     title: "Restaurant Booking App",
     description:
       "Responsive restaurant reservation platform with online booking, menu browsing, authentication, and booking management.",
     category: "frontend",
     image: project1Image,
     technologies: [
       "Next.js",
       "TypeScript",
       "Tailwind CSS",
       "Shadcn UI",
       "Framer Motion",
     ],
     liveUrl: "https://restaurant-demo.vercel.app",
     githubUrl: {
       frontend: "https://github.com/username/restaurant-booking",
     },
   },
   {
     id: "6",
     title: "Authentication REST API",
     description:
       "Secure REST API implementing JWT authentication, password hashing, role-based authorization, and user management.",
     category: "backend",
     image: project1Image,
     technologies: [
       "Node.js",
       "Express.js",
       "MongoDB",
       "Mongoose",
       "JWT",
       "bcrypt",
       "Zod",
     ],
     githubUrl: {
       backend: "https://github.com/username/auth-api",
     },
   },
   {
     id: "7",
     title: "Real Estate Platform",
     description:
       "Modern property listing platform with advanced search, property management, image gallery, and user authentication.",
     category: "fullstack",
     image: project1Image,
     technologies: [
       "Next.js",
       "TypeScript",
       "Node.js",
       "MongoDB",
       "Tailwind CSS",
       "Cloudinary",
     ],
     liveUrl: "https://real-estate-demo.vercel.app",
     githubUrl: {
       frontend: "https://github.com/username/real-estate-client",
       backend: "https://github.com/username/real-estate-server",
     },
   },
   {
     id: "8",
     title: "Weather Dashboard",
     description:
       "Interactive weather dashboard with location search, 7-day forecasts, responsive UI, and OpenWeather API integration.",
     category: "frontend",
     image: project1Image,
     technologies: ["React", "TypeScript", "Tailwind CSS", "OpenWeather API"],
     liveUrl: "https://weather-demo.vercel.app",
     githubUrl: {
       frontend: "https://github.com/username/weather-dashboard",
     },
   },
   {
     id: "9",
     title: "Blog REST API",
     description:
       "RESTful backend API for blog management featuring CRUD operations, JWT authentication, comments, categories, and role-based permissions.",
     category: "backend",
     image: project1Image,
     technologies: [
       "Node.js",
       "Express.js",
       "MongoDB",
       "Mongoose",
       "JWT",
       "Zod",
     ],
     githubUrl: {
       backend: "https://github.com/username/blog-api",
     },
   },
 ];

const categories = [
  { id: "all" as const, name: "All Projects", icon: <Globe size={18} /> },
  { id: "frontend" as const, name: "Frontend", icon: <Monitor size={18} /> },
  { id: "backend" as const, name: "Backend", icon: <Server size={18} /> },
  { id: "fullstack" as const, name: "Full Stack", icon: <Layers size={18} /> },
];

const PROJECTS_PER_PAGE = 9;

// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  // ── Single state object so category/search changes always reset page atomically
  const [filters, setFilters] = useState<{
    category: "all" | "frontend" | "backend" | "fullstack";
    search: string;
    page: number;
  }>({ category: "all", search: "", page: 1 });

  const {
    category: selectedCategory,
    search: searchTerm,
    page: currentPage,
  } = filters;

  const setSelectedCategory = useCallback(
    (category: "all" | "frontend" | "backend" | "fullstack") =>
      setFilters((f) => ({ ...f, category, page: 1 })),
    [],
  );
  const setSearchTerm = useCallback(
    (search: string) => setFilters((f) => ({ ...f, search, page: 1 })),
    [],
  );
  const setCurrentPage = useCallback(
    (page: number) => setFilters((f) => ({ ...f, page })),
    [],
  );

  // ── FIX 1: actually dismiss the loader ──────────────────────────────────────
  useEffect(() => {
    // Simulate an async data fetch; remove the timeout if you fetch from an API
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    const keyword = searchTerm.toLowerCase();
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchSearch =
        project.title.toLowerCase().includes(keyword) ||
        project.description.toLowerCase().includes(keyword) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(keyword),
        );
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  if (loading) return <Loader />;

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] overflow-hidden">
      {/* ── Background effects ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        {/* ── Hero ── */}
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
            Explore my collection of full-stack applications, frontend
            experiences, and backend solutions
          </p>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <Input
              placeholder="Search projects..."
              className="pl-9 bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-500 rounded-full backdrop-blur-xl focus:border-cyan-400/50 focus:ring-cyan-400/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* ── Empty state ── */}
        {paginatedProjects.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No projects match your search.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-cyan-400 hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── Projects grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, ease: "easeOut" }}
              className="group flex flex-col bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]"
            >
              {/* Thumbnail */}
              <div className="relative h-64 overflow-hidden group">
                {/* Image */}
                <div
                  className="
                    absolute
                    top-0
                    left-0
                    w-full
                    transition-transform
                    duration-[8000ms]
                    ease-linear
                    group-hover:-translate-y-[calc(100%-16rem)]
                  "
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1920}
                    height={4933}
                    className="w-full h-auto"
                  />
                </div>

                {/* Category Badge */}
                <span className="absolute top-3 right-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 backdrop-blur">
                  {project.category}
                </span>
              </div>

              {/* ── Card body ── */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors duration-200 leading-snug">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ── Action buttons pushed to bottom ── */}
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {/* Live demo */}
                  {project.liveUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    </Button>
                  )}

                  {/* Frontend repo */}
                  {project.githubUrl.frontend && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition"
                    >
                      <a
                        href={project.githubUrl.frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        {project.category === "fullstack"
                          ? "Frontend"
                          : "Source Code"}
                      </a>
                    </Button>
                  )}

                  {/* Backend repo */}
                  {project.githubUrl.backend && (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition"
                    >
                      <a
                        href={project.githubUrl.backend}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        {project.category === "fullstack"
                          ? "Backend"
                          : "Source Code"}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="mt-14 flex justify-center">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    className={`
                      cursor-pointer bg-white/5 border border-white/10 text-slate-300
                      hover:bg-cyan-500/20 hover:text-white transition-all duration-300 backdrop-blur-xl
                      ${currentPage === 1 ? "opacity-40 pointer-events-none" : ""}
                    `}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
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
                  },
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(currentPage + 1, totalPages))
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
  );
}
