"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Youtube, ExternalLink, Video } from "lucide-react";


import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  category: "projects" | "ads" | "tutorials" | "testimonials" | "other";
  thumbnail: string;
  videoId: string;
  duration: string;
}

const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const youtubeVideos: YouTubeVideo[] = [
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
      description:
        "Generics, utility types, and advanced TypeScript techniques.",
      category: "tutorials",
      thumbnail: "https://picsum.photos/seed/typescript/800/450.jpg",
      videoId: "BwuLxPH8IDs",
      duration: "52:10",
    },
    {
      id: "6",
      title: "Real-Time Chat App with Socket.io",
      description:
        "Build a WhatsApp-like chat app with rooms and notifications.",
      category: "projects",
      thumbnail: "https://picsum.photos/seed/chat/800/450.jpg",
      videoId: "ZKEqqIO7n-k",
      duration: "29:55",
    },
  ];


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
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((video) => (
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

        {/* View All Button */}
        <div className="flex justify-center mt-14">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/videos">
              <Button className="px-8 py-6 text-lg font-semibold rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-xl">
                <Video size={20} className="mr-2" />
                View All Videos
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
                className="absolute top-4 right-4 z-50 p-2 bg-gradient-to-r from-cyan-500 to-blue-500  backdrop-blur rounded-full text-white hover:from-red-500 hover:to-red-600  transition-all duration-300"
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
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500  hover:from-red-500 hover:to-red-600 text-white">
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

