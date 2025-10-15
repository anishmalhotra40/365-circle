"use client";

import React from "react";
import { Building2, UserRound, MoveRight, Lightbulb } from "lucide-react";
import Image from "next/image";

type Tile = {
  id: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  imagePath: string;
};

const TILES: Tile[] = [
  { id: "cxo", title: "CXO Featuring", Icon: UserRound, imagePath: "/serv1.jpg" },
  { id: "company", title: "Company Profile Featuring", Icon: Building2, imagePath: "/serv2.jpg" },
  { id: "industry", title: "Industry Movements", Icon: MoveRight, imagePath: "/serv3.jpg" },
  { id: "thought", title: "Thought Leaderships", Icon: Lightbulb, imagePath: "/serv4.jpg" },
];

export const WhoWeServe = () => {
  return (
    <section className="w-full px-6 py-12 md:px-20 mt-4 bg-blue-50/50 text-blue-900">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-4xl font-extrabold tracking-tight text-blue-700 inline-block transition-colors duration-300 group relative group-hover:text-blue-300">
          Our Offerings
        </h2>
      </div>
      <h2 className="text-2xl md:text-2xl text-center font-extrabold tracking-tight text-black block mx-auto max-w-3xl transition-colors duration-300 group relative group-hover:text-blue-300">
        Featured Post
      </h2>
      <section className="mx-auto max-w-6xl px-4 mt-4 py-2 pb-80">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map(({ id, title, Icon, imagePath }) => (
            <div key={id} className="relative group">
              {/* Card */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-200 bg-white shadow-sm p-6 transition hover:shadow-md relative z-10">
                <h3 className="text-center text-base font-semibold mb-2 text-blue-800">
                  {title}
                </h3>
                <Icon className="h-10 w-10 text-blue-600" aria-hidden="true" />
              </div>

              {/* Downward Spotlight Effect - Always Visible */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 transition-all duration-500 ease-out">
                {/* Blue Spotlight beam from card to image - 3x longer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 opacity-50 h-24 bg-gradient-to-b from-blue-500/60 to-blue-400/80 group-hover:from-blue-600/80 group-hover:to-blue-500/90 transition-all duration-300" />

                {/* Image container with spotlight - connected to beam */}
                <div className="relative w-64 h-56 rounded-xl overflow-hidden shadow-2xl border-2 border-blue-400 group-hover:border-blue-500 transition-all duration-300 mt-24">
                  {/* Blue spotlight glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400/40 via-blue-300/20 to-transparent z-10 pointer-events-none group-hover:from-blue-500/50 transition-all duration-300" />
                  
                  {/* Radial spotlight effect */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/30 rounded-full blur-2xl z-10 pointer-events-none group-hover:bg-blue-500/40 group-hover:w-40 group-hover:h-40 transition-all duration-300" />
                  
                  <Image
                    src={imagePath}
                    alt={title}
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
