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
  videoId: string;
  category: "projects" | "ads" | "tutorials" | "other";
}

const VIDEO_DATA: YouTubeVideo[] = [
  { id: "1", videoId: "Yb1zuZ-9AB0", category: "projects" },
  { id: "2", videoId: "fZi-ZkIo3D4", category: "other" },
  { id: "3", videoId: "LaH9F28AfH4", category: "projects" },
  { id: "4", videoId: "g31UN07ySXA", category: "other" },
  { id: "5", videoId: "_8Ml_jV7-YQ", category: "projects" },
  { id: "6", videoId: "et78ZBRhm-E", category: "other" },
];

export default function VideosPage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({});
  const [thumbErrors, setThumbErrors] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const VIDEOS_PER_PAGE = 9;

  const getThumbnail = (videoId: string, fallback = false) =>
    `https://img.youtube.com/vi/${videoId}/${fallback ? "hqdefault" : "maxresdefault"}.jpg`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setVideos(VIDEO_DATA);

        const titles: Record<string, string> = {};
        await Promise.all(
          VIDEO_DATA.map(async (video) => {
            try {
              const res = await fetch(
                `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.videoId}&format=json`,
              );
              const data = await res.json();
              titles[video.id] = data.title;
            } catch {
              titles[video.id] = "Untitled Video";
            }
          }),
        );
        setVideoTitles(titles);
      } catch (error) {
        console.error("Failed to load videos", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleThumbError = (videoId: string) => {
    setThumbErrors((prev) => ({ ...prev, [videoId]: true }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const categories = [
    { id: "all", name: "All", icon: <Film size={16} /> },
    { id: "projects", name: "Projects", icon: <Monitor size={16} /> },
    { id: "ads", name: "Ads", icon: <Camera size={16} /> },
    { id: "tutorials", name: "Tutorials", icon: <Award size={16} /> },
    { id: "other", name: "Other", icon: <Tag size={16} /> },
  ];

  const filteredVideos = videos.filter((video) => {
    const matchCategory =
      selectedCategory === "all" || video.category === selectedCategory;

    const matchSearch = (videoTitles[video.id] || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE,
  );

  if (initialLoading) {
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
            Explore my latest projects through engaging video demos, feature
            walkthroughs, and real-world development case studies built with
            MERN, Next.js, and TypeScript.
          </p>
        </motion.div>

        {/* ================= FILTER BAR ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14"
        >
          {/* ================= Tabs ================= */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start w-full">
            {categories.map((category, index) => {
              const isActive = selectedCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <Input
              placeholder="Search videos..."
              className="pl-10 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 rounded-xl"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* ================= VIDEO GRID ================= */}
        {paginatedVideos.length === 0 ? (
          <div className="text-center py-20">
            <Video size={48} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No videos found</p>
            <p className="text-slate-600 text-sm mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-video group cursor-pointer">
                  <Image
                    src={getThumbnail(video.videoId, thumbErrors[video.id])}
                    alt={videoTitles[video.id] || "Video thumbnail"}
                    fill
                    className="object-cover"
                    onError={() => handleThumbError(video.videoId)}
                    unoptimized
                    suppressHydrationWarning
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => setSelectedVideo(video)}
                      className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30"
                    >
                      <Play size={24} className="text-white" />
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] uppercase tracking-wider text-slate-300 font-mono">
                    {video.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold mb-3 line-clamp-2">
                    {videoTitles[video.id]}
                  </h3>

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
        )}

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
                    className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300 backdrop-blur-xl ${
                      currentPage === 1 ? "opacity-40 pointer-events-none" : ""
                    }`}
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

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={`cursor-pointer bg-white/5 border border-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-white transition-all duration-300 backdrop-blur-xl ${
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
                className="absolute top-4 right-4 z-50 p-2 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-red-500 hover:to-red-600 transition-all duration-300"
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
                <h3 className="text-xl text-white font-bold mb-4">
                  {videoTitles[selectedVideo.id]}
                </h3>

                <Link
                  href={`https://youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                >
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-red-500 hover:to-red-600 text-white">
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
