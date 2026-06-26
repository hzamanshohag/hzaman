"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Search,
  Film,
  Monitor,
  Camera,
  Award,
  User,
  Tag,
  X,
  ExternalLink,
  Video,
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

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  category: "projects" | "ads" | "tutorials" | "testimonials" | "other";
  thumbnail: string;
  videoId: string;
  duration: string;
}

// Moved data outside the component to simulate an external data source or just to keep component clean
const VIDEO_DATA: YouTubeVideo[] = [
  {
    id: "1",
    title: "E-Commerce Platform Showcase",
    description:
      "Modern MERN stack e-commerce demo with cart, auth & payments.",
    category: "projects",
    thumbnail: "https://picsum.photos/seed/ecommerce/1200/600.jpg",
    videoId: "dQw4w9WgXcQ",
    duration: "12:45",
  },
  {
    id: "2",
    title: "Telemedicine WebRTC App",
    description: "Real-time health consultation system with video calling.",
    category: "projects",
    thumbnail: "https://picsum.photos/seed/health/800/450.jpg",
    videoId: "jNQXAC9IVRw",
    duration: "18:30",
  },
  {
    id: "3",
    title: "Full Stack MERN Tutorial",
    description: "Build a complete application step by step from scratch.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/tutorial/800/450.jpg",
    videoId: "fgTGADljAeg",
    duration: "45:30",
  },
  {
    id: "4",
    title: "Next.js 14 App Router Deep Dive",
    description:
      "Master server components, layouts, and data fetching patterns.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/nextjs/800/450.jpg",
    videoId: "wm5gMKuwSYk",
    duration: "38:20",
  },
  {
    id: "5",
    title: "TypeScript Advanced Patterns",
    description: "Generics, utility types, and advanced TypeScript techniques.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/typescript/800/450.jpg",
    videoId: "BwuLxPH8IDs",
    duration: "52:10",
  },
  {
    id: "6",
    title: "Real-Time Chat App with Socket.io",
    description: "Build a WhatsApp-like chat app with rooms and notifications.",
    category: "projects",
    thumbnail: "https://picsum.photos/seed/chat/800/450.jpg",
    videoId: "ZKEqqIO7n-k",
    duration: "29:55",
  },
  {
    id: "7",
    title: "Redux Toolkit Crash Course",
    description: "Modern state management with RTK Query and slices.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/redux/800/450.jpg",
    videoId: "bbkBuqC1rU4",
    duration: "33:40",
  },
  {
    id: "8",
    title: "SaaS Dashboard UI Build",
    description: "Design and build a professional analytics dashboard.",
    category: "projects",
    thumbnail: "https://picsum.photos/seed/dashboard/800/450.jpg",
    videoId: "1SgmJ5M3hgc",
    duration: "41:15",
  },
  {
    id: "9",
    title: "Node.js REST API with JWT Auth",
    description: "Secure REST API with refresh tokens and role-based access.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/nodejs/800/450.jpg",
    videoId: "enopDiqsGgY",
    duration: "47:22",
  },
  {
    id: "10",
    title: "Tailwind CSS Masterclass",
    description: "Build stunning UIs faster with utility-first CSS.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/tailwind/800/450.jpg",
    videoId: "pfaSUYaSgRo",
    duration: "28:05",
  },
  {
    id: "11",
    title: "Portfolio Website Speedbuild",
    description: "Build a jaw-dropping developer portfolio in under an hour.",
    category: "projects",
    thumbnail: "https://picsum.photos/seed/portfolio/800/450.jpg",
    videoId: "r_hYR53r61M",
    duration: "55:00",
  },
  {
    id: "12",
    title: "MongoDB Aggregation Pipeline",
    description: "Advanced data querying, grouping, and reporting in MongoDB.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/mongodb/800/450.jpg",
    videoId: "A3jvoE0jGdE",
    duration: "36:48",
  },
  {
    id: "13",
    title: "CI/CD Pipeline with GitHub Actions",
    description: "Automate testing, builds, and deployment for MERN apps.",
    category: "other",
    thumbnail: "https://picsum.photos/seed/cicd/800/450.jpg",
    videoId: "scEDHsr3APg",
    duration: "22:30",
  },
  {
    id: "14",
    title: "Docker for Full Stack Developers",
    description: "Containerize your MERN app with Docker Compose.",
    category: "testimonials",
    thumbnail: "https://picsum.photos/seed/docker/800/450.jpg",
    videoId: "3c-iBn73dDE",
    duration: "44:17",
  },
  {
    id: "15",
    title: "SEO Strategy for Developers",
    description: "Technical SEO, Core Web Vitals, and ranking your web apps.",
    category: "testimonials",
    thumbnail: "https://picsum.photos/seed/seo/800/450.jpg",
    videoId: "JSm4aQl4w_U",
    duration: "31:00",
  },
  {
    id: "16",
    title: "Framer Motion Animation Guide",
    description: "Create buttery smooth React animations with Framer Motion.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/framer/800/450.jpg",
    videoId: "2V1WK-3HQNk",
    duration: "26:43",
  },
  {
    id: "17",
    title: "Social Media Marketing for Devs",
    description:
      "Grow your personal brand and attract clients on social media.",
    category: "testimonials",
    thumbnail: "https://picsum.photos/seed/social/800/450.jpg",
    videoId: "ysEN5RaKOlA",
    duration: "19:55",
  },
  {
    id: "18",
    title: "Task Management App — Full Build",
    description:
      "Trello-like kanban board with drag & drop and real-time sync.",
    category: "projects",
    thumbnail: "https://picsum.photos/seed/kanban/800/450.jpg",
    videoId: "W5fjdHSMoMk",
    duration: "1:02:10",
  },
  {
    id: "19",
    title: "Prisma ORM with Next.js",
    description: "Type-safe database access with Prisma and PostgreSQL.",
    category: "tutorials",
    thumbnail: "https://picsum.photos/seed/prisma/800/450.jpg",
    videoId: "RebA5J-rlwg",
    duration: "39:28",
  },
  {
    id: "20",
    title: "Conversion Rate Optimization",
    description:
      "Data-driven techniques to turn visitors into paying customers.",
    category: "testimonials",
    thumbnail: "https://picsum.photos/seed/cro/800/450.jpg",
    videoId: "ZXsQAXx_ao0",
    duration: "24:15",
  },
];

