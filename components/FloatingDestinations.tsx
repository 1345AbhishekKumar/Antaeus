"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    name: "Dubai",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800&h=1000",
  },
];

export default function FloatingDestinations() {
  const { t } = useTranslation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const render = useCallback(() => {
    frameRef.current = null;
    const follower = followerRef.current;
    const container = containerRef.current;
    if (!follower || !container) return;

    const rect = container.getBoundingClientRect();
    const x = pointerRef.current.x - rect.left;
    const y = pointerRef.current.y - rect.top;
    follower.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    pointerRef.current = { x: e.clientX, y: e.clientY };
    setIsPointerActive(true);
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(render);
    }
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setHoveredIdx(null);
        setIsPointerActive(false);
      }}
      className="relative py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full">
        <RevealLine />
      </div>

      {/* Floating image follower */}
      <div
        ref={followerRef}
        className="pointer-events-none absolute left-0 top-0 z-0 w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-lg transition-opacity duration-200 ease-out will-change-transform"
        style={{
          opacity: hoveredIdx !== null && isPointerActive ? 1 : 0,
        }}
      >
        {destinations.map((d, i) => (
          <Image
            key={i}
            src={d.img}
            alt=""
            fill
            sizes="(max-width: 768px) 256px, 320px"
            className={`object-cover transition-[opacity,transform] duration-300 ease-out ${
              hoveredIdx === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
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
          <button
            type="button"
            key={i}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setHoveredIdx(i);
            }}
            onFocus={() => setHoveredIdx(i)}
            onBlur={() => setHoveredIdx(null)}
            onPointerUp={(e) => {
              if (e.pointerType !== "mouse") {
                setHoveredIdx((prev) => (prev === i ? null : i));
              }
            }}
            aria-pressed={hoveredIdx === i}
            className="group mb-4 md:mb-8 text-left"
          >
            <span
              className="block text-[12vw] md:text-[8vw] font-bold uppercase leading-[0.85] tracking-tighter transition-[transform,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{
                WebkitTextStroke:
                  hoveredIdx === i ? "0px black" : "1px black",
                color: hoveredIdx === i ? "black" : "transparent",
                transform:
                  hoveredIdx === i
                    ? "scale(1.04) rotate(-2deg)"
                    : "scale(1) rotate(0deg)",
              }}
            >
              {d.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
