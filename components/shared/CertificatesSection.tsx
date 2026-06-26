"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Award } from "lucide-react";
import Image from "next/image";

interface Certificate {
  id: number;
  imageUrl: string;
}

const CertificatesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const certificates: Certificate[] = [
    { id: 1, imageUrl: "https://picsum.photos/seed/meta-cert/900/600.jpg" },
    { id: 2, imageUrl: "https://picsum.photos/seed/aws-cert/900/600.jpg" },
    { id: 3, imageUrl: "https://picsum.photos/seed/google-ux/900/600.jpg" },
    { id: 4, imageUrl: "https://picsum.photos/seed/mongo-cert/900/600.jpg" },
    { id: 5, imageUrl: "https://picsum.photos/seed/nextjs-cert/900/600.jpg" },
    {
      id: 6,
      imageUrl: "https://picsum.photos/seed/blockchain-cert/900/600.jpg",
    },
  ];

  // Auto-play
  useEffect(() => {
    if (isAutoPlay && isInView) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, isInView, certificates.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
    >
      {/* Cyan Glow */}
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-6">
            <Award className="h-8 w-8 text-cyan-400" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Certifications
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Main Image Viewport */}
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            {/* Slides */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={certificates[currentIndex].imageUrl}
                  alt="Certificate"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Side Gradients for better button visibility */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent z-10 pointer-events-none" />

            {/* Floating Left Icon */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-lg rounded-full text-white hover:bg-white/20 border border-white/20 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Floating Right Icon */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-lg rounded-full text-white hover:bg-white/20 border border-white/20 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Controls (Play/Pause & Dots) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white hover:bg-white/20 border border-white/20 text-sm transition-colors"
            >
              {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              {isAutoPlay ? "Pause" : "Play"}
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
