'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { UserRound, MoveRight, Lightbulb, Building2, Linkedin, type LucideIcon } from 'lucide-react';

interface Tile {
  id: string;
  title: string;
  Icon: LucideIcon;
  imagePath: string;
}

const TILES: Tile[] = [
  { id: 'leadership', title: 'Leadership \n Spotlight',        Icon: UserRound, imagePath: '/servls.jpg' },
  { id: 'startup',    title: 'Startup \n Spotlight',           Icon: Building2, imagePath: '/servsu.jpg' },
  { id: 'linkedin',   title: 'LinkedIn \n Account Management', Icon: Linkedin,  imagePath: '/servlm.jpg' },
  { id: 'thought',    title: 'Thought \n Leadership',         Icon: Lightbulb, imagePath: '/servtl.jpg' },
  { id: 'industry',   title: 'Industry \n Movements',          Icon: MoveRight, imagePath: '/serv3.jpg'  },
];

const GAP      = 24;
const VISIBLE  = 3;
const STEP     = 2;
const MAX_STEP = TILES.length - VISIBLE;

export default function ContentCarousel() {
  const [offset, setOffset] = useState(0);
  const [cardPx, setCardPx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    if (containerRef.current) {
      setCardPx((containerRef.current.offsetWidth - GAP * (VISIBLE - 1)) / VISIBLE);
    }
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <div className="py-10 font-sans max-w-8xl mx-auto px-60">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#155DFC] mb-1.5">
            Our Offerings
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Featured Post
          </h2>
        </div>
        <div className="flex gap-2.5">
          {[
            { label: 'Previous', disabled: offset === 0,        onClick: () => setOffset(o => o - STEP), path: 'M10 12L6 8L10 4' },
            { label: 'Next',     disabled: offset === MAX_STEP, onClick: () => setOffset(o => o + STEP), path: 'M6 4L10 8L6 12' },
          ].map(({ label, disabled, onClick, path }) => (
            <button
              key={label}
              aria-label={label}
              disabled={disabled}
              onClick={onClick}
              className="w-11 h-11 rounded-full border border-blue-100 bg-white text-[#155DFC]
                         flex items-center justify-center transition
                         hover:bg-[#155DFC] hover:text-white hover:border-[#155DFC] hover:scale-105
                         active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d={path} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="overflow-x-hidden overflow-y-visible">
        <div
          className="py-2 flex transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]"
          style={{ gap: GAP, transform: `translateX(${-offset * (cardPx + GAP)}px)` }}
        >
          {TILES.map(({ id, title, Icon, imagePath }) => (
            <div
              key={id}
              className="flex-shrink-0 bg-white rounded-2xl border border-blue-50 overflow-hidden
                         transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(21,93,252,0.1)]"
              style={{ width: cardPx || `calc((100% - ${GAP * (VISIBLE - 1)}px) / ${VISIBLE})` }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '5/7' }}>
                <Image
                  src={imagePath}
                  alt={title.replace('\n', ' ')}
                  fill
                  sizes="33vw"
                  className="object-cover"
                  priority={id === 'leadership' || id === 'industry'}
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
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-1.5 mt-6">
        {[0, 1].map(i => {
          const target = i === 1 ? MAX_STEP : 0;
          const active = offset === target;
          return (
            <button
              key={i}
              onClick={() => setOffset(target)}
              aria-label={`Slide group ${i + 1}`}
              className={`h-1.5 rounded-full border-none transition-all duration-300 cursor-pointer
                ${active ? 'w-5 bg-[#155DFC]' : 'w-1.5 bg-blue-200'}`}
            />
          );
        })}
      </div>
    </div>
  );
}