"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ExternalLink,
  Github,
  Briefcase,
  Globe,
  HeartPulse,
  ShoppingCart,
  LayoutDashboard,
  Tag,
  DollarSign,
  Clock,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
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
import Link from "next/link";
import Loader from "@/components/shared/Loader";

interface FreelanceProject {
  id: string;
  title: string;
  client: string;
  category: "ecommerce" | "healthcare" | "saas" | "marketing" | "other";
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

const FREELANCE_DATA: FreelanceProject[] = [
  {
    id: "1",
    title: "Scalable E-Commerce Platform",
    client: "FashionHub Retail",
    category: "ecommerce",
    description:
      "Advanced e-commerce system with analytics and performance optimization.",
    longDescription:
      "Built with Next.js and Node.js, this platform supports real-time inventory, secure payments, admin dashboards, and AI-driven recommendations for a global fashion retailer.",
    image: "https://picsum.photos/seed/ecommerce-freelance/800/500.jpg",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    budget: "$20,000",
    duration: "4 Months",
    teamSize: 6,
    completedDate: "2023-11-15",
    liveUrl: "#",
    githubUrl: "#",
    achievements: ["300% sales increase", "50K+ active users", "99.9% uptime"],
  },
  {
    id: "2",
    title: "HealthTech Telemedicine Platform",
    client: "MediCare Solutions",
    category: "healthcare",
    description: "Telemedicine system with secure video consultations and EMR.",
    longDescription:
      "Full-stack telemedicine application with HIPAA compliance, appointment booking, secure EMR management, and real-time WebRTC video calling for doctors and patients.",
    image: "https://picsum.photos/seed/healthtech-freelance/800/500.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "WebRTC"],
    budget: "$30,000",
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
    id: "3",
    title: "SaaS HR Management System",
    client: "PeopleFirst Corp",
    category: "saas",
    description:
      "Enterprise HR platform with payroll, leave, and performance modules.",
    longDescription:
      "A complete HR solution covering employee onboarding, leave management, payroll processing, and performance review workflows for mid-to-large enterprises.",
    image: "https://picsum.photos/seed/hr-freelance/800/500.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    budget: "$25,000",
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
    id: "4",
    title: "Digital Marketing Analytics Dashboard",
    client: "GrowthMetrics Agency",
    category: "marketing",
    description:
      "Real-time marketing dashboard with campaign tracking and ROI analysis.",
    longDescription:
      "Built a data-driven analytics platform that aggregates data from Google Ads, Facebook, and organic SEO to give actionable insights and automated reporting for marketing teams.",
    image: "https://picsum.photos/seed/marketing-freelance/800/500.jpg",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Google Analytics API",
      "Recharts",
    ],
    budget: "$15,000",
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
    id: "5",
    title: "Multi-Vendor Food Delivery App",
    client: "QuickBite Bangladesh",
    category: "ecommerce",
    description:
      "Food ordering system with real-time tracking and driver dispatch.",
    longDescription:
      "Full-featured food delivery platform with restaurant onboarding, real-time GPS order tracking, rider dispatch management, and customer loyalty rewards.",
    image: "https://picsum.photos/seed/food-freelance/800/500.jpg",
    technologies: [
      "React Native",
      "Node.js",
      "MongoDB",
      "Google Maps API",
      "Socket.io",
    ],
    budget: "$18,000",
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
    id: "6",
    title: "AI Content Generator SaaS",
    client: "ContentAI Labs",
    category: "saas",
    description:
      "OpenAI-powered platform for marketers to generate content at scale.",
    longDescription:
      "A subscription-based SaaS app that uses GPT-4 to generate blog posts, social captions, ad copy, and SEO meta tags. Includes a template library, team workspace, and usage analytics.",
    image: "https://picsum.photos/seed/ai-freelance/800/500.jpg",
    technologies: ["Next.js", "OpenAI API", "Prisma", "Stripe", "Tailwind"],
    budget: "$22,000",
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
    id: "7",
    title: "Real Estate Listing Platform",
    client: "PropFinder BD",
    category: "other",
    description:
      "Property marketplace with advanced search, maps, and agent CRM.",
    longDescription:
      "A modern real estate platform with geolocation-based property search, mortgage calculators, agent dashboards, and integrated CRM for lead management.",
    image: "https://picsum.photos/seed/realestate-freelance/800/500.jpg",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Mapbox", "Cloudinary"],
    budget: "$16,000",
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
    id: "8",
    title: "EdTech Learning Management System",
    client: "SkillUp Academy",
    category: "saas",
    description:
      "E-learning platform with video courses, quizzes, and certificates.",
    longDescription:
      "A full-featured LMS with instructor course creation, student progress tracking, live quiz modules, automatic certificate generation, and Stripe subscription billing.",
    image: "https://picsum.photos/seed/lms-freelance/800/500.jpg",
    technologies: ["Next.js", "MongoDB", "Cloudinary", "Stripe", "Socket.io"],
    budget: "$28,000",
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
    id: "9",
    title: "Social Media Growth Campaign",
    client: "BrandBoost Agency",
    category: "marketing",
    description:
      "360° social media strategy with content calendars and ad creatives.",
    longDescription:
      "Managed a full-scale social media growth campaign across Facebook, Instagram, and LinkedIn — including content strategy, paid advertising, influencer outreach, and monthly performance reporting.",
    image: "https://picsum.photos/seed/social-freelance/800/500.jpg",
    technologies: [
      "Meta Ads",
      "Google Ads",
      "Canva Pro",
      "Buffer",
      "Google Analytics",
    ],
    budget: "$8,000",
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
  {
    id: "10",
    title: "Hospital Management System",
    client: "CityMed Hospital",
    category: "healthcare",
    description:
      "Integrated hospital platform for patient, billing, and inventory management.",
    longDescription:
      "Enterprise-grade hospital management software with patient registration, OPD/IPD management, pharmacy inventory, billing, and reporting dashboards for department heads.",
    image: "https://picsum.photos/seed/hospital-freelance/800/500.jpg",
    technologies: ["React", "Node.js", "MySQL", "TypeScript", "Chart.js"],
    budget: "$35,000",
    duration: "7 Months",
    teamSize: 9,
    completedDate: "2024-04-01",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "200+ daily patients",
      "50% billing errors reduced",
      "Paperless workflow",
    ],
  },
  {
    id: "11",
    title: "Crypto Portfolio Tracker",
    client: "CoinWatch Pro",
    category: "other",
    description:
      "Live crypto dashboard with portfolio analytics and price alerts.",
    longDescription:
      "A real-time cryptocurrency tracking dashboard that aggregates data from multiple exchanges, provides portfolio P&L analytics, custom price alert notifications, and market trend visualizations.",
    image: "https://picsum.photos/seed/crypto-freelance/800/500.jpg",
    technologies: [
      "React",
      "TypeScript",
      "CoinGecko API",
      "Recharts",
      "Firebase",
    ],
    budget: "$12,000",
    duration: "2.5 Months",
    teamSize: 3,
    completedDate: "2023-05-18",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "8K+ registered users",
      "15+ exchanges supported",
      "Real-time alerts",
    ],
  },
  {
    id: "12",
    title: "B2B SaaS Invoicing Tool",
    client: "InvoiceFlow Inc.",
    category: "saas",
    description:
      "Automated invoicing, payments, and financial reporting for SMEs.",
    longDescription:
      "A clean, intuitive invoicing SaaS for small and medium businesses with recurring billing, multi-currency support, automated payment reminders, and detailed financial reports.",
    image: "https://picsum.photos/seed/invoice-freelance/800/500.jpg",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Resend"],
    budget: "$14,000",
    duration: "3 Months",
    teamSize: 4,
    completedDate: "2024-01-28",
    liveUrl: "#",
    githubUrl: "#",
    achievements: [
      "1.2K active businesses",
      "$2M+ invoiced",
      "98% payment success rate",
    ],
  },
];

