"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

const panels = [
  {
    title: "The Journey",
    subtitle: "Crafting experiences",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000&h=1500",
  },
  {
    title: "The Mindset",
    subtitle: "Corporate focus",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000&h=1500",
  },
  {
    title: "The Culture",
    subtitle: "Local immersion",
    img: "https://images.unsplash.com/photo-1533604128543-fa888195a6db?auto=format&fit=crop&q=80&w=1000&h=1500",
  },
  {
    title: "The Future",
    subtitle: "Sustainable transit",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000&h=1500",
  },
];

export default function EditorialGrid() {
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = useState(0);

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <div className="mb-12 flex justify-between items-end">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">
          {t("editorial_title1")}
          <br />
          {t("editorial_title2")}
        </h2>
        <p className="text-sm font-semibold tracking-widest uppercase text-black/40">
          Our Vision
        </p>
      </div>

      <div className="flex w-full h-[60vh] md:h-[75vh] gap-2 md:gap-4 overflow-hidden">
        {panels.map((p, i) => (
          <div
            key={i}
            onMouseEnter={() => setActivePanel(i)}
            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
              activePanel === i ? "flex-[4] md:flex-[5]" : "flex-[1]"
            }`}
          >
            <Image
              src={p.img}
              alt={p.title}
              fill
              sizes="(max-width: 768px) 25vw, 20vw"
              className="object-cover transition-transform duration-[1500ms] ease-out"
              style={{ transform: activePanel === i ? "scale(1)" : "scale(1.15)" }}
            />
            <div
              className={`absolute inset-0 transition-colors duration-700 ${
                activePanel === i ? "bg-black/20" : "bg-black/60"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

            {/* Expanded content */}
            <div className="absolute bottom-6 left-6 right-6 overflow-hidden">
              <p
                className={`text-white/80 text-xs md:text-sm tracking-widest uppercase font-semibold mb-2 transition-all duration-700 delay-100 ${
                  activePanel === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {p.subtitle}
              </p>
              <h3
                className={`text-white font-bold uppercase tracking-tight transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  activePanel === i
                    ? "text-3xl md:text-5xl opacity-100 rotate-0 translate-y-0"
                    : "text-xl opacity-0 rotate-12 translate-y-12"
                }`}
              >
                {p.title}
              </h3>
            </div>

            {/* Collapsed vertical label */}
            <div
              className={`hidden md:flex absolute inset-0 items-center justify-center transition-opacity duration-700 ${
                activePanel === i ? "opacity-0" : "opacity-100 delay-300"
              }`}
            >
              <span className="text-white font-bold tracking-widest uppercase whitespace-nowrap -rotate-90 text-sm">
                {p.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
