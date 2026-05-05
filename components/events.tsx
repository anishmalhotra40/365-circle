"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const STATIC_CARD = {
  id: 0,
  status: "completed",
  thumbnail: "/cxo_event.jpeg",
  name: "CXO RoundTable",
  date: "2026-05-02",
  location: "Delhi",
};

type Card = {
  id: number;
  content: ReactNode;
  className: string;
  thumbnail: string;
  status: string;
};

function BentoCard({
  card,
  className,
}: {
  card: Card;
  className?: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      className={cn(
        "group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end bg-white border border-blue-100",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.025,
        boxShadow: "0 8px 40px 0 rgba(30, 64, 175, 0.18)",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {/* Status badge */}
      <span
        className={cn(
          "absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold uppercase",
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

      {/* Thumbnail */}
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        height="500"
        width="500"
        className="object-cover object-top absolute inset-0 h-full w-full"
        alt="thumbnail"
        style={{ zIndex: 1 }}
      />

      {/* Hover overlay */}
      {hovered && (
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center bg-blue-700/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <div className="text-white w-full text-center p-6">
            {card.content}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}


function DynamicGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card) => (
        <BentoCard key={card.id} card={card} className="h-[280px]" />
      ))}
    </div>
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

function makeCard(event: EventType): Card {
  return {
    id: event.id,
    thumbnail: event.image_url || "/feature1.png",
    className: "",
    status: event.status,
    content: (
      <div className="text-white">
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <div className="flex flex-col gap-1 text-sm">
          <span>
            <b>Date:</b> {event.date}
          </span>
          {event.time && (
            <span>
              <b>Time:</b> {event.time}
            </span>
          )}
          <span>
            <b>Location:</b> {event.location}
          </span>
        </div>
      </div>
    ),
  };
}

const staticCard: Card = {
  id: STATIC_CARD.id,
  thumbnail: STATIC_CARD.thumbnail,
  className: "",
  status: STATIC_CARD.status,
  content: (
    <div className="text-white">
      <h3 className="text-3xl font-extrabold mb-3">{STATIC_CARD.name}</h3>
      <div className="flex flex-col gap-1.5 text-base">
        <span>
          <b>Date:</b> {STATIC_CARD.date}
        </span>
        <span>
          <b>Location:</b> {STATIC_CARD.location}
        </span>
      </div>
    </div>
  ),
};

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

  if (loading)
    return <div className="text-center py-10">Loading events...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!events.length)
    return <div className="text-center py-10">No events found.</div>;

  const dynamicCards = events.map(makeCard);

  return (
    <section className="py-16">
      <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-10">
        Events
      </h2>

      <div className="w-full max-w-7xl mx-auto px-10 flex flex-col gap-6">
        <BentoCard
          card={staticCard}
          className="w-full h-[380px] md:h-[420px]"
        />
        <DynamicGrid cards={dynamicCards} />
      </div>

      <div className="flex justify-center mt-8">
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