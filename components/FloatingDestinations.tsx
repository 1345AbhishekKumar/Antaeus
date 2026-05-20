"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { RevealLine } from "@/components/UI";

const destinations = [
  {
    name: "Tokyo",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    name: "New York",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    name: "Paris",
    img: "https://images.unsplash.com/photo-1502602898657-3e90761138a0?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    name: "Dubai",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800&h=1000",
  },
];

export default function FloatingDestinations() {
  const { t } = useTranslation();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full">
        <RevealLine />
      </div>

      {/* Floating image follower */}
      <div
        className="pointer-events-none absolute z-0 w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-lg"
        style={{
          opacity: hoveredIdx !== null ? 1 : 0,
          transform: `translate(${pos.x - 160}px, ${pos.y - 200}px)`,
          transition:
            "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-in-out",
          position: "absolute",
        }}
      >
        {destinations.map((d, i) => (
          <Image
            key={i}
            src={d.img}
            alt={d.name}
            fill
            sizes="(max-width: 768px) 256px, 320px"
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              hoveredIdx === i ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          />
        ))}
      </div>

      {/* Destination list */}
      <div className="relative z-10 flex flex-col items-center py-12">
        <h3 className="text-sm font-semibold tracking-widest uppercase mb-16 text-black/40">
          {t("reach_title")}
        </h3>
        {destinations.map((d, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group cursor-pointer mb-4 md:mb-8 transition-all duration-500"
          >
            <span
              className="block text-[12vw] md:text-[8vw] font-bold uppercase leading-[0.85] tracking-tighter transition-all duration-500 origin-center"
              style={{
                WebkitTextStroke:
                  hoveredIdx === i ? "0px black" : "1px black",
                color: hoveredIdx === i ? "black" : "transparent",
                transform:
                  hoveredIdx === i
                    ? "scale(1.05) rotate(-2deg)"
                    : "scale(1) rotate(0deg)",
              }}
            >
              <span className={hoveredIdx === i ? "italic" : ""}>{d.name}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
