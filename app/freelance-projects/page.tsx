"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ExternalLink,
  Github,
  Briefcase,
  ShoppingCart,
  LayoutDashboard,
  Tag,
  Clock,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  FolderKanban,
  CheckCircle2,
  Monitor,
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
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import project1Image from "@/public/img/project/dotmart.png";

type ProjectCategory = "ecommerce" | "portfolio" | "saas" | "other";

interface FreelanceProject {
  id: number;
  title: string;
  client: string;
  category: ProjectCategory;
  description: string;
  longDescription: string;
  image: StaticImageData;
  technologies: string[];
  duration: string;
  teamSize: number;
  completedDate: string;
  liveUrl: string;
  githubUrl: string;
  achievements: string[];
}

const FREELANCE_DATA: FreelanceProject[] = [
  {
    id: 1,
    title: "Scalable E-Commerce Platform",
    client: "FashionHub Retail",
    category: "ecommerce",
    description:
      "Advanced e-commerce system with analytics and performance optimization.",
    longDescription:
      "Built with Next.js and Node.js, this platform supports real-time inventory, secure payments, admin dashboards, and AI-driven recommendations for a global fashion retailer.",
    image: project1Image,
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    duration: "4 Months",
    teamSize: 6,
    completedDate: "2023-11-15",
    liveUrl: "#",
    githubUrl: "#",
    achievements: ["300% sales increase", "50K+ active users", "99.9% uptime"],
  },
  {
    id: 2,
    title: "HealthTech Telemedicine Platform",
    client: "MediCare Solutions",
    category: "portfolio",
    description: "Telemedicine system with secure video consultations and EMR.",
    longDescription:
      "Full-stack telemedicine application with HIPAA compliance, appointment booking, secure EMR management, and real-time WebRTC video calling for doctors and patients.",
    image: project1Image,
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "WebRTC"],
    duration: "6 Months",
    teamSize: 8,
    completedDate: "2023-09-20",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "10K+ patient registrations",
      "95% satisfaction rate",
      "HIPAA certified",
    ],
  },
  {
    id: 3,
    title: "SaaS HR Management System",
    client: "PeopleFirst Corp",
    category: "saas",
    description:
      "Enterprise HR platform with payroll, leave, and performance modules.",
    longDescription:
      "A complete HR solution covering employee onboarding, leave management, payroll processing, and performance review workflows for mid-to-large enterprises.",
    image: project1Image,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    duration: "5 Months",
    teamSize: 5,
    completedDate: "2024-01-10",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "500+ employees managed",
      "40% HR time saved",
      "Multi-tenant ready",
    ],
  },
  {
    id: 4,
    title: "Digital Marketing Analytics Dashboard",
    client: "GrowthMetrics Agency",
    category: "saas",
    description:
      "Real-time marketing dashboard with campaign tracking and ROI analysis.",
    longDescription:
      "Built a data-driven analytics platform that aggregates data from Google Ads, Facebook, and organic SEO to give actionable insights and automated reporting for marketing teams.",
    image: project1Image,
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Google Analytics API",
      "Recharts",
    ],
    duration: "3 Months",
    teamSize: 4,
    completedDate: "2023-08-05",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "200% ROI improvement",
      "Real-time reporting",
      "5 ad platform integrations",
    ],
  },
  {
    id: 6,
    title: "Multi-Vendor Food Delivery App",
    client: "QuickBite Bangladesh",
    category: "ecommerce",
    description:
      "Food ordering system with real-time tracking and driver dispatch.",
    longDescription:
      "Full-featured food delivery platform with restaurant onboarding, real-time GPS order tracking, rider dispatch management, and customer loyalty rewards.",
    image: project1Image,
    technologies: [
      "React Native",
      "Node.js",
      "MongoDB",
      "Google Maps API",
      "Socket.io",
    ],
    duration: "4 Months",
    teamSize: 6,
    completedDate: "2023-12-01",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "1K+ daily orders",
      "50+ restaurants onboarded",
      "4.8★ app rating",
    ],
  },
  {
    id: 7,
    title: "AI Content Generator SaaS",
    client: "ContentAI Labs",
    category: "saas",
    description:
      "OpenAI-powered platform for marketers to generate content at scale.",
    longDescription:
      "A subscription-based SaaS app that uses GPT-4 to generate blog posts, social captions, ad copy, and SEO meta tags. Includes a template library, team workspace, and usage analytics.",
    image: project1Image,
    technologies: ["Next.js", "OpenAI API", "Prisma", "Stripe", "Tailwind"],
    duration: "3.5 Months",
    teamSize: 4,
    completedDate: "2024-02-20",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "2K+ paying subscribers",
      "1M+ words generated",
      "30% churn reduction",
    ],
  },
  {
    id: 8,
    title: "Real Estate Listing Platform",
    client: "PropFinder BD",
    category: "other",
    description:
      "Property marketplace with advanced search, maps, and agent CRM.",
    longDescription:
      "A modern real estate platform with geolocation-based property search, mortgage calculators, agent dashboards, and integrated CRM for lead management.",
    image: project1Image,
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Mapbox", "Cloudinary"],
    duration: "4 Months",
    teamSize: 5,
    completedDate: "2023-07-14",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "500+ listings",
      "10K monthly visitors",
      "200+ agent signups",
    ],
  },
  {
    id: 9,
    title: "EdTech Learning Management System",
    client: "SkillUp Academy",
    category: "saas",
    description:
      "E-learning platform with video courses, quizzes, and certificates.",
    longDescription:
      "A full-featured LMS with instructor course creation, student progress tracking, live quiz modules, automatic certificate generation, and Stripe subscription billing.",
    image: project1Image,
    technologies: ["Next.js", "MongoDB", "Cloudinary", "Stripe", "Socket.io"],
    duration: "6 Months",
    teamSize: 7,
    completedDate: "2024-03-10",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "5K+ enrolled students",
      "300+ courses",
      "92% course completion rate",
    ],
  },
  {
    id: 10,
    title: "Social Media Growth Campaign",
    client: "BrandBoost Agency",
    category: "saas",
    description:
      "360° social media strategy with content calendars and ad creatives.",
    longDescription:
      "Managed a full-scale social media growth campaign across Facebook, Instagram, and LinkedIn — including content strategy, paid advertising, influencer outreach, and monthly performance reporting.",
    image: project1Image,
    technologies: [
      "Meta Ads",
      "Google Ads",
      "Canva Pro",
      "Buffer",
      "Google Analytics",
    ],
    duration: "2 Months",
    teamSize: 3,
    completedDate: "2023-06-30",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "400% follower growth",
      "3x engagement rate",
      "$0.12 cost per click",
    ],
  },
];

