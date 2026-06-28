"use client";

import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Globe,
  Code,
  Search,
  Layers,
  Server,
  Monitor,
  X,
  CheckCircle2,
  Sparkles,
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
import smartithubbd from "@/public/img/project/smartithubbd.com.png";

/* ─────────────── Types ─────────────── */

interface Project {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  category: "frontend" | "backend" | "fullstack";
  liveUrl?: string;
  githubUrl: { frontend?: string; backend?: string };
  keyFeatures: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
  };
}

/* ─────────────── Modal Component ─────────────── */

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Flatten tech stack for the simplified single-row layout
  const allTechs = [
    ...(project.techStack.frontend ?? []),
    ...(project.techStack.backend ?? []),
    ...(project.techStack.database ?? []),
    ...(project.techStack.tools ?? []),
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Added overflow-hidden to prevent the 1920px wide image from causing horizontal scroll inside the modal */}
        <motion.div
          className="group relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl shadow-black/60"
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 24, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button (Matches Freelance exactly) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 text-white hover:bg-red-500 transition"
          >
            <X size={18} />
          </button>

          {/* Image Header */}
          <div className="relative h-56 overflow-hidden">
            <div className="absolute top-0 left-0 w-full transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[calc(100%-14rem)]">
              <Image
                src={project.image}
                alt={project.title}
                width={1920}
                height={4933}
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/30 to-transparent" />

            {/* Category Badge Overlay */}
            <div className="absolute bottom-4 left-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-cyan-400/20 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                <Monitor size={11} />
                {project.category}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl text-white font-bold mb-3 break-words">
              {project.title}
            </h3>
            <p className="text-slate-400 mb-5 leading-relaxed">
              {project.description}
            </p>

            {/* Key Features (Matches Freelance Achievements layout) */}
            <div className="mb-5">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-medium">
                Key Features
              </p>
              <div className="flex flex-col gap-1.5">
                {project.keyFeatures.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-slate-300 text-sm"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-cyan-400 shrink-0 mt-0.5"
                    />
                    <span className="break-words">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack (Matches Freelance layout) */}
            <div className="mb-6">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-medium">
                Tech Stack
              </p>
              {/* Added flex-wrap to ensure tags don't cause horizontal scroll */}
              <div className="flex flex-wrap gap-2">
                {allTechs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons (Matches Freelance layout) */}
            <div className="flex flex-col sm:flex-row gap-3">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="flex-1 min-w-0"
                >
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl">
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </Button>
                </Link>
              )}
              {project.githubUrl.frontend && (
                <Link
                  href={project.githubUrl.frontend}
                  target="_blank"
                  className="flex-1 min-w-0"
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition"
                  >
                    <Github size={16} className="mr-2" />
                    {project.category === "fullstack"
                      ? "Frontend"
                      : "Source Code"}
                  </Button>
                </Link>
              )}
              {project.githubUrl.backend && (
                <Link
                  href={project.githubUrl.backend}
                  target="_blank"
                  className="min-w-0"
                >
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition"
                  >
                    <Github size={16} className="mr-2" />
                    Backend
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};;

/* ─────────────── Data ─────────────── */

 const projects: Project[] = [
   {
     id: "1",
     title: "Dot Mart E-Commerce Platform",
     description:
       "A high-performance MERN e-commerce platform featuring product search with filters, Stripe payment integration, an admin dashboard with sales analytics, and real-time order tracking.",
     category: "fullstack",
     image: project1Image,
     liveUrl: "https://dotmart.com",
     githubUrl: {
       frontend: "https://github.com/hzamanshohag/dot-mart-client",
       backend: "https://github.com/hzamanshohag/dot-mart-server",
     },
     keyFeatures: [
       "JWT & social login authentication",
       "Product search, filtering & pagination",
       "Stripe payment gateway integration",
       "Admin dashboard with analytics",
       "Order tracking & email notifications",
       "Responsive design with dark mode",
     ],
     techStack: {
       frontend: [
         "Next.js",
         "TypeScript",
         "Tailwind CSS",
         "Redux Toolkit",
         "Shadcn UI",
       ],
       backend: ["Node.js", "Express.js", "JWT", "Stripe API", "Nodemailer"],
       database: ["MongoDB", "Mongoose"],
       tools: ["Vercel", "Git", "Postman"],
     },
   },
   {
     id: "2",
     title: "Developer Portfolio",
     description:
       "A responsive personal portfolio built with Next.js and Framer Motion, featuring smooth scroll-triggered animations, project filtering, and SEO optimization.",
     category: "frontend",
     image: smartithubbd,
     liveUrl: "https://smartithubbd.com",
     githubUrl: {
       frontend: "https://github.com/hzamanshohag/portfolio",
     },
     keyFeatures: [
       "Scroll-triggered Framer Motion animations",
       "Fully responsive across all breakpoints",
       "Dark theme with gradient glow effects",
       "Contact form with client-side validation",
       "Project showcase with category filtering",
       "SEO optimized with dynamic meta tags",
     ],
     techStack: {
       frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
       tools: ["Vercel", "Git"],
     },
   },
   {
     id: "3",
     title: "Secure REST API Service",
     description:
       "A production-ready REST API with JWT authentication, role-based access control, input validation with Zod, and comprehensive Swagger documentation.",
     category: "backend",
     image: project1Image,
     githubUrl: {
       backend: "https://github.com/hzamanshohag/rest-api",
     },
     keyFeatures: [
       "JWT-based auth & role-based access",
       "Input validation with Zod schemas",
       "Global error handling middleware",
       "API rate limiting & security headers",
       "Password hashing with bcrypt",
       "Swagger API documentation",
     ],
     techStack: {
       backend: ["Node.js", "Express.js", "JWT", "bcrypt", "Zod", "Swagger"],
       database: ["MongoDB", "Mongoose"],
       tools: ["Postman", "Thunder Client", "Git"],
     },
   },
   {
     id: "4",
     title: "University Management System",
     description:
       "A comprehensive university management platform with multi-role authentication, student enrollment, course scheduling, grade management, and analytics dashboards.",
     category: "fullstack",
     image: project1Image,
     liveUrl: "https://university-demo.vercel.app",
     githubUrl: {
       frontend: "https://github.com/username/university-client",
       backend: "https://github.com/username/university-server",
     },
     keyFeatures: [
       "Multi-role auth (Admin / Faculty / Student)",
       "Student enrollment & profile management",
       "Course registration & scheduling",
       "Grade management & transcript generation",
       "Faculty assignment & workload tracking",
       "Dashboard with analytics & reports",
     ],
     techStack: {
       frontend: ["React", "Redux Toolkit", "Tailwind CSS", "React Router"],
       backend: ["Node.js", "Express.js", "JWT", "Multer"],
       database: ["MongoDB", "Mongoose"],
       tools: ["Vercel", "Render", "Git"],
     },
   },
   {
     id: "5",
     title: "Restaurant Booking App",
     description:
       "A visually rich restaurant reservation platform with interactive menu browsing, real-time table availability, online booking, and a customer review system.",
     category: "frontend",
     image: project1Image,
     liveUrl: "https://restaurant-demo.vercel.app",
     githubUrl: {
       frontend: "https://github.com/username/restaurant-booking",
     },
     keyFeatures: [
       "Interactive menu with category filtering",
       "Real-time table availability checker",
       "Online reservation with date/time picker",
       "Order customization & special requests",
       "Responsive image gallery with lightbox",
       "Customer reviews & ratings section",
     ],
     techStack: {
       frontend: ["Next.js", "TypeScript", "Shadcn UI", "Framer Motion", "Zod"],
       tools: ["Vercel", "Git"],
     },
   },
   {
     id: "6",
     title: "Authentication Microservice",
     description:
       "A dedicated auth microservice implementing JWT refresh-token rotation, email verification, password reset flows, and account lockout policies.",
     category: "backend",
     image: project1Image,
     githubUrl: {
       backend: "https://github.com/username/auth-api",
     },
     keyFeatures: [
       "Secure registration & login with JWT",
       "Password reset via email tokens",
       "Email verification on signup",
       "Refresh token rotation strategy",
       "Account lockout after failed attempts",
       "Comprehensive input validation",
     ],
     techStack: {
       backend: ["Node.js", "Express.js", "JWT", "bcrypt", "Zod", "Nodemailer"],
       database: ["MongoDB", "Mongoose"],
       tools: ["Postman", "Git"],
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

/* ─────────────── Main Page Component ─────────────── */

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  const [filters, setFilters] = useState<{
    category: "all" | "frontend" | "backend" | "fullstack";
    search: string;
    page: number;
  }>({ category: "all", search: "", page: 1 });

  const { category: selectedCategory, search: searchTerm, page: currentPage } = filters;

  const setSelectedCategory = useCallback(
    (category: "all" | "frontend" | "backend" | "fullstack") =>
      setFilters((f) => ({ ...f, category, page: 1 })),
    []
  );
  const setSearchTerm = useCallback(
    (search: string) => setFilters((f) => ({ ...f, search, page: 1 })),
    []
  );
  const setCurrentPage = useCallback(
    (page: number) => setFilters((f) => ({ ...f, page })),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    const keyword = searchTerm.toLowerCase();
    return projects.filter((project) => {
      const matchCategory = selectedCategory === "all" || project.category === selectedCategory;
      const matchSearch =
        project.title.toLowerCase().includes(keyword) ||
        project.description.toLowerCase().includes(keyword) ||
        project.techStack.frontend?.some((tech) => tech.toLowerCase().includes(keyword)) ||
        project.techStack.backend?.some((tech) => tech.toLowerCase().includes(keyword)) ||
        project.techStack.database?.some((tech) => tech.toLowerCase().includes(keyword)) ||
        project.techStack.tools?.some((tech) => tech.toLowerCase().includes(keyword));
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
    <>
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <section className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
              <Code size={14} /> Featured Work
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              My Creative{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Project Library</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Explore my collection of full-stack applications, frontend experiences, and backend solutions</p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div className="flex flex-col md:flex-row items-center gap-4 mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => {
                const isActive = selectedCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap backdrop-blur-xl border border-white/10 ${isActive ? "bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white scale-[1.03]" : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`}
                  >
                    {category.icon}
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
            <div className="relative w-full md:w-64 md:ml-auto">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <Input
                placeholder="Search projects..."
                className="pl-9 bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-500 rounded-full backdrop-blur-xl focus:border-cyan-400/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Empty State */}
          {paginatedProjects.length === 0 && (
            <div className="text-center py-20 text-slate-500 bg-white/[0.02] rounded-2xl border border-white/5">
              <p className="text-lg mb-2">No projects match your search.</p>
              <button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }} className="text-cyan-400 hover:underline text-sm">Clear filters</button>
            </div>
          )}

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
                     {/* FIX: Added overflow-x-hidden to prevent large images from breaking out on mobile */}
                     <motion.div
                       key={selectedCategory}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -20 }}
                       transition={{ duration: 0.3 }}
                       className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 md:gap-8 overflow-x-hidden"
                     >
                       {filteredProjects.slice(0, 6).map((project, index) => (
                         <motion.div
                           key={project.id}
                           initial={{ opacity: 0, y: 24 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: index * 0.06, ease: "easeOut" }}
                           className="group flex flex-col bg-white/[0.03] backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] min-w-0"
                         >
                           {/* ── Thumbnail ── */}
                           <div className="relative h-44 sm:h-52 md:h-56 overflow-hidden">
                             <div className="absolute top-0 left-0 w-full transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[calc(100%-14rem)] sm:group-hover:-translate-y-[calc(100%-16rem)]">
                               <Image
                                 src={project.image}
                                 alt={project.title}
                                 width={1920}
                                 height={4933}
                                 className="w-full h-auto"
                                 sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                               />
                             </div>
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                             <span className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 z-20 rounded-full bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-cyan-400 border border-cyan-400/20">
                               {project.category}
                             </span>
                           </div>
         
                           {/* ── Card Body ── */}
                           {/* FIX: Added min-w-0 to prevent flex text from overflowing horizontally */}
                           <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6 min-w-0">
                             {/* Title */}
                             <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2 group-hover:text-cyan-400 transition-colors duration-200 leading-snug break-words">
                               {project.title}
                             </h3>
         
                             {/* Description */}
                             <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                               {project.description}
                             </p>
         
                             {/* ── Compact Tech Tags ── */}
                             <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                               {[
                                 ...(project.techStack.frontend ?? []),
                                 ...(project.techStack.backend ?? []),
                                 ...(project.techStack.database ?? []),
                               ]
                                 .slice(0, 4)
                                 .map((tech) => (
                                   <span
                                     key={tech}
                                     className="px-2 sm:px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] sm:text-xs font-medium whitespace-nowrap"
                                   >
                                     {tech}
                                   </span>
                                 ))}
                               {[
                                 ...(project.techStack.frontend ?? []),
                                 ...(project.techStack.backend ?? []),
                                 ...(project.techStack.database ?? []),
                                 ...(project.techStack.tools ?? []),
                               ].length > 4 && (
                                 <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-[10px] sm:text-xs font-medium whitespace-nowrap">
                                   +
                                   {[
                                     ...(project.techStack.frontend ?? []),
                                     ...(project.techStack.backend ?? []),
                                     ...(project.techStack.database ?? []),
                                     ...(project.techStack.tools ?? []),
                                   ].length - 4}
                                 </span>
                               )}
                             </div>
         
                             {/* ── View Details Button ── */}
                             <button
                               onClick={() => setActiveProject(project)}
                               className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 mb-3 sm:mb-4 py-1.5 sm:py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10 hover:border-cyan-500/25 hover:bg-cyan-500/10 w-full"
                             >
                               <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" />
                               View Details
                             </button>
         
                             {/* ── Action Buttons ── */}
                             {/* FIX: Added min-w-0 here too so wrapped buttons don't push layout */}
                             <div className="mt-auto flex flex-wrap gap-2 pt-3 sm:pt-4 border-t border-white/[0.06] min-w-0">
                               {project.liveUrl && (
                                 <Button
                                   asChild
                                   size="sm"
                                   className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                                 >
                                   <a
                                     href={project.liveUrl}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                   >
                                     <ExternalLink className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                     Live Demo
                                   </a>
                                 </Button>
                               )}
         
                               {project.githubUrl.frontend && (
                                 <Button
                                   asChild
                                   size="sm"
                                   variant="outline"
                                   className="rounded-full border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                                 >
                                   <a
                                     href={project.githubUrl.frontend}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                   >
                                     <Github className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                     {project.category === "fullstack"
                                       ? "Frontend"
                                       : "Source Code"}
                                   </a>
                                 </Button>
                               )}
         
                               {project.githubUrl.backend && (
                                 <Button
                                   asChild
                                   size="sm"
                                   variant="outline"
                                   className="rounded-full border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                                 >
                                   <a
                                     href={project.githubUrl.backend}
                                     target="_blank"
                                     rel="noopener noreferrer"
                                   >
                                     <Github className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                     Backend
                                   </a>
                                 </Button>
                               )}
                             </div>
                           </div>
                         </motion.div>
                       ))}
                     </motion.div>
                   </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex justify-center">
              <Pagination>
                <PaginationContent className="gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-all backdrop-blur-xl ${currentPage === 1 ? "opacity-40 pointer-events-none" : ""}`}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className={`cursor-pointer rounded-lg border transition-all backdrop-blur-xl ${page === currentPage ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20" : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"}`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-all backdrop-blur-xl ${currentPage === totalPages ? "opacity-40 pointer-events-none" : ""}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </>
  );
}