export default function FreelanceProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<FreelanceProject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] =
    useState<FreelanceProject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProjects(FREELANCE_DATA);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const categories = [
    { id: "all", name: "All", icon: <Briefcase size={15} /> },
    { id: "ecommerce", name: "E-Commerce", icon: <ShoppingCart size={15} /> },
    { id: "healthcare", name: "Healthcare", icon: <HeartPulse size={15} /> },
    { id: "saas", name: "SaaS", icon: <LayoutDashboard size={15} /> },
    { id: "marketing", name: "Marketing", icon: <TrendingUp size={15} /> },
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

  if (loading) return <Loader />;

  return (
    <section className="relative min-h-screen py-28 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]">
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
        {/* ================= HERO ================= */}
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
            <Briefcase size={14} />
            Client Work
          </motion.span>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            My Freelance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Project Library
            </span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />

          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Selected freelance projects delivered to global clients — focused on
            performance, scalability, and measurable business impact.
          </p>
        </motion.div>

        {/* ================= FILTER BAR ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start w-full">
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
                    <motion.span
                      layoutId="activeFreelanceTab"
                      className="absolute inset-0 rounded-full bg-white/10 blur-xl -z-10"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full sm:w-80"
          >
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <Input
              placeholder="Search projects..."
              className="pl-10 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* ================= PROJECTS GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 rounded-2xl overflow-hidden group transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Budget badge on image */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-cyan-400 text-xs font-semibold">
                  <DollarSign size={11} />
                  {project.budget}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-cyan-400 text-xs font-medium uppercase tracking-wider mb-1">
                  {project.client}
                </p>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Meta row */}
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

                {/* Tech stack */}
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

                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                >
                  View Details
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300 backdrop-blur-xl ${currentPage === 1 ? "opacity-40 pointer-events-none" : ""}`}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isActive = page === currentPage;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={isActive}
                        className={`cursor-pointer rounded-lg border transition-all duration-300 backdrop-blur-xl ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20 scale-105"
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
                    className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300 backdrop-blur-xl ${currentPage === totalPages ? "opacity-40 pointer-events-none" : ""}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-[#0f0f0f] rounded-2xl w-full max-w-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/60 backdrop-blur rounded-full text-white hover:bg-red-500 transition"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="relative h-52">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/30 to-transparent" />
              </div>

              {/* Content */}
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

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    {
                      icon: <DollarSign size={14} />,
                      label: "Budget",
                      value: selectedProject.budget,
                    },
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

                {/* Achievements */}
                <div className="mb-5">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-medium">
                    Key Achievements
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {selectedProject.achievements.map((item, i) => (
                      <div
                        key={i}
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
                </div>

                {/* Tech Stack */}
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

                {/* Actions */}
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
                      className="w-full border-white/20 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl"
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
