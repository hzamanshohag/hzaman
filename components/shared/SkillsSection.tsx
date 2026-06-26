"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Database,
  Palette,
  Cloud,
  Award,
  BookOpen,
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  GitBranch,
  Terminal,
  Globe,
  Rocket,
  Star,
  CheckCircle,
  Server,
  MessageSquare,
  Clock,
  Layers,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: string;
  experience: string;
  projects?: number;
}

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const skills: Skill[] = [
    {
      name: "React.js",
      level: 95,
      icon: <Code size={20} />,
      category: "frontend",
      experience: "5+ years",
      projects: 45,
    },
    {
      name: "Next.js",
      level: 90,
      icon: <Rocket size={20} />,
      category: "frontend",
      experience: "3+ years",
      projects: 25,
    },
    {
      name: "TypeScript",
      level: 88,
      icon: <Code size={20} />,
      category: "frontend",
      experience: "4+ years",
      projects: 35,
    },
    {
      name: "Tailwind CSS",
      level: 92,
      icon: <Palette size={20} />,
      category: "frontend",
      experience: "3+ years",
      projects: 40,
    },
    {
      name: "Node.js",
      level: 90,
      icon: <Terminal size={20} />,
      category: "backend",
      experience: "5+ years",
      projects: 38,
    },
    {
      name: "Express.js",
      level: 88,
      icon: <Server size={20} />,
      category: "backend",
      experience: "4+ years",
      projects: 30,
    },
    {
      name: "MongoDB",
      level: 85,
      icon: <Database size={20} />,
      category: "backend",
      experience: "4+ years",
      projects: 25,
    },
    {
      name: "PostgreSQL",
      level: 80,
      icon: <Database size={20} />,
      category: "backend",
      experience: "3+ years",
      projects: 15,
    },
    {
      name: "Git",
      level: 90,
      icon: <GitBranch size={20} />,
      category: "tools",
      experience: "5+ years",
      projects: 100,
    },
    {
      name: "Docker",
      level: 75,
      icon: <Layers size={20} />,
      category: "tools",
      experience: "2+ years",
      projects: 15,
    },
    {
      name: "AWS",
      level: 80,
      icon: <Cloud size={20} />,
      category: "cloud",
      experience: "3+ years",
      projects: 20,
    },
    {
      name: "Vercel",
      level: 88,
      icon: <Rocket size={20} />,
      category: "cloud",
      experience: "3+ years",
      projects: 35,
    },
  ];

  const softSkills = [
    { name: "Problem Solving", icon: <Lightbulb size={20} />, level: 95 },
    { name: "Team Collaboration", icon: <Users size={20} />, level: 90 },
    { name: "Project Management", icon: <Target size={20} />, level: 85 },
    { name: "Communication", icon: <MessageSquare size={20} />, level: 88 },
    { name: "Adaptability", icon: <TrendingUp size={20} />, level: 92 },
    { name: "Time Management", icon: <Clock size={20} />, level: 87 },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

      

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and professional
            skills built through real-world projects and continuous learning.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-cyan-400/40 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    {skill.icon}
                    {skill.name}
                  </div>
                  <span className="text-cyan-400 font-bold">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p className="text-slate-400 text-xs mt-2">
                  {skill.experience}
                </p>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users size={22} className="text-cyan-400" />
                Soft Skills
              </h3>
              {softSkills.map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between text-sm text-white mb-1">
                    <span className="flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </span>
                    <span className="text-cyan-400 font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Continuous Learning */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={22} className="text-cyan-400" />
                Continuous Learning
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">50+</div>
                  <p className="text-slate-400 text-xs">Courses Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">100+</div>
                  <p className="text-slate-400 text-xs">Hours Monthly</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award size={22} className="text-yellow-400" />
                Certifications
              </h3>
              {[
                "AWS Certified Developer",
                "MongoDB Certified Developer",
                "Advanced React Patterns",
                "Node.js Application Design",
              ].map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 text-slate-300 text-sm mb-2"
                >
                  <CheckCircle size={16} className="text-green-400" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