export default function VideosPage() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const VIDEOS_PER_PAGE = 9;

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // "Successfully" load data
        setVideos(VIDEO_DATA);
      } catch (error) {
        console.error("Failed to load videos", error);
      } finally {
        // Turn off loading regardless of success or failure
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { id: "all", name: "All", icon: <Film size={16} /> },
    { id: "projects", name: "Projects", icon: <Monitor size={16} /> },
    { id: "ads", name: "Ads", icon: <Camera size={16} /> },
    { id: "tutorials", name: "Tutorials", icon: <Award size={16} /> },
    { id: "testimonials", name: "Testimonials", icon: <User size={16} /> },
    { id: "other", name: "Other", icon: <Tag size={16} /> },
  ];

  const filteredVideos = videos.filter((video) => {
    const matchCategory =
      selectedCategory === "all" || video.category === selectedCategory;

    const matchSearch = video.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE,
  );

  if (loading) {
    return <Loader />;
  }

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
            <Video size={14} />
            Featured Videos
          </motion.span>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            My Creative{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Video Library
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
    flex flex-col lg:flex-row
    lg:items-center
    lg:justify-between
    gap-6
    mb-14
  "
        >
          {/* ================= Tabs ================= */}
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
            relative
            flex items-center gap-2
            px-5 py-2
            rounded-full
            text-sm font-medium
            transition-all duration-300
            whitespace-nowrap
            backdrop-blur-xl
            border border-white/10
            ${
              isActive
                ? "bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white scale-[1.03]"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }
          `}
                >
                  <span className="text-base leading-none">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>

                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryGlow"
                      className="absolute inset-0 rounded-full bg-white/10 blur-xl -z-10"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* ================= Search ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full sm:w-80"
          >
            <Search
              size={18}
              className="
    absolute left-3 top-1/2 -translate-y-1/2
    text-slate-500
    transition-all duration-300
    group-focus-within:text-cyan-400
    group-focus-within:drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]
    pointer-events-none
  "
            />

            <Input
              placeholder="Search videos..."
              className="
        pl-10
        bg-white/5
        border border-white/10
        text-white
        placeholder:text-gray-500
        focus:border-cyan-500
        focus:ring-1
        focus:ring-cyan-500
        transition-all duration-300
        rounded-xl
      "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </motion.div>
        {/* ================= VIDEO GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -8 }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-video group cursor-pointer">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  suppressHydrationWarning
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Button
                    onClick={() => setSelectedVideo(video)}
                    className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  >
                    <Play size={24} className="text-white" />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">{video.title}</h3>

                <p className="text-gray-400 text-sm mb-3">
                  {video.description}
                </p>

                <Button
                  onClick={() => setSelectedVideo(video)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl"
                >
                  <Play size={16} className="mr-2" />
                  Play Video
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
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`
              cursor-pointer
              bg-white/5
              border border-white/10
              text-slate-300
              hover:bg-cyan-500/20
              hover:text-white
              transition-all duration-300
              backdrop-blur-xl
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
                  cursor-pointer
                  rounded-lg
                  border
                  transition-all duration-300
                  backdrop-blur-xl
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
              cursor-pointer
              bg-white/5
              border border-white/10
              text-slate-300
              hover:bg-cyan-500/20
              hover:text-white
              transition-all duration-300
              backdrop-blur-xl
              ${currentPage === totalPages ? "opacity-40 pointer-events-none" : ""}
            `}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative bg-[#0f0f0f] rounded-2xl w-full max-w-4xl overflow-hidden border border-white/10"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="
    absolute top-4 right-4 z-50 p-2
    rounded-full text-white
    bg-gradient-to-r from-cyan-500 to-blue-500
    hover:from-red-500 hover:to-red-600
    transition-all duration-300
  "
              >
                <X size={18} />
              </button>

              {/* Video */}
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  allowFullScreen
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-3">
                  {selectedVideo.title}
                </h3>

                <p className="text-gray-400 mb-4">
                  {selectedVideo.description}
                </p>

                <Link
                  href={`https://youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                >
                  <Button className="  bg-gradient-to-r from-cyan-500 to-blue-500  hover:from-red-500 hover:to-red-600 text-white">
                    <ExternalLink size={16} className="mr-2" />
                    Watch on YouTube
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
