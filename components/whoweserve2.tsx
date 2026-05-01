'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { UserRound, Lightbulb, Building2, Linkedin, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';

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

function TileCard({ title, Icon, imagePath }: Tile) {
  return (
    <div
      className="bg-white rounded-2xl border border-blue-50 overflow-hidden
                 transition-all duration-300 hover:-translate-y-1.5
                 hover:shadow-[0_16px_40px_rgba(21,93,252,0.1)]"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: '5/7' }}>
        <Image
          src={imagePath}
          alt={title.replace('\n', ' ')}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-3 px-4 py-4">
        <h3 className="whitespace-pre-line text-xl font-bold tracking-tight text-[#155DFC]">
          {title}
        </h3>
        <div className="shrink-0 w-13 h-13 rounded-xl bg-blue-50 flex items-center justify-center text-[#155DFC]">
          <Icon size={26} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

export default function ContentCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setActiveIndex((i) => (i - 1 + TILES.length) % TILES.length);
  const next = () => setActiveIndex((i) => (i + 1) % TILES.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="py-10 font-sans max-w-8xl mx-auto md:px-40 px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-blue-900 leading-tight">
          Our Offerings
        </h2>
      </div>
      <div
        className="hidden md:grid"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: GAP }}
      >
        {TILES.map((tile) => (
          <TileCard key={tile.id} {...tile} />
        ))}
      </div>
      {/* mobile view */}
      <div
        className="md:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {TILES.map((tile) => (
              <div key={tile.id} className="min-w-full">
                <TileCard {...tile} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 px-1">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex items-center justify-center w-10 h-10 rounded-full
                       bg-white border border-blue-100 shadow-sm text-[#155DFC]
                       active:bg-blue-50 transition-colors duration-150"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {TILES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-6 h-2 bg-[#155DFC]'
                    : 'w-2 h-2 bg-blue-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="flex items-center justify-center w-10 h-10 rounded-full
                       bg-white border border-blue-100 shadow-sm text-[#155DFC]
                       active:bg-blue-50 transition-colors duration-150"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <p className="text-center text-sm text-blue-300 font-medium mt-3 tabular-nums">
          {activeIndex + 1} / {TILES.length}
        </p>
      </div>
    </div>
  );
}