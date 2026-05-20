"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

export default function LimitlessHorizon() {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[90vh] bg-[#050505] flex items-center justify-center cursor-pointer border-y border-white/10 overflow-hidden"
    >
      {/* Background Kinetic Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none">
        <h2
          className="text-[15vw] font-bold uppercase text-[#233C7F]/30 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            letterSpacing: isHovered ? "0.1em" : "-0.05em",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {t("horizon_1")}
        </h2>
      </div>

      {/* Expanding Window */}
      <div
        className="relative z-20 overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex items-center justify-center"
        style={{
          width: isHovered ? "100%" : "300px",
          height: isHovered ? "100%" : "450px",
          borderRadius: isHovered ? "0px" : "250px",
        }}
      >
        {/* Anchored image container */}
        <div className="absolute w-[100vw] h-[90vh] flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=80&w=2000&h=1200"
              alt="Premium Horizon"
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-[2000ms] ease-out ${
                isHovered ? "scale-100" : "scale-110"
              }`}
            />
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
            <div
              className={`absolute inset-0 bg-black/40 transition-opacity duration-1000 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Inner Typography (revealed on hover) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center z-30 transition-all duration-1000 delay-200 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-white text-5xl md:text-8xl font-bold uppercase tracking-tighter drop-shadow-2xl">
            {t("horizon_2")}
          </h2>
          <p className="text-white/90 font-serif text-xl md:text-3xl italic mt-6 drop-shadow-lg">
            {t("horizon_3")}
          </p>
        </div>
      </div>

      {/* Hover Indicator (hidden on hover) */}
      <div
        className={`absolute z-30 transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/5">
          <span className="text-white uppercase tracking-widest text-[10px] font-semibold">
            Hover
          </span>
        </div>
      </div>
    </section>
  );
}
