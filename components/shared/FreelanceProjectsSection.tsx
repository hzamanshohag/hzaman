"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Play,
  Pause,
  ArrowRight,
  Briefcase,
  ListChecks,
  UserCheck,
  Layers,
  Monitor,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import project1Image from "@/public/img/project/dotmart.png";

type ProjectCategory = "ecommerce" | "portfolio" | "saas" | "other";

interface FreelanceProject {
  id: number;
  title: string;
  client: string;
  category: ProjectCategory;
  description: string;
  image: StaticImageData
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  keyFeatures: string[];
  role: string;
}

const FreelanceProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const freelanceProjects: FreelanceProject[] = [
    {
      id: 1,
      title: "Scalable E-Commerce Platform",
      client: "FashionHub Retail",
      category: "ecommerce",
      description:
        "A modern, high-performance e-commerce system featuring real-time inventory tracking, secure Stripe payments, and an advanced admin dashboard for analytics.",
      image: project1Image,
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
      keyFeatures: [
        "AI-driven product recommendations",
        "Real-time inventory & order tracking",
        "Secure multi-gateway payment integration",
      ],
      role: "Full-Stack Developer: Built the REST API, integrated payment gateways, and developed the interactive frontend UI from scratch.",
    },
    {
      id: 2,
      title: "HealthTech Telemedicine App",
      client: "MediCare Solutions",
      category: "other",
      description:
        "A HIPAA-compliant telemedicine platform enabling secure video consultations, seamless appointment scheduling, and digital health record management.",
      image: project1Image,
      technologies: ["React", "Node.js", "PostgreSQL", "WebRTC", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      keyFeatures: [
        "End-to-end encrypted video calls",
        "Automated appointment reminders",
        "Role-based access for doctors & patients",
      ],
      role: "Lead Backend Developer: Architected the database, implemented JWT authentication, and set up the WebRTC signaling server.",
    },
    {
      id: 3,
      title: "Real Estate CRM Portal",
      client: "PrimeNest Agency",
      category: "other",
      description:
        "A custom CRM tailored for real estate agencies to manage property listings, track client interactions, and automate lead nurturing.",
      image: project1Image,
      technologies: ["Next.js", "Express", "Prisma", "MySQL", "Redux"],
      liveUrl: "#",
      githubUrl: "#",
      keyFeatures: [
        "Interactive map-based property search",
        "Automated email marketing funnels",
        "Detailed analytics & conversion tracking",
      ],
      role: "Frontend Specialist: Developed complex UI components, handled state management, and optimized the map rendering performance.",
    },
  ];

  useEffect(() => {
    if (isAutoPlay && isInView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % freelanceProjects.length);
      }, 6000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, isInView, freelanceProjects.length]);

  const currentProject = freelanceProjects[currentIndex];

  return (
    <section
      id="freelance-projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
    >
      {/* Cyan Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Freelance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real-world solutions delivered to clients, focusing on clean code,
            intuitive design, and measurable results.
          </p>
        </motion.div>

        {/* Carousel Layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: Screenshot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
              className="relative h-[450px] rounded-2xl overflow-hidden border border-white/10 group"
            >
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
                  src={currentProject.image}
                  alt={currentProject.title}
                  width={1920}
                  height={4933}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Live Demo Button Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Monitor size={14} /> Live Preview
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {currentProject.title}
                  </h3>
                </div>
                <Link href={currentProject.liveUrl} target="_blank">
                  <Button className="bg-white text-black hover:bg-cyan-400 hover:text-white transition-all duration-300 rounded-full shadow-lg">
                    <ExternalLink size={16} className="mr-2" />
                    Visit
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Content Details */}
          <div className="flex flex-col justify-between py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-6 h-full flex flex-col"
              >
                {/* 🏷️ Client Project & Description */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge
                      variant="outline"
                      className="border-cyan-500/50 text-cyan-400 bg-cyan-500/10 px-3 py-1"
                    >
                      <Briefcase size={14} className="mr-1.5" />
                      Client Project
                    </Badge>
                    <span className="text-slate-500 text-sm">
                      For {currentProject.client}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {currentProject.description}
                  </p>
                </div>

                {/* 🛠️ Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" /> Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 📈 Key Features */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ListChecks size={16} className="text-emerald-400" /> Key
                    Features
                  </h4>
                  <ul className="space-y-2">
                    {currentProject.keyFeatures.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-300 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
               

                {/* 🎯 Your Role */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <UserCheck size={16} /> Your Role
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {currentProject.role}
                  </p>
                </div>

                {/* Bottom Links */}
                <div className="flex gap-3 pt-2">
                  <Link
                    href={currentProject.liveUrl}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  </Link>
                  <Link href={currentProject.githubUrl} target="_blank">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition px-5"
                    >
                      <Github size={18} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + freelanceProjects.length) %
                  freelanceProjects.length,
              )
            }
            className="p-3 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {freelanceProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm"
            >
              {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              {isAutoPlay ? "Pause" : "Auto Play"}
            </button>
          </div>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % freelanceProjects.length)
            }
            className="p-3 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* View All CTA */}
        <motion.div className="text-center mt-10 sm:mt-12 md:mt-14">
          <Link href="/freelance-projects">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-6 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 hover:shadow-2xl active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Freelance Projects
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FreelanceProjectsSection;
