"use client";

import { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";
import {
  BookOpen,
  Code,
  Database,
  Globe,
  Terminal,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Link2,
  Palette,
  ShieldCheck,
  Search,
  Megaphone,
  BarChart3
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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

const skills: Skill[] = [
  // Frontend
  {
    name: "Frontend Development (React.js & Next.js)",
    level: 90,
    icon: <Code size={20} />,
    color: "from-cyan-400 to-blue-500",
    barColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
  },
  // Backend
  {
    name: "Backend Development (Node.js & Express.js)",
    level: 85,
    icon: <Terminal size={20} />,
    color: "from-emerald-400 to-green-500",
    barColor: "bg-gradient-to-r from-emerald-500 to-green-600",
  },
  // SEO & Marketing
  {
    name: "Technical SEO & Analytics",
    level: 75,
    icon: <Search size={20} />,
    color: "from-indigo-400 to-violet-500",
    barColor: "bg-gradient-to-r from-indigo-500 to-violet-600",
  },
  {
    name: "Social Media Marketing",
    level: 70,
    icon: <Megaphone size={20} />,
    color: "from-fuchsia-400 to-pink-500",
    barColor: "bg-gradient-to-r from-fuchsia-500 to-pink-600",
  },
  {
    name: "Meta Ads & Campaigns",
    level: 65,
    icon: <BarChart3 size={20} />,
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
       "Developing responsive and user-friendly web applications using React.js, Next.js, TypeScript, Tailwind CSS, and Shadcn UI.",
       "Building secure RESTful APIs with Node.js and Express.js.",
       "Designing and managing MongoDB databases using Mongoose.",
       "Implementing authentication with JWT and Firebase Authentication.",
       "Integrating third-party APIs and payment gateways.",
       "Writing clean, maintainable, and scalable code following modern development best practices.",
       "Optimizing application performance and ensuring responsive user experiences.",
     ],
     technologies: [
       "React.js",
       "Next.js",
       "TypeScript",
       "Redux Toolkit",
       "Node.js",
       "Express.js",
       "MongoDB",
       "Mongoose",
       "Tailwind CSS",
       "Shadcn UI",
     ],
   }
 ];

 const education: Education[] = [
   {
     id: 1,
     degree: "Master of Arts (M.A.) in Islamic History & Culture",
     institution: "Govt. B.L. College, Khulna",
     period: "Sep 2025 - Present",
     description: [
       "Currently pursuing a Master of Arts (M.A.) in Islamic History & Culture under National University, Bangladesh.",
       "Enrolled in the Department of Islamic History & Culture (Session: 2022–2023).",
       "Expanding knowledge through advanced academic studies while continuing professional development in software engineering.",
     ],
   },
   {
     id: 2,
     degree: "Bachelor of Arts (B.A.)",
     institution: "Sahid Abul Kashem Degree College",
     period: "Oct 2019 - Mar 2022",
     description: [
       "Completed a Bachelor of Arts under National University, Bangladesh.",
       "Major subjects included Political Science, Sociology, and Islamic History.",
       "Graduated with a CGPA of 2.58 out of 4.00.",
     ],
   },
   {
     id: 3,
     degree: "Higher Secondary Certificate (HSC) – Business Studies",
     institution: "Bangladesh Noubahini School & College",
     period: "Jul 2016 - Oct 2019",
     description: [
       "Completed Higher Secondary education in Business Studies.",
       "Built a strong foundation in business, accounting, finance, and economics.",
       "Achieved a GPA of 3.00 out of 5.00.",
     ],
   },
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
                src={aboutUsImage}
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
                  Junior Full Stack Developer
                </p>
                <p className="text-slate-300 text-sm mt-3">
                  Dedicated to developing modern full stack web applications
                  with clean architecture, responsive interfaces, and secure
                  backend solutions. Always eager to learn new technologies and
                  deliver meaningful digital experiences.
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
                        <div className="mb-4">
                          <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"
                              >
                                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
                        <div className="mt-4 space-y-3">
                          {edu.description.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                              <p className="text-sm leading-relaxed text-slate-300">
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
