"use client";

import Image from "next/image";
import Timeline from "./timeline";
import Timeline2 from "./timeline2";

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
              Connecting Leaders, One Story at a Time.
            </h3>
          </div>

          <div className="hidden md:block mb-4 items-center text-center">
            <h2 className="text-xs md:text-sm font-semibold text-blue-600 tracking-widest uppercase mb-2">
              Our Mission
            </h2>
            <h3 className="text-2xl md:text-4xl font-extrabold text-blue-900 leading-tight mb-4">
              Connecting Leaders, One Story at a Time.
            </h3>
          </div>

          <p className="text-base md:text-xl text-blue-800/90 leading-relaxed mb-6 text-center">
            To spotlight and celebrate the journeys of <span className="font-semibold text-blue-700">visionary CXOs, founders, business leaders, and emerging changemakers.</span> Capturing their stories, championing their vision, and cultivating meaningful opportunities within a thriving community of inspiration, insight, and connection.
          </p>
          <blockquote className="text-blue-900 italic text-base md:text-lg font-medium text-center bg-blue-50/80 rounded-lg px-4 py-4">
            &quot;We believe every story holds the power to spark an idea, open a door, and change the course of someone&apos;s life.&quot;
          </blockquote>
        </div>
      </div>

      {/* Founder + Timelines Section */}
      <div className="flex flex-col gap-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex flex-col items-center w-full md:w-[260px] min-h-[320px] justify-center">
            <Image
              src="/anish.png"
              alt="Anish Malhotra - Founder"
              width={220}
              height={220}
              className="rounded-lg object-cover mt-12"
              priority
            />
          </div>
          <div className="w-full md:flex-1">
            <Timeline />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="w-full md:flex-1">
            <Timeline2 />
          </div>
          <div className="flex flex-col items-center w-full md:w-[260px] min-h-[320px] justify-center">
            <Image
              src="/shrey.png"
              alt="Shrey Anand - Co Founder"
              width={220}
              height={220}
              className="rounded-lg object-cover mt-12"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
