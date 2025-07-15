"use client";
import React from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = () => {
  const text = "THE 365 CIRCLE";
  const svgWidth = 800;

  return (
    <div className="w-full overflow-hidden flex items-center">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: -svgWidth }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 12,
          ease: "linear",
        }}
        style={{ display: "flex" }}
      >
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width={svgWidth}
            height="140"
            viewBox={`0 0 ${svgWidth} 140`}
            xmlns="http://www.w3.org/2000/svg"
            className="h-[70px] md:h-[140px]"
            style={{ flex: "none", display: "block" }}
          >
            <defs>
              <linearGradient id={`textGradient${i}`} x1="0" y1="0" x2={svgWidth} y2="0">
                <stop offset="0%" stopColor="#405ff4" />
                <stop offset="100%" stopColor="#30bdf2" />
              </linearGradient>
            </defs>

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              stroke={`url(#textGradient${i})`}
              strokeWidth="1.2"
              fill="transparent"
              fontFamily="Helvetica, Arial, sans-serif"
              fontWeight="bold"
              style={{ fontSize: "90px", opacity: 0.9 }}
            >
              {text}
            </text>
          </svg>
        ))}
      </motion.div>
    </div>
  );
};
