"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Clock,
  DollarSign,
  Award,
  Briefcase,
  Star,
  Play,
  Pause,
  Maximize2,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface FreelanceProject {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  budget: string;
  duration: string;
  teamSize: number;
  completedDate: string;
  liveUrl: string;
  githubUrl: string;
  achievements: string[];
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
      category: "E-Commerce",
      description:
        "Advanced e-commerce system with analytics and performance optimization.",
      longDescription:
        "Built with Next.js and Node.js, this platform supports real-time inventory, secure payments, admin dashboards, and AI-driven recommendations.",
      image: "https://picsum.photos/seed/ecommerce-freelance/800/500.jpg",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      budget: "$20,000",
      duration: "4 Months",
      teamSize: 6,
      completedDate: "2023-11-15",
      liveUrl: "#",
      githubUrl: "#",
      achievements: [
        "300% sales increase",
        "50K+ active users",
        "99.9% uptime",
      ],
    },
    {
      id: 2,
      title: "HealthTech Platform",
      client: "MediCare Solutions",
      category: "Healthcare",
      description: "Telemedicine system with secure video consultations.",
      longDescription:
        "Full-stack telemedicine application with HIPAA compliance, appointment booking, and secure EMR management.",
      image: "https://picsum.photos/seed/healthtech-freelance/800/500.jpg",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      budget: "$30,000",
      duration: "6 Months",
      teamSize: 8,
      completedDate: "2023-09-20",
      liveUrl: "#",
      githubUrl: "#",
      achievements: ["10K+ patient registrations", "95% satisfaction rate"],
    },
  ];

  useEffect(() => {
    if (isAutoPlay && isInView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % freelanceProjects.length);
      }, 5000);
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
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Freelance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Selected freelance projects delivered to global clients — focused on
            performance, scalability, and measurable business impact.
          </p>
        </div>

        {/* Carousel */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-white">
                {currentProject.title}
              </h3>
              <p className="text-cyan-400 text-lg">{currentProject.client}</p>
              <p className="text-slate-300 mt-3">
                {currentProject.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-cyan-400" />
                {currentProject.budget}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-cyan-400" />
                {currentProject.duration}
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-cyan-400" />
                {currentProject.teamSize} Members
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-cyan-400" />
                {new Date(currentProject.completedDate).toLocaleDateString()}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="text-white font-semibold mb-2">
                Key Achievements
              </h4>
              {currentProject.achievements.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-slate-300 text-sm mb-1"
                >
                  <TrendingUp size={14} className="text-cyan-400" />
                  {item}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                <ExternalLink size={16} className="mr-2" />
                View Live
              </Button>
              <Button
                variant="outline"
                className=" rounded-full 
        border border-white/20 
        text-slate-300 
        bg-white/10 
        hover:border-cyan-400 
        hover:text-cyan-400 
        hover:bg-cyan-400/10
        transition-all duration-300"
              >
                <Github size={16} className="mr-2" />
                Source Code
              </Button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) =>
                  (prev - 1 + freelanceProjects.length) %
                  freelanceProjects.length,
              )
            }
            className="p-3 bg-white/10 rounded-full text-white"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white"
          >
            {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
            {isAutoPlay ? "Pause" : "Play"}
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % freelanceProjects.length)
            }
            className="p-3 bg-white/10 rounded-full text-white"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Link href="/freelance-projects">
            <Button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white">
              <Briefcase size={18} className="mr-2" />
              View All Freelance Projects
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreelanceProjectsSection;
