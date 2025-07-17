"use client";

import React from "react";
import { SpotlightCardWithReveal } from "./SpotlightCardWithReveal";

export const WhoWeServe = () => {
  return (
    <section className="w-full px-6 py-12 md:px-20 mt-4 bg-blue-50/50 text-blue-900">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-700 inline-block transition-colors duration-300 group relative group-hover:text-blue-300">
          Who We Serve
          <span className="block h-1 w-16 bg-blue-200 rounded-full mx-auto mt-3"></span>
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left card: lighter blue */}
        <SpotlightCardWithReveal
          radius={300}
          color="#60a5fa" // Tailwind blue-400
          className="relative bg-blue-100/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-blue-200 hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.04] transition-all duration-300 group overflow-hidden"
        >
          {/* Card image as background */}
          <img
            src="/feature1.png"
            alt="CXOs, Founders & Business Leaders"
            className="absolute inset-0 w-full h-full object-cover scale-175 rounded-xl opacity-20 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none select-none z-0"
          />
          <div className="relative z-10 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none">
            <h3 className="text-xl md:text-2xl font-bold text-blue-500 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              For CXOs, Founders & Business Leaders
            </h3>
            <p className="text-sm md:text-base text-blue-800 leading-relaxed">
              We spotlight career journeys, innovations, and offerings that deserve to be seen.
              From powerful pivots to breakthrough ideas, we help leaders articulate their vision,
              amplify their presence, and unlock new opportunities—through partnerships, strategic collaborations, or community-led engagements.
            </p>
          </div>
        </SpotlightCardWithReveal>

        {/* Middle and right cards: even lighter blue */}
        <div className="flex flex-col gap-8 md:col-span-2">
          <SpotlightCardWithReveal
            radius={300}
            color="#93c5fd" // Tailwind blue-300
            className="relative bg-blue-100/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-blue-200 hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.04] transition-all duration-300 group overflow-hidden"
          >
            <img
              src="/feature2.png"
              alt="Businesses"
              className="absolute inset-0 w-full h-full object-cover scale-175 rounded-xl opacity-15 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none select-none z-0"
            />
            <div className="relative z-10 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none">
              <h3 className="text-xl md:text-2xl font-bold text-blue-500 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                For Businesses
              </h3>
              <p className="text-sm md:text-base text-blue-800 leading-relaxed">
                We capture the essence of growing ventures—showcasing what makes them unique
                and opening doors to collaborative projects, new engagements, and cross-industry partnerships within the Circle.
              </p>
            </div>
          </SpotlightCardWithReveal>

          <SpotlightCardWithReveal
            radius={300}
            color="#93c5fd" // Tailwind blue-300
            className="relative bg-blue-100/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-blue-200 hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.04] transition-all duration-300 group overflow-hidden"
          >
            <img
              src="/feature3.png"
              alt="Aspirants & Emerging Leaders"
              className="absolute inset-0 w-full h-full object-cover scale-175 rounded-xl opacity-15 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none select-none z-0"
            />
            <div className="relative z-10 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none">
              <h3 className="text-xl md:text-2xl font-bold text-blue-500 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                For Aspirants & Emerging Leaders
              </h3>
              <p className="text-sm md:text-base text-blue-800 leading-relaxed">
                This is where ambition meets access. Discover stories that inspire bold thinking,
                gain mentorship through authentic conversations, and contribute to a network built on shared growth.
                <span className="italic"> The 365 Circle </span> offers a space to rise, engage, and lead.
              </p>
            </div>
          </SpotlightCardWithReveal>
        </div>
      </div>
    </section>
  );
};
