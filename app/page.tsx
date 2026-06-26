"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import HeroSection from "@/components/shared/HeroSection";
import AboutSection from "@/components/shared/AboutSection";
import ProjectsSection from "@/components/shared/ProjectsSection";
import SkillsSection from "@/components/shared/SkillsSection";
import FreelanceProjectsSection from "@/components/shared/FreelanceProjectsSection";
import CertificatesSection from "@/components/shared/CertificatesSection";
import VideosSection from "@/components/shared/VideosSection";
import ContactSection from "@/components/shared/ContactSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Loader Effect
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Hash Scroll Fix (ADD HERE)
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (!loading) {
      setTimeout(handleHashScroll, 200);
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* <Navbar /> */}

          <section id="home">
            <HeroSection />
          </section>

          <section id="about" className="min-h-screen">
            <AboutSection />
          </section>

          <section id="projects" className="min-h-screen">
            <ProjectsSection />
          </section>

          <section id="skills" className="min-h-screen">
            <SkillsSection />
          </section>

          <section id="freelancing" className="min-h-screen">
            <FreelanceProjectsSection />
          </section>

          <section id="pricing" className="min-h-screen">
            <CertificatesSection />
          </section>

          <section id="videos" className="min-h-screen">
            <VideosSection />
          </section>

          <section id="contact" className="min-h-screen">
            <ContactSection />
          </section>

          {/* <FooterSection /> */}
        </>
      )}
    </>
  );
}