const categories = [
  { id: "all", name: "All", icon: <Briefcase size={15} /> },
  { id: "ecommerce", name: "E-Commerce", icon: <ShoppingCart size={15} /> },
  {
    id: "portfolio",
    name: "Portfolio Website",
    icon: <FolderKanban size={15} />,
  },
  { id: "saas", name: "SaaS", icon: <LayoutDashboard size={15} /> },
  { id: "other", name: "Other", icon: <Tag size={15} /> },
] as const;

export default function FreelanceProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<FreelanceProject[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]["id"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] =
    useState<FreelanceProject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(FREELANCE_DATA);
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const q = searchTerm.trim().toLowerCase();

      if (!q) return matchCategory;

      const matchSearch =
        project.title.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  const PROJECTS_PER_PAGE = 9;

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE,
  );

  if (loading) return <Loader />;

  return (
    <section className="relative min-h-screen py-28 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]">
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6">
            <Briefcase size={14} />
            Client Work
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            My Freelance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Project Library
            </span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Projects I&apos;ve developed while learning and growing as a
            full-stack developer, with a focus on responsive, user-friendly web
            applications.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start w-full">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap backdrop-blur-xl border border-white/10 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white scale-[1.03]"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <Input
              placeholder="Search title, client, tech..."
              className="pl-10 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {paginatedProjects.length === 0 ? (
          <div className="text-center py-20 border border-white/10 bg-white/[0.03] rounded-2xl">
            <p className="text-slate-300 text-lg font-medium mb-2">
              No projects found
            </p>
            <p className="text-slate-500 text-sm">
              Try another category or search keyword.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 rounded-2xl overflow-hidden group transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative h-64 overflow-hidden rounded-xl group">
                    {/* Image layer */}
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

                    {/* Category badge */}
                    <span className="absolute top-3 right-3 z-20 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 backdrop-blur">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <p className="text-cyan-400 text-xs font-medium uppercase tracking-wider mb-1">
                    {project.client}
                  </p>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-cyan-400" />
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-cyan-400" />
                      {project.teamSize} Members
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* ── View Details Button ── */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200 mb-3 sm:mb-4 py-1.5 sm:py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10 hover:border-cyan-500/25 hover:bg-cyan-500/10 w-full"
                  >
                    <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white ${
                      currentPage === 1 ? "opacity-40 pointer-events-none" : ""
                    }`}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={isActive}
                        className={`cursor-pointer rounded-lg border transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent"
                            : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white ${
                      currentPage === totalPages
                        ? "opacity-40 pointer-events-none"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="group relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f0f]"
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 text-white hover:bg-red-500 transition"
              >
                <X size={18} />
              </button>

              {/* Image Header */}
              {/* <div className="relative h-56 overflow-hidden">
                <div
                  className="
              absolute top-0 left-0 w-full
              transition-transform duration-[8000ms] ease-linear
              group-hover:-translate-y-[calc(100%-14rem)]
            "
                >
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={1920}
                    height={4933}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/30 to-transparent" />
              </div> */}

              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute top-0 left-0 w-full transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[calc(100%-14rem)]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
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
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-cyan-400 text-sm font-medium mb-1">
                  {selectedProject.client}
                </p>
                <h3 className="text-2xl text-white font-bold mb-3">
                  {selectedProject.title}
                </h3>
                <p className="text-slate-400 mb-5">
                  {selectedProject.longDescription}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    {
                      icon: <Clock size={14} />,
                      label: "Duration",
                      value: selectedProject.duration,
                    },
                    {
                      icon: <Users size={14} />,
                      label: "Team",
                      value: `${selectedProject.teamSize} Members`,
                    },
                    {
                      icon: <Calendar size={14} />,
                      label: "Completed",
                      value: new Date(
                        selectedProject.completedDate,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      }),
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                    >
                      <div className="flex justify-center text-cyan-400 mb-1">
                        {stat.icon}
                      </div>
                      <p className="text-white text-sm font-semibold">
                        {stat.value}
                      </p>
                      <p className="text-slate-500 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* <div className="mb-5">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-medium">
                    Key Features
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {selectedProject.achievements.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-slate-300 text-sm"
                      >
                        <TrendingUp
                          size={13}
                          className="text-cyan-400 shrink-0"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div> */}
                {/* Key Features (Matches Freelance Achievements layout) */}
                <div className="mb-5">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-medium">
                    Key Features
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {selectedProject.achievements.map((item, i) => (
                      <div
                        key={i}
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
                <div className="mb-6">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-medium">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={selectedProject.liveUrl}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  </Link>
                  <Link
                    href={selectedProject.githubUrl}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 bg-white/5 text-white transition"
                    >
                      <Github size={16} className="mr-2" />
                      Source Code
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
