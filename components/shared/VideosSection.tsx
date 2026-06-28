"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface YouTubeVideo {
  id: string;
  videoId: string;
  category: "projects" | "ads" | "tutorials" | "other";
}

const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [videoTitles, setVideoTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [thumbErrors, setThumbErrors] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const youtubeVideos: YouTubeVideo[] = [
    { id: "1", videoId: "Yb1zuZ-9AB0", category: "projects" },
    { id: "2", videoId: "fZi-ZkIo3D4", category: "other" },
    { id: "3", videoId: "LaH9F28AfH4", category: "projects" },
    { id: "4", videoId: "g31UN07ySXA", category: "other" },
    { id: "5", videoId: "_8Ml_jV7-YQ", category: "projects" },
    { id: "6", videoId: "et78ZBRhm-E", category: "other" },
  ];

  const getThumbnail = (videoId: string, fallback = false) =>
    `https://img.youtube.com/vi/${videoId}/${fallback ? "hqdefault" : "maxresdefault"}.jpg`;

  useEffect(() => {
    const fetchTitles = async () => {
      const titles: Record<string, string> = {};

      await Promise.all(
        youtubeVideos.map(async (video) => {
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
      setLoading(false);
    };

    fetchTitles();
  }, []);

  const handleThumbError = (videoId: string) => {
    setThumbErrors((prev) => ({ ...prev, [videoId]: true }));
  };

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
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
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Video{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Gallery
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Explore videos featuring my projects, coding journey, and practical
            web development solutions built with modern technologies.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((video, index) => (
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
                {loading ? (
                  <div className="absolute inset-0 bg-white/[0.05] animate-pulse" />
                ) : (
                  <Image
                    src={getThumbnail(video.videoId, thumbErrors[video.id])}
                    alt={videoTitles[video.id] || "Video thumbnail"}
                    fill
                    className="object-cover"
                    onError={() => handleThumbError(video.videoId)}
                    unoptimized
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => setSelectedVideo(video)}
                    className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30"
                  >
                    <Play size={24} className="text-white" />
                  </Button>
                </div>

                {/* Duration-style category badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] uppercase tracking-wider text-slate-300 font-mono">
                  {video.category}
                </div>
              </div>

              <div className="p-4">
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-5 bg-white/[0.05] rounded-md animate-pulse w-3/4" />
                    <div className="h-3 bg-white/[0.05] rounded-md animate-pulse w-1/2" />
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center text-center mt-10 sm:mt-12 md:mt-14">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/videos">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-6 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 hover:shadow-2xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View All Videos
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
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
                className="absolute top-4 right-4 z-50 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 backdrop-blur rounded-full text-white hover:from-red-500 hover:to-red-600 transition-all duration-300"
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
};

export default VideosSection;
