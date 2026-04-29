'use client';

import Image from 'next/image';
import { UserRound, Lightbulb, Building2, Linkedin, type LucideIcon } from 'lucide-react';

interface Tile {
  id: string;
  title: string;
  Icon: LucideIcon;
  imagePath: string;
}

const TILES: Tile[] = [
  { id: 'leadership', title: 'Leadership \n Spotlight', Icon: UserRound, imagePath: '/servls.jpg' },
  { id: 'startup', title: 'Startup \n Spotlight', Icon: Building2, imagePath: '/servsu.jpg' },
  { id: 'linkedin', title: 'LinkedIn Account Management', Icon: Linkedin, imagePath: '/servlm.jpg' },
  { id: 'thought', title: 'Thought \n Leadership', Icon: Lightbulb, imagePath: '/servtl.jpg' },
];

const GAP = 24;

export default function ContentCards() {
  return (
    <div className="py-10 font-sans max-w-8xl mx-auto px-40">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Our Offerings
          </h2>
        </div>
      </div>

      {/* Static Grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: GAP,
        }}
      >
        {TILES.slice(0, 4).map(({ id, title, Icon, imagePath }) => (
          <div
            key={id}
            className="bg-white rounded-2xl border border-blue-50 overflow-hidden
                       transition-all duration-300 hover:-translate-y-1.5 
                       hover:shadow-[0_16px_40px_rgba(21,93,252,0.1)]"
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "5/7" }}>
              <Image
                src={imagePath}
                alt={title.replace("\n", " ")}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex items-start justify-between gap-3 px-4 py-4">
              <h3 className="whitespace-pre-line text-xl font-bold tracking-tight text-[#155DFC]">
                {title}
              </h3>

              <div className="shrink-0 w-13 h-13 rounded-xl bg-blue-50 flex items-center justify-center text-[#155DFC]">
                <Icon size={26} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}