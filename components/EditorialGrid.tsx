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
    img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1000&h=1500",
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
        {panels.map((p, i) => {
          const isActive = activePanel === i;

          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={p.title}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActivePanel(i);
              }}
              onFocus={() => setActivePanel(i)}
              onPointerUp={(e) => {
                if (e.pointerType !== "mouse") setActivePanel(i);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePanel(i);
                }
              }}
              style={{ contain: "paint" }}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-[flex-grow] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isActive ? "flex-[4] md:flex-[5]" : "flex-1"
              }`}
            >
              <Image
                src={p.img}
                alt=""
                fill
                sizes="(max-width: 768px) 25vw, 20vw"
                className="object-cover transition-transform duration-[800ms] ease-out motion-reduce:transition-none"
                style={{ transform: isActive ? "scale(1)" : "scale(1.1)" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black transition-opacity duration-300"
                style={{ opacity: isActive ? 0.2 : 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Expanded content */}
              <div className="absolute bottom-6 left-6 right-6 overflow-hidden">
                <p
                  className={`text-white/80 text-xs md:text-sm tracking-widest uppercase font-semibold mb-2 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: isActive ? "60ms" : "0ms" }}
                >
                  {p.subtitle}
                </p>
                <h3
                  className={`text-white font-bold uppercase tracking-tight text-2xl md:text-4xl origin-bottom-left transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isActive
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-4 scale-95"
                  }`}
                >
                  {p.title}
                </h3>
              </div>

              {/* Collapsed vertical label */}
              <div
                aria-hidden="true"
                className={`flex absolute inset-0 items-center justify-center transition-opacity duration-300 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
                style={{ transitionDelay: isActive ? "0ms" : "100ms" }}
              >
                <span className="text-white font-bold tracking-widest uppercase whitespace-nowrap -rotate-90 text-[10px] md:text-sm">
                  {p.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
