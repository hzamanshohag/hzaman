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
  ArrowUpRight,
  Heart,
  Code,
  ChevronRight,
  Facebook,
} from "lucide-react";
import Link from "next/link";

const FooterSection = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentYear = new Date().getFullYear();

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
    {
      icon: <Github size={20} />,
      href: "https://github.com/hzamanshohag",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/hzaman-shohag",
      label: "LinkedIn",
    },
    {
      icon: <Facebook size={20} />,
      href: "https://facebook.com/hzaman.shohag",
      label: "Facebook",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/hzaman.shohag",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] border-t border-white/10 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(59,130,246,0.1),transparent_40%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
        {/* Massive Brand Typography */}
        <div className="text-center mb-12">
          <Link href="#home" className="inline-block group">
            <h1 className="text-[18vw] md:text-[14vw] lg:text-[12rem] font-bold text-white/[0.03] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-700 leading-none tracking-tighter">
              Hzaman.
            </h1>
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
          {/* Bio & Socials (Takes 5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg shadow-cyan-500/20">
                <Code className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white">
                Hzaman Shohag
              </span>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
              Passionate full-stack developer crafting scalable,
              high-performance web applications with modern technologies.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links (Takes 3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.2em] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 w-fit"
                  >
                    <ChevronRight
                      size={16}
                      className="text-cyan-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Takes 4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-[0.2em] mb-6">
              Get In Touch
            </h4>
            <div className="space-y-5">
              <a
                href="mailto:hzaman.live@gmail.com"
                className="group flex items-center gap-4 text-slate-400 hover:text-white transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                  <Mail size={16} className="text-cyan-400" />
                </div>
                <span className="text-sm md:text-base">
                  hzaman.live@gmail.com
                </span>
              </a>
              <a
                href="tel:+8801312116844"
                className="group flex items-center gap-4 text-slate-400 hover:text-white transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                  <Phone size={16} className="text-cyan-400" />
                </div>
                <span className="text-sm md:text-base">+880 1312-116844</span>
              </a>
              <div className="group flex items-center gap-4 text-slate-400">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                  <MapPin size={16} className="text-cyan-400" />
                </div>
                <span className="text-sm md:text-base">khulna, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm order-2 md:order-1">
            © {currentYear} Hzaman. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-slate-500 text-sm order-1 md:order-2">
            <span>Designed with</span>
            <Heart
              size={14}
              className="text-red-500 fill-current animate-pulse"
            />
            <span>by</span>
            <a
              href="https://www.linkedin.com/in/hzaman-shohag/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 hover:opacity-80 transition-opacity"
            >
              Hzaman
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button with Progress Ring */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
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
                  stroke="url(#footerGradient)"
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
                    id="footerGradient"
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
                aria-label="Scroll to top"
                className="absolute inset-2 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white shadow-lg shadow-cyan-500/30"
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default FooterSection;
