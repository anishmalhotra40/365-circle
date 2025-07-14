"use client";
import React from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = () => {
  const text = "365 CIRCLE";
  // SVG width and viewBox are set to tightly fit the text
  return (
    <div className="w-full max-w-full overflow-hidden py-2 flex items-center">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 12,
          ease: "linear",
        }}
        style={{ width: "200%" }}
      >
        {/* Repeat SVG twice for seamless loop, no margin */}
        {[0, 1].map((i) => (
          <svg
            key={i}
            width="1000"
            height="200"
            viewBox="0 0 1000 200"
            xmlns="http://www.w3.org/2000/svg"
            className="min-w-[1000px] md:min-w-[1000px] h-[100px] md:h-[200px]"
            style={{ flex: "none", display: "block" }}
          >
            <defs>
              <linearGradient id={`textGradient${i}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
                <stop offset="0%" stopColor="#405ff4" />
                <stop offset="100%" stopColor="#30bdf2" />
              </linearGradient>
            </defs>
            {/* Outline text */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="#405ff4"
              strokeWidth="1.4"
              className="fill-transparent font-[helvetica] text-[9rem] font-bold"
              style={{ opacity: 0.7 }}
            >
              {text}
            </text>
            {/* Animated stroke draw */}
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="#405ff4"
              strokeWidth="0.7"
              className="fill-transparent font-[helvetica] text-[9rem] font-bold"
              initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
              animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
              transition={{ duration: 4, ease: "easeInOut" }}
            >
              {text}
            </motion.text>
            {/* Gradient text reveal */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              stroke={`url(#textGradient${i})`}
              strokeWidth="0.7"
              className="fill-transparent font-[helvetica] text-[9rem] font-bold"
            >
              {text}
            </text>
          </svg>
        ))}
      </motion.div>
    </div>
  );
};
