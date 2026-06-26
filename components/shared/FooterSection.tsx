"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  Code,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

   const [scrollProgress, setScrollProgress] = useState(0);

   useEffect(() => {
     const handleScroll = () => {
       const scrollTop = window.scrollY;
       const height =
         document.documentElement.scrollHeight -
         document.documentElement.clientHeight;

       const progress = (scrollTop / height) * 100;

       setScrollProgress(progress);
       setShowScrollTop(scrollTop > 200);
     };

     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const scrollToTop = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const radius = 28;
   const circumference = 2 * Math.PI * radius;
   const strokeDashoffset =
     circumference - (scrollProgress / 100) * circumference;

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Github size={18} />, href: "#", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] border-t border-white/10">
      {/* Cyan Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_40%)]" />

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <Code className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-white">Hzaman</span>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Passionate full-stack developer crafting scalable,
              high-performance web applications with modern technologies.
            </p>

            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" />
                john.doe@example.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-400" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition"
                  >
                    <ChevronRight size={14} className="text-cyan-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Let’s Work Together
            </h4>
            <p className="text-gray-400 mb-6">
              Have an idea or project in mind? Let’s create something impactful.
            </p>

            <Link
              href="#contact"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 px-4 md:px-8 lg:px-12 ">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex flex-col items-center justify-center gap-3 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex flex-wrap items-center justify-center gap-2 text-gray-400 text-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span>© {currentYear} All rights reserved.</span>

                <motion.div
                  className="flex items-center gap-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <span>Developed with</span>
                  <Heart
                    size={14}
                    className="text-red-500 fill-current animate-pulse"
                  />
                  <span>by</span>
                  <a
                    href="https://www.linkedin.com/in/hzaman-shohag/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-80 transition-opacity"
                  >
                    Hzaman
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="relative w-16 h-16">
              {/* SVG Progress Ring */}
              <svg
                className="absolute top-0 left-0 w-full h-full -rotate-90"
                viewBox="0 0 60 60"
              >
                {/* Background Circle */}
                <circle
                  cx="30"
                  cy="30"
                  r={radius}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                  fill="transparent"
                />

                {/* Progress Circle */}
                <motion.circle
                  cx="30"
                  cy="30"
                  r={radius}
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transition={{ duration: 0.2 }}
                />

                {/* Gradient Definition */}
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
                absolute inset-2
                flex items-center justify-center
                bg-gradient-to-r from-cyan-500 to-blue-500
                rounded-full text-white
                shadow-lg
              "
              >
                <ArrowUp size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default FooterSection;
