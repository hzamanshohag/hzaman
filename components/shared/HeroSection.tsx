"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useInView,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import arrow from "../../public/img/bn-arrow.png";
import heroImg from "../../public/img/hero-img-1.jpg";
import {
  ChevronDown,
  Code2,
  Database,
  Globe,
  Terminal,
  Play,
  X,
} from "lucide-react";
import Image from "next/image";

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [displayText, setDisplayText] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const springConfig = { damping: 25, stiffness: 700 };
  const x: MotionValue<number> = useSpring(mousePosition.x, springConfig);
  const y: MotionValue<number> = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const words: string[] = [
      "Junior Full Stack Developer",
      "Performance Focused",
      "Passionate Problem Solver",
      "Turning Ideas into Reality",
      "Continuous Learner",
    ];

    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setDisplayText(
          currentWord.slice(
            0,
            isDeleting ? displayText.length - 1 : displayText.length + 1,
          ),
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 10,
          y: (e.clientY - rect.top - rect.height / 2) / 10,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return (): void => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 15 + 8,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 50 + 40,
      delay: Math.random() * 15,
    })),
  );

  const techIcons = [
    { icon: Code2, color: "text-yellow-400", delay: 0.2 },
    { icon: Database, color: "text-green-400", delay: 0.4 },
    { icon: Globe, color: "text-blue-400", delay: 0.6 },
    { icon: Terminal, color: "text-purple-400", delay: 0.8 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 opacity-70" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-800 opacity-50"
        animate={{
          background: [
            "linear-gradient(to top right, #0f0c29, #302b63, #24243e)",
            "linear-gradient(to top right, #24243e, #302b63, #0f0c29)",
            "linear-gradient(to top right, #0f0c29, #302b63, #24243e)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Particles - Pointer events none to allow clicking through */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle: Particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {particle.id % 4 === 0 && (
              <motion.div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(0, 255, 255, ${0.1 + particle.id * 0.01}) 0%, rgba(0, 150, 255, ${0.05 + particle.id * 0.005}) 70%, transparent 100%)`,
                  boxShadow: `0 0 ${15 + particle.id}px rgba(0, 255, 255, ${0.15 + particle.id * 0.01})`,
                  filter: "blur(1px)",
                }}
                animate={{
                  x: x.get() * (particle.id % 2 === 0 ? 0.15 : -0.15),
                  y: y.get() * (particle.id % 2 === 0 ? 0.15 : -0.15),
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  type: "spring",
                  damping: 50,
                  stiffness: 50,
                  opacity: {
                    duration: particle.duration * 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              />
            )}
            {particle.id % 4 === 1 && (
              <motion.div
                className="w-full h-full"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 0, 255, ${0.1 + particle.id * 0.01}) 0%, rgba(150, 0, 255, ${0.05 + particle.id * 0.005}) 100%)`,
                  boxShadow: `0 0 ${15 + particle.id}px rgba(255, 0, 255, ${0.15 + particle.id * 0.01})`,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  filter: "blur(1px)",
                }}
                animate={{
                  x: x.get() * (particle.id % 2 === 0 ? 0.1 : -0.1),
                  y: y.get() * (particle.id % 2 === 0 ? 0.1 : -0.1),
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  type: "spring",
                  damping: 50,
                  stiffness: 50,
                  opacity: {
                    duration: particle.duration * 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              />
            )}
            {particle.id % 4 === 2 && (
              <motion.div
                className="w-full h-full"
                style={{
                  background: `linear-gradient(45deg, rgba(255, 255, 0, ${0.1 + particle.id * 0.01}) 0%, rgba(255, 150, 0, ${0.05 + particle.id * 0.005}) 100%)`,
                  boxShadow: `0 0 ${15 + particle.id}px rgba(255, 255, 0, ${0.15 + particle.id * 0.01})`,
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  filter: "blur(1px)",
                }}
                animate={{
                  x: x.get() * (particle.id % 2 === 0 ? 0.12 : -0.12),
                  y: y.get() * (particle.id % 2 === 0 ? 0.12 : -0.12),
                  opacity: [0.25, 0.45, 0.25],
                }}
                transition={{
                  type: "spring",
                  damping: 50,
                  stiffness: 50,
                  opacity: {
                    duration: particle.duration * 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              />
            )}
            {particle.id % 4 === 3 && (
              <motion.div
                className="w-full h-full"
                style={{
                  background: `linear-gradient(90deg, rgba(0, 255, 150, ${0.1 + particle.id * 0.01}) 0%, rgba(0, 150, 255, ${0.05 + particle.id * 0.005}) 100%)`,
                  boxShadow: `0 0 ${15 + particle.id}px rgba(0, 255, 150, ${0.15 + particle.id * 0.01})`,
                  clipPath:
                    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  filter: "blur(1px)",
                }}
                animate={{
                  x: x.get() * (particle.id % 2 === 0 ? 0.08 : -0.08),
                  y: y.get() * (particle.id % 2 === 0 ? 0.08 : -0.08),
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  type: "spring",
                  damping: 50,
                  stiffness: 50,
                  opacity: {
                    duration: particle.duration * 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Grid lines */}
      {/* <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ x: x.get() * 0.3, y: y.get() * 0.3 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div> */}

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

      {/* Main Content */}
      {/* Added padding-top to clear navbar, reversed column for mobile, centered content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-12 gap-8 lg:gap-16">
        {/* Left side - Text content */}
        <motion.div
          className="flex-1 max-w-2xl text-center lg:text-left w-full"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* ===== Status Badge ===== */}
          <motion.div
            className="mb-4 flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-sm font-medium backdrop-blur-md">
              🚀 Available for Freelance Projects
            </div>
          </motion.div>
          <motion.div
            className="mb-2 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="text-cyan-400 text-base sm:text-lg font-medium">
              Hello, I&#39;m
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight"
            style={{
              textShadow:
                "0 5px 15px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.2)",
            }}
            initial={{ opacity: 0, rotateX: -90, y: 50 }}
            animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Hasanuzzaman
          </motion.h1>

          {/* Responsive Typing Height */}
          <motion.div
            className="h-10 sm:h-12 md:h-14 lg:h-16 mb-4 sm:mb-6 flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed px-2 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            I build modern, responsive, and high-performance web applications
            using the MERN stack, Next.js, and TypeScript. Passionate about
            creating intuitive user experiences, writing clean code, and
            continuously expanding my skills through real-world projects.
          </motion.p>

          <motion.div
            className="flex justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1 }}
          >
            {techIcons.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  className={`${tech.color}`}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    delay: tech.delay,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2, rotate: 180 }}
                >
                  <Icon size={24} className="sm:w-8 sm:h-8" />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="flex items-center gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
          >
            {/* Arrow Icon */}
            {/* Arrow Icon */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 4, -4, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow Background */}
              <motion.div
                className="absolute w-14 h-14 rounded-full bg-cyan-400/20 blur-xl"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <Image
                src={arrow}
                alt="arrow"
                width={44}
                height={44}
                className="relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
              />
            </motion.div>

            {/* Play Button + Text */}
            <div className="flex items-center gap-4">
              {/* Animated Play Button */}
              <motion.button
                onClick={() => setIsVideoOpen(true)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(34,211,238,0.4)",
                    "0 0 20px rgba(34,211,238,0.6)",
                    "0 0 0px rgba(34,211,238,0.4)",
                  ],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
        relative
        w-16 h-16
        flex items-center justify-center
        rounded-full
        bg-white/10
        border border-white/20
        backdrop-blur-md
        text-cyan-400
        hover:bg-cyan-500
        hover:text-white
        hover:border-cyan-400
        transition-all duration-300
      "
              >
                {/* Pulse Ring */}
                <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping" />

                <Play size={22} />
              </motion.button>

              {/* Work Process Text */}
              <span className="text-white text-lg font-medium leading-tight">
                Work <br /> Process
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Image */}
        <motion.div
          className="flex-1 max-w-sm sm:max-w-lg w-full flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative w-full max-w-[280px] sm:max-w-[350px] lg:max-w-none"
            whileHover={{ rotateY: 10, rotateX: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-3xl opacity-30"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Image container - Responsive Height */}
            <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-cyan-400/30 shadow-2xl">
              <motion.div
                className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={heroImg}
                  alt="Hasanuzzaman Image"
                  fill
                  className="object-contain sm:object-cover"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </motion.div>
            </div>

            {/* Badges - Responsive positioning and size */}
            <motion.div
              className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full shadow-lg z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs sm:text-sm font-bold">1+ Years</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1 rounded-full shadow-lg z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <span className="text-xs sm:text-sm font-bold">10+ Projects</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={28} className="sm:w-8 sm:h-8" />
      </motion.div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className="relative bg-[#0f0f0f] rounded-2xl w-full max-w-4xl overflow-hidden border border-white/10 shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-50 p-2  bg-gradient-to-r from-cyan-500 to-blue-500  backdrop-blur rounded-full text-white hover:from-red-500 hover:to-red-600 transition-all duration-300"
              >
                <X size={18} />
              </button>

              {/* Video */}
              <div className="relative aspect-video">
                {isVideoOpen && (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/tQHAwV9B8hQ?autoplay=1&rel=0"
                    title="Portfolio Demo"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
