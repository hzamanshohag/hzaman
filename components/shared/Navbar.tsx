"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Briefcase, Video, Code } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/#home", icon: Home },
    { name: "About", href: "/#about", icon: User },
    { name: "Projects", href: "/#projects", icon: Briefcase },
    { name: "Skills", href: "/#skills", icon: Code },
    { name: "Videos", href: "/#videos", icon: Video },
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link
              href="#home"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-9 h-9 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Code className="text-white w-5 h-5" />
              </div>
              <span className="text-white font-bold text-lg sm:text-xl">
                Hz
              </span>
            </Link>

            {/* DESKTOP NAV (Only lg and above) */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm font-medium"
                  >
                    <Icon size={16} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden lg:block">
              <Link href="#contact">
                <Button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6">
                  Let's Talk
                </Button>
              </Link>
            </div>

            {/* HAMBURGER (Mobile + Tablet) */}
            <button
              className="lg:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors relative z-[60]" // Increased z-index to ensure it's clickable if needed
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE + TABLET DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* BACKDROP */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* SIDE PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-[80%] sm:w-72 md:w-80 max-w-sm bg-gradient-to-b from-[#1e293b] to-[#0f172a] border-l border-white/10 p-6 flex flex-col"
            >
              {/* DRAWER HEADER WITH CLOSE BUTTON */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-white font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* NAV ITEMS */}
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition"
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-8">
                <Link href="#contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    Let's Talk
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
