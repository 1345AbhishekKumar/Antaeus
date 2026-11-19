"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

export default function LimitlessHorizon() {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={t("horizon_2")}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setIsExpanded(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setIsExpanded(false);
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") {
          setIsExpanded((value) => !value);
        }
      }}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded((value) => !value);
        }
      }}
      className="relative w-full h-[90vh] bg-[#050505] flex items-center justify-center cursor-pointer border-y border-white/10 overflow-hidden focus-visible:outline-offset-[-6px]"
    >
      {/* Background Kinetic Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none">
        <h2
          aria-hidden="true"
          className="text-[15vw] font-bold uppercase text-[#233C7F]/30 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{
            transform: isExpanded ? "scale(1.1)" : "scale(1)",
          }}
        >
          {t("horizon_1")}
        </h2>
      </div>

      {/* Expanding Window */}
      <div
        className="absolute inset-0 z-20 overflow-hidden transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{
          clipPath: isExpanded
            ? "inset(0% 0% 0% 0% round 0px)"
            : "inset(calc(50% - 225px) calc(50% - 150px) round 250px)",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&q=80&w=2000&h=1200"
            alt="Premium Horizon"
            fill
            sizes="100vw"
            className={`object-cover transition-transform duration-[900ms] ease-out motion-reduce:transition-none ${
              isExpanded ? "scale-100" : "scale-105"
            }`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/20"
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Inner Typography (revealed on hover) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center z-30 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: isExpanded ? "150ms" : "0ms" }}
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
        className={`absolute z-30 transition-opacity duration-200 pointer-events-none ${
          isExpanded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/5">
          <span className="text-white uppercase tracking-widest text-[10px] font-semibold text-center px-2">
            {t("btn_explore")}
          </span>
        </div>
      </div>
    </section>
  );
}
