"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Database,
  Palette,
  Cloud,
  Award,
  Target,
  Lightbulb,
  Users,
  GitBranch,
  Terminal,
  Rocket,
  CheckCircle,
  Server,
  MessageSquare,
  Clock,
  Layers,
  Zap,
  GraduationCap,
  FolderGit2,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: string;
  experience: string;
  projects: number;
}

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const skills: Skill[] = [
    {
      name: "React.js",
      level: 75,
      icon: <Code size={18} />,
      category: "frontend",
      experience: "1.5 years",
      projects: 4,
    },
    {
      name: "Next.js",
      level: 60,
      icon: <Rocket size={18} />,
      category: "frontend",
      experience: "6 months",
      projects: 2,
    },
    {
      name: "TypeScript",
      level: 65,
      icon: <Code size={18} />,
      category: "frontend",
      experience: "1 year",
      projects: 3,
    },
    {
      name: "Tailwind CSS",
      level: 80,
      icon: <Palette size={18} />,
      category: "frontend",
      experience: "1.5 years",
      projects: 5,
    },
    {
      name: "Node.js",
      level: 70,
      icon: <Terminal size={18} />,
      category: "backend",
      experience: "1 year",
      projects: 3,
    },
    {
      name: "Express.js",
      level: 68,
      icon: <Server size={18} />,
      category: "backend",
      experience: "1 year",
      projects: 3,
    },
    {
      name: "MongoDB",
      level: 72,
      icon: <Database size={18} />,
      category: "backend",
      experience: "1 year",
      projects: 4,
    },
    {
      name: "PostgreSQL",
      level: 50,
      icon: <Database size={18} />,
      category: "backend",
      experience: "3 months",
      projects: 1,
    },
    {
      name: "Git & GitHub",
      level: 78,
      icon: <GitBranch size={18} />,
      category: "tools",
      experience: "1.5 years",
      projects: 12,
    },
    {
      name: "Docker",
      level: 40,
      icon: <Layers size={18} />,
      category: "tools",
      experience: "Learning",
      projects: 1,
    },
    {
      name: "Vercel / Netlify",
      level: 85,
      icon: <Cloud size={18} />,
      category: "cloud",
      experience: "1 year",
      projects: 6,
    },
    {
      name: "AWS (S3/EC2)",
      level: 35,
      icon: <Cloud size={18} />,
      category: "cloud",
      experience: "Exploring",
      projects: 1,
    },
  ];

  const softSkills = [
    { name: "Eager to Learn", icon: <Lightbulb size={16} />, level: 95 },
    { name: "Team Collaboration", icon: <Users size={16} />, level: 85 },
    { name: "Taking Feedback", icon: <MessageSquare size={16} />, level: 90 },
    { name: "Problem Solving", icon: <Target size={16} />, level: 75 },
    { name: "Adaptability", icon: <Zap size={16} />, level: 88 },
    { name: "Time Management", icon: <Clock size={16} />, level: 80 },
  ];

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Dev Tools" },
    { id: "cloud", name: "Cloud" },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 overflow-x-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_40%)]" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Tech Stack
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            As a junior developer, I&apos;m actively building my foundation in
            the MERN stack while exploring modern tools and cloud technologies.
          </p>
        </motion.div>

        {/* Filter Tabs (Fixed from original) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white border-transparent shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Technical Skills Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white/[0.03] backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                        {skill.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">
                          {skill.name}
                        </h4>
                        <p className="text-slate-500 text-xs">
                          {skill.experience}
                        </p>
                      </div>
                    </div>
                    <span className="text-cyan-400 font-bold text-sm">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.2 + index * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  </div>

                  {/* Project Count */}
                  <div className="flex items-center gap-1.5 mt-3 text-slate-500 text-xs">
                    <FolderGit2 size={12} />
                    <span>
                      {skill.projects} project{skill.projects !== 1 ? "s" : ""}{" "}
                      built
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Currently Learning */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={20} className="text-yellow-400 animate-pulse" />
                Currently Exploring
              </h3>
              <ul className="space-y-3">
                {[
                  "Next.js Server Actions",
                  "Docker & Containerization",
                  "TypeScript Generics",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-slate-300 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Users size={20} className="text-cyan-400" />
                Soft Skills
              </h3>
              <div className="space-y-4">
                {softSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="flex items-center gap-2 text-slate-300">
                        <span className="text-slate-500">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 font-medium text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1">
                      <motion.div
                        className="h-full rounded-full bg-slate-600"
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <GraduationCap size={20} className="text-blue-400" />
                Learning Journey
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-400">12+</div>
                  <p className="text-slate-500 text-xs mt-1">Udemy Courses</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">150+</div>
                  <p className="text-slate-500 text-xs mt-1">Github Commits</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Award size={20} className="text-yellow-400" />
                Certifications
              </h3>
              <div className="space-y-3">
                {[
                  "freeCodeCamp Responsive Web Design",
                  "freeCodeCamp JS Algorithms",
                  "Udemy: 2024 Web Dev Bootcamp",
                  "Coursera: Meta Back-End Developer",
                ].map((cert) => (
                  <div
                    key={cert}
                    className="flex items-start gap-2 text-slate-400 text-xs leading-relaxed"
                  >
                    <CheckCircle
                      size={14}
                      className="text-green-400 mt-0.5 flex-shrink-0"
                    />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
