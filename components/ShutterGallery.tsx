"use client";

import { useState } from "react";
import Image from "next/image";

const items = [
  {
    id: "01",
    title: "BEYOND",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000&h=1500",
  },
  {
    id: "02",
    title: "HORIZONS",
    img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2000&h=1500",
  },
  {
    id: "03",
    title: "BOUNDARIES",
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000&h=1500",
  },
];

export default function ShutterGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-[90vh] md:h-[100vh] bg-[#050505] flex flex-col md:flex-row border-y border-white/10 overflow-hidden">
      {/* Left Spine: Typographic Navigation */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center pl-6 md:pl-20 z-20 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-white/20 pointer-events-none" />

        {items.map((item, i) => (
          <button
            type="button"
            key={i}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") setActiveIndex(i);
            }}
            onFocus={() => setActiveIndex(i)}
            onPointerUp={(e) => {
              if (e.pointerType !== "mouse") setActiveIndex(i);
            }}
            aria-pressed={activeIndex === i}
            className="group cursor-pointer py-4 md:py-8 text-left"
          >
            <div className="flex items-center gap-4 md:gap-8">
              <span
                className={`font-mono text-xs md:text-sm transition-colors duration-200 ${
                  activeIndex === i ? "text-[#233C7F]" : "text-white/20"
                }`}
              >
                {item.id}
              </span>
              <div className="relative">
                <span
                  className="block text-[12vw] md:text-[7vw] font-bold tracking-tighter uppercase transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                  style={{
                    color: activeIndex === i ? "white" : "transparent",
                    WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                    transform:
                      activeIndex === i
                        ? "translateX(20px)"
                        : "translateX(0px)",
                  }}
                >
                  {item.title}
                </span>
                <div
                  className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-[#233C7F] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    activeIndex === i
                      ? "scale-x-100 opacity-100 translate-x-5"
                      : "scale-x-0 opacity-0 translate-x-0"
                  }`}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Right Stage: 5-Blade Shutter Engine */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-[#111]">
        {items.map((item, imgIndex) => {
          const isActive = activeIndex === imgIndex;

          return (
            <div
              key={imgIndex}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {[...Array(5)].map((_, sliceIndex) => {
                const left = sliceIndex * 20;
                const right = 100 - (sliceIndex + 1) * 20;
                const isEven = sliceIndex % 2 === 0;

                return (
                  <div
                    key={sliceIndex}
                    className="absolute inset-0 w-full h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none overflow-hidden"
                    style={{
                      clipPath: `inset(0 ${right}% 0 ${left}%)`,
                      transform: isActive
                        ? "translateY(0%)"
                        : isEven
                        ? "translateY(-100%)"
                        : "translateY(100%)",
                      transitionDelay: isActive ? `${sliceIndex * 50}ms` : "0ms",
                      zIndex: isActive ? 10 : 1,
                    }}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="50vw"
                      className={`object-cover transition-transform duration-[900ms] ease-out motion-reduce:transition-none ${
                        isActive ? "scale-100" : "scale-110"
                      }`}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-[1px] bg-white/10"
                      style={{ left: `${left}%` }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Crosshairs overlay */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 mix-blend-overlay pointer-events-none z-30" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 mix-blend-overlay pointer-events-none z-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-30 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
