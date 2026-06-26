"use client";

import { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  User,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Database,
  Globe,
  Terminal,
  Calendar,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
  barColor: string;
}

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<
    "skills" | "experience" | "education"
  >("skills");

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const skills: Skill[] = [
    {
      name: "React / Next.js",
      level: 95,
      icon: <Code size={20} />,
      color: "from-cyan-400 to-blue-500",
      barColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    },
    {
      name: "Node.js / Express",
      level: 90,
      icon: <Terminal size={20} />,
      color: "from-emerald-400 to-teal-500",
      barColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
    {
      name: "MongoDB",
      level: 85,
      icon: <Database size={20} />,
      color: "from-green-400 to-emerald-500",
      barColor: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      name: "TypeScript",
      level: 88,
      icon: <Code size={20} />,
      color: "from-blue-400 to-indigo-500",
      barColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      name: "Tailwind CSS",
      level: 92,
      icon: <Globe size={20} />,
      color: "from-sky-400 to-cyan-500",
      barColor: "bg-gradient-to-r from-sky-500 to-cyan-600",
    },
    {
      name: "Digital Marketing Strategy",
      level: 85,
      icon: <Globe size={20} />,
      color: "from-pink-400 to-rose-500",
      barColor: "bg-gradient-to-r from-pink-500 to-rose-600",
    },
  ];

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Senior Full-Stack MERN Developer",
      company: "Freelance & Remote Clients",
      period: "2022 - Present",
      description:
        "Architecting scalable SaaS platforms, REST APIs, and high-performance web applications using MERN stack and Next.js.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      company: "Digital Product Agency",
      period: "2020 - 2022",
      description:
        "Built responsive web applications and integrated marketing-driven analytics solutions to improve user engagement.",
      technologies: ["Express", "Redux", "PostgreSQL", "SEO", "Analytics"],
    },
  ];

  const education: Education[] = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University",
      period: "2015 - 2019",
      description:
        "Focused on Software Engineering, Data Structures, and Web Development.",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects", icon: <Briefcase size={20} /> },
    { number: "5+", label: "Years Experience", icon: <Calendar size={20} /> },
    { number: "30+", label: "Clients", icon: <User size={20} /> },
    { number: "100%", label: "Commitment", icon: <Award size={20} /> },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      // ✅ FIX 1: Added overflow-x-hidden to prevent horizontal scroll
      className="relative min-h-screen py-24 px-4 overflow-x-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
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

      {/* ✅ FIX 3: Added overflow-hidden to the container wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto overflow-hidden">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              My Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Profile Card */}
            <div className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://i.ibb.co.com/21fyZxZ8/facebook-bg-photo.jpg"
                alt="Md Hasanuzzaman Shohag"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                {/* <h3 className="text-3xl font-bold text-white">
                  Md Hasanuzzaman Shohag
                </h3> */}
                <p className="text-cyan-400 font-semibold">
                  Full-Stack Developer & Digital Marketing Strategist
                </p>
                <p className="text-slate-300 text-sm mt-3">
                  I build scalable, high-performance web applications using
                  MongoDB, Express.js, React, Node.js, Next.js, and TypeScript —
                  blending clean architecture with data-driven marketing
                  strategies to drive measurable business growth.
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold text-white mb-4">
                Contact Information
              </h4>

              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                  <span className="truncate">hzaman.live@email.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-cyan-400 flex-shrink-0" />
                  <span>+880 1312-116844</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-cyan-400 flex-shrink-0" />
                  <span>Khulna, Bangladesh</span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801312116844"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block"
              >
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-transform rounded-full">
                  <MessageCircle size={18} className="mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Side */}
          {/* ✅ FIX 4: Removed x: 50 from initial — this was the ROOT CAUSE of overflow */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["skills", "experience", "education"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-20 flex-shrink-0`}
                          >
                            {skill.icon}
                          </div>
                          {/* ✅ FIX 5: truncate prevents text overflow on small screens */}
                          <span className="text-white font-medium text-sm truncate">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-cyan-400 font-semibold flex-shrink-0 ml-2">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="relative pl-8 border-l-2 border-cyan-400/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      />
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white leading-snug">
                          {exp.title}
                        </h4>
                        <p className="text-cyan-400 text-sm mb-1">
                          {exp.company}
                        </p>
                        <p className="text-gray-400 text-xs mb-2">
                          {exp.period}
                        </p>
                        <p className="text-gray-300 text-sm mb-3">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BookOpen className="text-white" size={20} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-white leading-snug">
                          {edu.degree}
                        </h4>
                        <p className="text-purple-400 text-sm mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-gray-400 text-xs mb-2">
                          {edu.period}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {edu.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
