"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Building2,
  Calendar,
  Award,
} from "lucide-react";
import Image from "next/image";
import Image1 from "@/public/img/certificates/HeroUnion1.0.-Certificate.jpg";
import Image2 from "@/public/img/certificates/IMG_20250620_135242.jpg";
import Image3 from "@/public/img/certificates/YouTube Marketing for Organic Reach_Bohubrihi.png";

const CertificatesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const certificates = [
    {
      title: "Programming Hero Alumni Certificate",
      organization: "Programming Hero",
      date: "20 June 2025",
      imageUrl: Image1,
    },
    {
      title: "HeroUnion1.0. Certificate",
      organization: "Programming Hero",
      date: "2025",
      imageUrl: Image2,
    },
    {
      title: "YouTube Marketing for Organic Reach",
      organization: "Bohubrihi",
      date: "2025",
      imageUrl: Image3,
    },
  ];

  useEffect(() => {
    if (isAutoPlay && isInView) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
      }, 5000);
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
    enter: (dir: number) => ({
      x: dir > 0 ? "12%" : "-12%",
      opacity: 0,
      scale: 0.98,
      filter: "blur(3px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "12%" : "-12%",
      opacity: 0,
      scale: 0.98,
      filter: "blur(3px)",
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  return (
    <section
      id="certificates"
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

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Certifications{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              & Achievements
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />

          <p className="text-slate-400 max-w-2xl mx-auto">
            A showcase of my professional milestones, technical learning, and
            recognized achievements.
          </p>
        </motion.div>

        {/* Carousel Card */}
        <div className="relative">
          {/* Subtle Outer Glow */}
          <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5 blur-xl" />

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Image Area - Standard Heights instead of aspect ratio */}
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] bg-black overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center p-8 md:p-12"
                >
                  <Image
                    src={certificates[currentIndex].imageUrl}
                    alt={certificates[currentIndex].title}
                    width={900}
                    height={1200}
                    priority
                    className="max-h-full w-auto object-contain rounded-lg transition-transform duration-700 ease-out hover:scale-[1.02] drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev Button */}
              <button
                onClick={goToPrevious}
                aria-label="Previous certificate"
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20
  w-11 h-11 rounded-full
  bg-white/5 border border-white/10
  flex items-center justify-center text-slate-400
  hover:text-white hover:bg-white/10
  transition-all duration-300 group"
              >
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                aria-label="Next certificate"
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20
  w-11 h-11 rounded-full
  bg-white/5 border border-white/10
  flex items-center justify-center text-slate-400
  hover:text-white hover:bg-white/10
  transition-all duration-300 group"
              >
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>

              {/* Bottom Gradient Fade for seamless blend */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1115] to-transparent z-10 pointer-events-none" />
            </div>

            {/* Floating Info Panel */}
            <div className="relative -mt-12 mx-4 md:mx-6 mb-6 p-5 md:p-6 bg-[#0f1115]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-xl z-20">
              {/* Top Row: Info & Counter */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-white truncate pr-4">
                    {certificates[currentIndex].title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      <Building2 size={13} className="text-cyan-400" />
                      {certificates[currentIndex].organization}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                      <Calendar size={13} />
                      {certificates[currentIndex].date}
                    </span>
                  </div>
                </div>

                {/* Slide Counter Badge */}
                <div className="flex-shrink-0 font-mono text-sm text-slate-500 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                  <span className="text-white font-bold text-base">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-1 text-slate-600">/</span>
                  <span>{String(certificates.length).padStart(2, "0")}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 mb-5" />

              {/* Bottom Row: Controls & Indicators */}
              <div className="flex items-center justify-between">
                {/* Play/Pause */}
                <button
                  onClick={() => setIsAutoPlay((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  bg-white/5 border border-white/10 text-slate-400
                  hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400
                  transition-all duration-300"
                >
                  {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
                  <span className="hidden sm:inline">
                    {isAutoPlay ? "Pause" : "Auto Play"}
                  </span>
                </button>

                {/* Indicators */}
                <div className="flex items-center gap-2.5">
                  {certificates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      aria-label={`Go to certificate ${index + 1}`}
                      className={`relative transition-all duration-500 rounded-full ${
                        currentIndex === index
                          ? "w-10 h-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                          : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                    >
                      {currentIndex === index && (
                        <motion.div
                          layoutId="activeCertIndicator"
                          className="absolute inset-0 rounded-full bg-cyan-400"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
