"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Card = {
  id: number;
  content: ReactNode;
  className: string;
  thumbnail: string;
  status: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  // Match the bento layout in the image:
  // [ large | tall ]
  // [ small | wide ]
  // If less than 5 cards, fallback to normal grid
  if (cards.length < 5) {
    return (
      <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-6 relative">
        {cards.map((card, i) => (
          <BentoCard key={i} card={card} size="normal" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full p-10 grid max-w-7xl mx-auto gap-6 relative"
      style={{
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gridTemplateAreas: `
          "large tall tall"
          "large small wide"
        `,
      }}
    >
      <BentoCard card={cards[0]} size="large" area="large" />
      <BentoCard card={cards[1]} size="tall" area="tall" />
      <BentoCard card={cards[2]} size="small" area="small" />
      <BentoCard card={cards[3]} size="wide" area="wide" />
      {/* Render any extra cards as normal below */}
      {cards.slice(4).map((card, i) => (
        <BentoCard key={i + 4} card={card} size="normal" />
      ))}
    </div>
  );
};

function BentoCard({ card, size, area }: { card: Card; size: "large" | "tall" | "small" | "wide" | "normal"; area?: string }) {
  const [hovered, setHovered] = React.useState(false);
  const base =
    size === "large"
      ? "row-span-2 col-span-1 h-[520px] md:h-[520px]"
      : size === "tall"
      ? "row-span-2 col-span-1 h-[250px] md:h-[520px]"
      : size === "small"
      ? "row-span-1 col-span-1 h-[250px]"
      : size === "wide"
      ? "row-span-1 col-span-2 h-[250px]"
      : "h-[300px]";
  return (
    <motion.div
      className={cn(
        "group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end bg-white border border-blue-100 transition-all duration-500",
        base
      )}
      style={area ? { gridArea: area } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.025, boxShadow: "0 8px 40px 0 rgba(30, 64, 175, 0.18)" }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {/* Status badge always visible */}
      <span
        className={cn(
          "absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all duration-500",
          card.status === "upcoming"
            ? "bg-blue-600 text-white"
            : card.status === "ongoing"
            ? "bg-green-600 text-white"
            : card.status === "completed"
            ? "bg-gray-400 text-white"
            : card.status === "cancelled"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700"
        )}
      >
        {card.status}
      </span>
      {/* Event image */}
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        height="500"
        width="500"
        className="object-cover object-top absolute inset-0 h-full w-full transition duration-500"
        alt="thumbnail"
        style={{ zIndex: 1 }}
      />
      {/* Show details overlay only on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center bg-blue-700/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <div className="text-white w-full text-center p-6">
            {card.content}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

type EventType = {
  id: number;
  name: string;
  date: string;
  time?: string;
  location: string;
  status: string;
  image_url?: string;
};

/**
 * Events section displays a grid of event cards and a Register Now button.
 * @param onRegister Optional callback for Register Now button click.
 */
export default function Events({ onRegister }: { onRegister?: () => void }) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("events")
        .select("id, name, date, time, location, status, image_url");
      if (error) {
        setError("Failed to fetch events");
        setLoading(false);
        return;
      }
      // Sort: upcoming first, then by date ascending
      const sorted = (data || []).sort((a, b) => {
        if (a.status === "upcoming" && b.status !== "upcoming") return -1;
        if (a.status !== "upcoming" && b.status === "upcoming") return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setEvents(sorted);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-10">Loading events...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!events.length) return <div className="text-center py-10">No events found.</div>;

  // In the Card mapping, make card.content only the event details (name, date, time, location):
  const cards: Card[] = events.map((event) => ({
    id: event.id,
    thumbnail: event.image_url || "/feature1.png",
    className: "",
    status: event.status,
    content: (
      <div className="text-white">
        <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
        <div className="flex flex-col gap-1 text-base">
          <span><b>Date:</b> {event.date}</span>
          {event.time && <span><b>Time:</b> {event.time}</span>}
          <span><b>Location:</b> {event.location}</span>
        </div>
      </div>
    ),
  }));

  return (
    <section className="py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 text-center mb-10">Events</h2>
      <LayoutGrid cards={cards} />
      <div className="flex justify-center mt-2">
        <button
          className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-5 py-3 text-base font-semibold shadow-lg transition-all duration-300"
          onClick={() => onRegister && onRegister()}
        >
          Register Now
        </button>
      </div>
    </section>
  );
}
