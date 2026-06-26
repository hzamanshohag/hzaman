"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Clock,
} from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: "john.doe@example.com",
      href: "mailto:john.doe@example.com",
    },
    {
      icon: <Phone size={22} />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={18} />,
      label: "GitHub",
      href: "https://github.com",
    },
    {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      href: "https://linkedin.com",
    },
    {
      icon: <Twitter size={18} />,
      label: "Twitter",
      href: "https://twitter.com",
    },
    {
      icon: <Instagram size={18} />,
      label: "Instagram",
      href: "https://instagram.com",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Touch
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let’s build something amazing together.
            Reach out through any of the platforms below.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.href}
              whileHover={{ y: -8 }}
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                {info.icon}
              </div>

              <h4 className="text-gray-400 text-sm mb-1">{info.label}</h4>
              <p className="text-white font-semibold">{info.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Connect With Me
          </h3>

          <div className="flex justify-center gap-6 flex-wrap">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <motion.div
          className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center max-w-xl mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Clock size={22} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
            </div>
          </div>

          <h4 className="text-white font-semibold mb-2">Available for Work</h4>
          <p className="text-gray-400 text-sm">
            Open for freelance & full-time opportunities. Usually responds
            within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
