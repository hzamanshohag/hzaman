// "use client";

// import { motion } from "framer-motion";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Github,
//   Linkedin,
//   Twitter,
//   Instagram,
//   ArrowUpRight,
//   Sparkles,
//   Facebook,
// } from "lucide-react";

// const ContactSection = () => {
//   const contactInfo = [
//     {
//       icon: <Mail size={28} />,
//       label: "Email",
//       value: "hzaman.live@gmail.com",
//       href: "mailto:hzaman.live@gmail.com",
//     },
//     {
//       icon: <Phone size={28} />,
//       label: "Phone",
//       value: "+880 1312-116844",
//       href: "tel:+8801312116844",
//     },
//     {
//       icon: <MapPin size={28} />,
//       label: "Location",
//       value: "Khulna, Bangladesh",
//       href: "https://maps.app.goo.gl/quTKaiCuqbA4EY4P6",
//     },
//   ];

//   const socialLinks = [
//     {
//       icon: <Github size={22} />,
//       label: "GitHub",
//       href: "https://github.com/hzamanshohag",
//     },
//     {
//       icon: <Linkedin size={22} />,
//       label: "LinkedIn",
//       href: "https://www.linkedin.com/in/hzaman-shohag",
//     },
//     {
//       icon: <Facebook size={22} />,
//       label: "Facebook",
//       href: "https://www.facebook.com/hzaman.shohag",
//     },
//     {
//       icon: <Instagram size={22} />,
//       label: "Instagram",
//       href: "https://www.instagram.com/hzaman.shohag",
//     },
//   ];

//   return (
//     <section
//       id="contact"
//       className="relative py-32 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] overflow-hidden"
//     >
//       {/* Ambient Glows */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />

//       {/* Grid Overlay */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
//             `,
//             backgroundSize: "80px 80px",
//           }}
//         />
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto">
//         {/* Section Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Get In{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
//               Touch
//             </span>
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
//         </div>

//         {/* Interactive Contact List */}
//         <div className="border-t border-white/10 mb-16">
//           {contactInfo.map((info, index) => (
//             <motion.a
//               key={index}
//               href={info.href}
//               target={info.label === "Location" ? "_blank" : undefined}
//               rel="noopener noreferrer"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               className="group relative border-b border-white/10 transition-colors duration-300 hover:bg-white/[0.02] block"
//             >
//               {/* Hover Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//               <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-10 px-2 md:px-6 gap-4">
//                 <div className="flex items-center gap-6 md:gap-8">
//                   <div className="text-cyan-400 transition-transform duration-300 group-hover:scale-110">
//                     {info.icon}
//                   </div>
//                   <div>
//                     <span className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
//                       {info.label}
//                     </span>
//                     <span className="text-2xl md:text-4xl font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
//                       {info.value}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
//                   <span className="hidden md:inline">
//                     {info.label === "Email"
//                       ? "Send a message"
//                       : info.label === "Phone"
//                         ? "Call now"
//                         : "View on map"}
//                   </span>
//                   <ArrowUpRight
//                     size={24}
//                     className="group-hover:rotate-12 transition-transform duration-300"
//                   />
//                 </div>
//               </div>
//             </motion.a>
//           ))}
//         </div>

//         {/* Footer Section: Status & Socials */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10"
//         >
//           {/* Availability Status */}
//           <div className="flex items-center gap-4">
//             <div className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </div>
//             <div>
//               <h4 className="text-white font-semibold text-lg">
//                 Available for Work
//               </h4>
//               <p className="text-slate-400 text-sm">
//                 Instant response during active hours.
//               </p>
//             </div>
//           </div>

//           {/* Divider Line */}
//           <div className="hidden md:block h-12 w-px bg-white/10"></div>

//           {/* Social Links */}
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-slate-500 mr-2 hidden sm:inline">
//               Follow:
//             </span>
//             {socialLinks.map((social, index) => (
//               <motion.a
//                 key={index}
//                 href={social.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={social.label}
//                 whileHover={{ scale: 1.1, y: -4 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300"
//               >
//                 {social.icon}
//               </motion.a>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;

"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Facebook,
  MessageCircle,
  User,
  Send,
} from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'm ${form.name}!\n\n${form.message}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/8801312116844?text=${encoded}&type=phone_number&app_absent=0`;
    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail size={28} />,
      label: "Email",
      value: "hzaman.live@gmail.com",
      href: "mailto:hzaman.live@gmail.com",
      cta: "Send a message",
    },
    {
      icon: <Phone size={28} />,
      label: "Phone",
      value: "+880 1312-116844",
      href: "tel:+8801312116844",
      cta: "Call now",
    },
    {
      icon: <MapPin size={28} />,
      label: "Location",
      value: "Khulna, Bangladesh",
      href: "https://maps.app.goo.gl/quTKaiCuqbA4EY4P6",
      cta: "View on map",
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      href: "https://github.com/hzamanshohag",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hzaman-shohag",
    },
    {
      icon: <Facebook size={20} />,
      label: "Facebook",
      href: "https://www.facebook.com/hzaman.shohag",
    },
    {
      icon: <Instagram size={20} />,
      label: "Instagram",
      href: "https://www.instagram.com/hzaman.shohag",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-32 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141414] overflow-hidden"
    >
      {/* Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.12),transparent_40%)]" />

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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Let’s talk! Send me a message below.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          {/* WhatsApp Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col max-w-2xl w-full"
          >
            {/* Form header */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-[#25D366]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Message on WhatsApp
                </p>
                <p className="text-slate-500 text-xs">
                  Opens WhatsApp with your message ready
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 flex-1"
            >
              {/* Name */}
              <div className="relative">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
                  />
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#25D366]/40 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex-1 flex flex-col">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Your Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Hi! I'd like to discuss a project..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="flex-1 resize-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#25D366]/40 focus:bg-white/[0.06] transition-all duration-200"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  sent
                    ? "bg-green-500/20 border border-green-500/30 text-green-400"
                    : "bg-[#25D366] hover:bg-[#20bd5a] text-black"
                }`}
              >
                {sent ? (
                  <>
                    <span>✓</span>
                    <span>Opening WhatsApp…</span>
                  </>
                ) : (
                  <>
                    <MessageCircle size={16} />
                    <span>Send via WhatsApp</span>
                  </>
                )}
              </motion.button>

              <p className="text-center text-[11px] text-slate-600">
                Clicking will open WhatsApp with your message pre-filled
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;