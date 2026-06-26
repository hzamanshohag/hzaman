"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* Rotating Gradient Ring */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-transparent"
          style={{
            background:
              "conic-gradient(from 0deg, #06b6d4, #3b82f6, #9333ea, #06b6d4)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 6px), white 0)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), white 0)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner Logo */}
        <motion.div className="absolute flex items-center justify-center w-20 h-20 bg-[#0f172a] rounded-full top-2">
          <motion.div
            className="flex gap-[2px] text-base font-semibold tracking-wider"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {"Hzaman".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-80 transition-opacity"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mt-8 text-gray-300 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <LoadingDots />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;

const LoadingDots = () => {
  return (
    <div className="flex gap-1">
      {["L", "o", "a", "d", "i", "n", "g"].map((letter, index) => (
        <motion.span
          key={index}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            repeat: Infinity,
          }}
        >
          {letter}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ...
      </motion.span>
    </div>
  );
};
