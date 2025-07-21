"use client";

import Image from "next/image";
import Timeline from "./timeline";

const founderHighlights = [
  "On a mission to Network with 365 Inspiring Individuals in 365 Days",
  "Featured 250+ Stories",
  "100+ CXOs in our Network",
  "5 New-age Networking Events Conducted",
];

export default function AboutUsSection() {
  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-10 md:gap-12 items-stretch">
        {/* Left: Mission Section */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="md:hidden text-center mb-4">
            <h2 className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-2">
              Our Mission
            </h2>
            <h3 className="text-2xl font-extrabold text-blue-900 leading-tight mb-3">
              Connecting People, One Story at a Time
            </h3>
          </div>

          <div className="hidden md:block mb-4">
            <h2 className="text-xs md:text-sm font-semibold text-blue-600 tracking-widest uppercase mb-2">
              Our Mission
            </h2>
            <h3 className="text-2xl md:text-4xl font-extrabold text-blue-900 leading-tight mb-4">
              Connecting People, One Story at a Time
            </h3>
          </div>

          <p className="text-base md:text-lg text-blue-800/90 leading-relaxed mb-6 text-center md:text-left">
            To spotlight and celebrate the journeys of{" "}
            <span className="font-semibold text-blue-700">
              365 visionary CXOs, founders, and business leaders
            </span>{" "}
            —capturing their stories, sharing their offerings, and fostering
            meaningful opportunities within a thriving community of inspiration,
            insight, and connection.
          </p>
          <blockquote className="text-blue-900 italic text-base md:text-lg font-medium text-center md:text-left bg-blue-50/80 rounded-lg px-4 py-4">
            “We believe every person has a story worth sharing. A story that can spark an idea, offer a new perspective, or change a life.”
          </blockquote>
        </div>

        {/* Founder + Highlights Section */}
        <div className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-6">
          {/* Highlights */}
          <div className="flex flex-col items-center justify-center w-full md:w-[260px] min-h-[320px]">
            <div className="bg-blue-50 p-4 rounded-md shadow-sm text-xs md:text-sm text-blue-800 flex items-center justify-center text-center w-full max-w-[220px] font-medium h-[100px] md:h-[120px] mb-2">
              {founderHighlights[0]}
            </div>
            {founderHighlights.slice(1).map((point, i) => (
              <div
                key={i}
                className="bg-blue-50 p-4 rounded-md shadow-sm text-xs md:text-sm text-blue-800 flex items-center justify-center text-center w-full max-w-[220px] font-medium h-[60px] md:h-[66px] mb-2 last:mb-0"
              >
                {point}
              </div>
            ))}
          </div>

          {/* Founder Photo */}
          <div className="flex flex-col items-center w-full md:w-[260px] min-h-[320px] justify-center">
            <Image
              src="/anish.png"
              alt="Anish Malhotra - Founder"
              width={220}
              height={220}
              className="rounded-lg object-cover mb-2 mx-auto"
              priority
            />
            <h4 className="text-lg md:text-xl font-bold text-blue-900 mb-1 text-center">
              ANISH MALHOTRA
            </h4>
            <div className="text-blue-600 font-semibold text-xs md:text-sm mb-2 text-center">
              FOUNDER
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <Timeline />
    </section>
  );
}
