"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";
import { MagneticButton } from "@/components/UI";

const fleetData = [
  {
    id: "01",
    title: "Aviation",
    subtitle: "Private & Commercial",
    desc: "Bespoke aerial transit and private charter solutions tailored for absolute discretion, security, and global speed.",
    img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=2000&h=1000",
    stats: ["24/7 Dispatch", "Global Airspace", "Premium Fleet"],
  },
  {
    id: "02",
    title: "Maritime",
    subtitle: "Yachting & Cruises",
    desc: "Elite nautical vessels engineered for supreme luxury cruising and comprehensive remote offshore marine operations.",
    img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2000&h=1000",
    stats: ["Deep Sea Access", "Luxury Interiors", "Expert Crew"],
  },
  {
    id: "03",
    title: "Overland",
    subtitle: "Chauffeur & Rail",
    desc: "Ground transportation entirely redefined through uncompromising safety protocols and unparalleled passenger comfort.",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000&h=1000",
    stats: ["Armored Options", "Zero-Emission", "Seamless Transfers"],
  },
];

export default function ExperimentalFleet() {
  const { t } = useTranslation();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative w-full h-[100vh] bg-[#0a0a0a] flex flex-col overflow-hidden border-t border-white/10 mt-20">
      {/* Static Absolute Header */}
      <div className="absolute top-8 left-6 md:left-12 z-40 pointer-events-none mix-blend-difference">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-2">
          {t("fleet_title")}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white">
          {t("fleet_sub")}
        </h3>
      </div>

      {fleetData.map((item, i) => {
        const isHovered = hoveredIdx === i;
        const isDimmed = hoveredIdx !== null && hoveredIdx !== i;

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative flex items-center justify-center border-b border-white/10 overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group ${
              isHovered
                ? "flex-[4] md:flex-[5]"
                : hoveredIdx === null
                ? "flex-1"
                : "flex-[0.5]"
            }`}
          >
            {/* Background Image */}
            <div
              className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-110 opacity-40 blur-[4px]"
              } ${isDimmed ? "opacity-10 blur-[10px] scale-125" : ""}`}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-1000 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-1000 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Center Kinetic Title (visible when NOT hovered) */}
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ease-out z-10 ${
                isHovered
                  ? "opacity-0 scale-150 blur-2xl translate-y-10"
                  : "opacity-100 scale-100 blur-0 translate-y-0"
              } ${isDimmed ? "opacity-0" : ""}`}
            >
              <h2 className="text-[8vw] font-bold text-white uppercase tracking-tighter mix-blend-overlay">
                {item.title}
              </h2>
            </div>

            {/* Expanded Interior Content (revealed on hover) */}
            <div
              className={`absolute inset-0 p-6 md:p-12 flex flex-col justify-between pointer-events-none transition-all duration-1000 z-20 ${
                isHovered
                  ? "opacity-100 translate-y-0 delay-100"
                  : "opacity-0 translate-y-16 delay-0"
              }`}
            >
              {/* Top Right ID */}
              <div className="self-end overflow-hidden">
                <span
                  className={`block font-mono text-white/50 text-xl transition-transform duration-700 ${
                    isHovered ? "translate-y-0 delay-300" : "-translate-y-full delay-0"
                  }`}
                >
                  {item.id}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 w-full">
                {/* Left: Title & Desc */}
                <div className="max-w-xl">
                  <div className="overflow-hidden mb-2">
                    <h3
                      className={`text-4xl md:text-6xl font-bold uppercase text-white tracking-tight transition-transform duration-700 ${
                        isHovered
                          ? "translate-y-0 delay-200"
                          : "translate-y-[120%] delay-0"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="overflow-hidden mb-6">
                    <p
                      className={`text-xl md:text-2xl font-serif italic text-white/80 transition-transform duration-700 ${
                        isHovered
                          ? "translate-y-0 delay-300"
                          : "translate-y-[120%] delay-0"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <p
                    className={`text-white/60 text-sm md:text-base leading-relaxed transition-all duration-700 ${
                      isHovered
                        ? "opacity-100 translate-y-0 delay-400"
                        : "opacity-0 translate-y-4 delay-0"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Right: Stats & CTA */}
                <div className="flex flex-col items-end gap-6 w-full md:w-auto">
                  <ul className="flex flex-col items-end gap-2">
                    {item.stats.map((stat, idx) => (
                      <li key={idx} className="overflow-hidden">
                        <span
                          className={`block text-xs md:text-sm font-semibold uppercase tracking-widest text-white transition-transform duration-700 ${
                            isHovered ? "translate-y-0" : "translate-y-full"
                          }`}
                          style={{
                            transitionDelay: isHovered
                              ? `${400 + idx * 100}ms`
                              : "0ms",
                          }}
                        >
                          {stat}{" "}
                          <span className="text-[#233C7F] ml-2">/</span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`transition-all duration-1000 pointer-events-auto ${
                      isHovered
                        ? "opacity-100 scale-100 delay-700"
                        : "opacity-0 scale-50 delay-0"
                    }`}
                  >
                    <MagneticButton theme="dark" href="#explore">
                      {t("btn_explore")}
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
