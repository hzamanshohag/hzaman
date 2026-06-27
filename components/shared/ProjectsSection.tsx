"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  Globe,
  Monitor,
  Server,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import project1Image from "@/public/img/project/dotmart.png";
import smartithubbd from "@/public/img/project/smartithubbd.com.png";

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

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
      image: smartithubbd,
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
    { id: "all", name: "All Projects", icon: <Globe size={18} /> },
    { id: "frontend", name: "Frontend", icon: <Monitor size={18} /> },
    { id: "backend", name: "Backend", icon: <Server size={18} /> },
    { id: "fullstack", name: "Full Stack", icon: <Layers size={18} /> },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

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
            A showcase of my projects demonstrating modern web development,
            clean code, and practical problem-solving with the MERN stack and
            Next.js.
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
          {filteredProjects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, ease: "easeOut" }}
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

        {/* View All — only shows if there are more than 6 */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-14">
            <Link href="/projects">
              <Button
                size="lg"
                className="
      group
      relative
      overflow-hidden
      rounded-full
      bg-gradient-to-r
      from-cyan-500
      to-blue-600
      px-10
      py-6
      text-white
      shadow-lg
      shadow-cyan-500/20
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-cyan-500/40
      hover:shadow-2xl
      active:scale-95
    "
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All Projects
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
