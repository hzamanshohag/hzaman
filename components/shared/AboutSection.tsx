"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  BookOpen,
  Code,
  Terminal,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Search,
  Megaphone,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import aboutUsImage from "@/public/img/about-us-img.jpg";

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
  description: string[];
  technologies: string[];
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string[];
}

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<
    "skills" | "experience" | "education"
  >("skills");

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const skills: Skill[] = [
    {
      name: "Frontend (React & Next.js)",
      level: 90,
      icon: <Code size={18} />,
      color: "from-cyan-400 to-blue-500",
      barColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    },
    {
      name: "Backend (Node & Express)",
      level: 85,
      icon: <Terminal size={18} />,
      color: "from-emerald-400 to-green-500",
      barColor: "bg-gradient-to-r from-emerald-500 to-green-600",
    },
    {
      name: "Technical SEO & Analytics",
      level: 75,
      icon: <Search size={18} />,
      color: "from-indigo-400 to-violet-500",
      barColor: "bg-gradient-to-r from-indigo-500 to-violet-600",
    },
    {
      name: "Social Media Marketing",
      level: 70,
      icon: <Megaphone size={18} />,
      color: "from-fuchsia-400 to-pink-500",
      barColor: "bg-gradient-to-r from-fuchsia-500 to-pink-600",
    },
    {
      name: "Meta Ads & Campaigns",
      level: 65,
      icon: <BarChart3 size={18} />,
      color: "from-blue-400 to-indigo-500",
      barColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
  ];

  const experiences: Experience[] = [
    {
      id: 1,
      title: "Junior Full Stack Developer",
      company: "Freelance",
      period: "Mar 2024 - Present",
      description: [
        "Developing responsive web apps using React.js, Next.js, TypeScript, Tailwind CSS, and Shadcn UI.",
        "Building secure RESTful APIs with Node.js and Express.js.",
        "Designing and managing MongoDB databases with Mongoose.",
        "Implementing authentication with JWT and Firebase.",
        "Integrating third-party APIs and payment gateways.",
        "Writing clean, maintainable, and scalable code.",
        "Optimizing performance and responsive UX.",
      ],
      technologies: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Redux",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Shadcn UI",
      ],
    },
  ];

  const education: Education[] = [
    {
      id: 1,
      degree: "M.A. in Islamic History & Culture",
      institution: "Govt. B.L. College, Khulna",
      period: "Sep 2025 - Present",
      description: [
        "Pursuing M.A. under National University, Bangladesh.",
        "Department of Islamic History & Culture (Session: 2022–2023).",
        "Continuing professional development in software engineering.",
      ],
    },
    {
      id: 2,
      degree: "Bachelor of Arts (B.A.)",
      institution: "Sahid Abul Kashem Degree College",
      period: "Oct 2019 - Mar 2022",
      description: [
        "Completed B.A. under National University, Bangladesh.",
        "Major: Political Science, Sociology, Islamic History.",
        "CGPA: 2.58 out of 4.00.",
      ],
    },
    {
      id: 3,
      degree: "HSC – Business Studies",
      institution: "Bangladesh Noubahini School & College",
      period: "Jul 2016 - Oct 2019",
      description: [
        "Higher Secondary in Business Studies.",
        "Foundation in business, accounting, finance, economics.",
        "GPA: 3.00 out of 5.00.",
      ],
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 overflow-x-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              My Expertise
            </span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left Side */}
          <motion.div
            className="space-y-5 sm:space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Profile Card - Fixed responsive height */}
            <div className="relative h-[280px] sm:h-[340px] md:h-[400px] lg:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={aboutUsImage}
                alt="Md Hasanuzzaman Shohag"
                fill
                className="object-cover object-top sm:object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6">
                <p className="text-cyan-400 font-semibold text-sm sm:text-base">
                  Junior Full Stack Developer
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  Dedicated to developing modern full stack web applications
                  with clean architecture, responsive interfaces, and secure
                  backend solutions. Always eager to learn new technologies and
                  deliver meaningful digital experiences.
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                Contact Information
              </h4>

              <div className="space-y-2.5 sm:space-y-3 text-slate-300 text-sm sm:text-base">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <Mail size={16} className="text-cyan-400 flex-shrink-0" />
                  <span className="truncate">hzaman.live@email.com</span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Phone size={16} className="text-cyan-400 flex-shrink-0" />
                  <span>+880 1312-116844</span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <MapPin size={16} className="text-cyan-400 flex-shrink-0" />
                  <span>Khulna, Bangladesh</span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801312116844"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 sm:mt-6 block"
              >
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition-transform rounded-full text-sm sm:text-base h-10 sm:h-11">
                  <MessageCircle size={16} className="mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Tab Navigation - Fixed for mobile */}
            <div className="flex gap-1.5 sm:gap-2 mb-5 sm:mb-6">
              {(["skills", "experience", "education"] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-2 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="space-y-1.5 sm:space-y-2"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${skill.color} bg-opacity-20 flex-shrink-0`}
                          >
                            {skill.icon}
                          </div>
                          <span className="text-white font-medium text-xs sm:text-sm leading-tight">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-cyan-400 font-semibold text-xs sm:text-sm flex-shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
                        <motion.div
                          className={`bg-gradient-to-r ${skill.color} h-1.5 sm:h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.1 + 0.2,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="relative pl-6 sm:pl-8 border-l-2 border-cyan-400/30"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className="absolute -left-[5px] sm:-left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      />
                      <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                        <h4 className="text-base sm:text-lg font-semibold text-white leading-snug">
                          {exp.title}
                        </h4>
                        <p className="text-cyan-400 text-xs sm:text-sm mb-1">
                          {exp.company}
                        </p>
                        <p className="text-gray-400 text-[11px] sm:text-xs mb-2 sm:mb-3">
                          {exp.period}
                        </p>
                        <div className="mb-3 sm:mb-4">
                          <ul className="space-y-1.5 sm:space-y-2">
                            {exp.description.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed"
                              >
                                <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 sm:py-1 bg-cyan-400/20 text-cyan-400 text-[10px] sm:text-xs rounded-full"
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="flex gap-3 sm:gap-4"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BookOpen className="text-white" size={16} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-lg font-semibold text-white leading-snug">
                          {edu.degree}
                        </h4>
                        <p className="text-purple-400 text-xs sm:text-sm mb-0.5 sm:mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-gray-400 text-[11px] sm:text-xs mb-1.5 sm:mb-2">
                          {edu.period}
                        </p>
                        <div className="mt-2 sm:mt-4 space-y-1.5 sm:space-y-3">
                          {edu.description.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 sm:gap-3"
                            >
                              <div className="mt-1.5 sm:mt-2 h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                                {item}
                              </p>
                            </div>
                          ))}
                        </div>
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
