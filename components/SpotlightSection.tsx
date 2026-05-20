"use client";

import { useRef, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";

export default function SpotlightSection() {
  const { t } = useTranslation();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-screen w-full bg-[#111] overflow-hidden flex items-center justify-center cursor-crosshair border-b border-white/10"
    >
      {/* Background text (dim) */}
      <div className="text-center z-10 text-white/10 select-none">
        <h2 className="text-[12vw] font-bold leading-none uppercase tracking-tighter">
          {t("spotlight_1")}
          <br />
          {t("spotlight_2")}
        </h2>
      </div>

      {/* Spotlight reveal layer */}
      <div
        className="absolute inset-0 z-20 bg-[#233C7F] flex items-center justify-center pointer-events-none transition-[clip-path] duration-300 ease-out"
        style={{
          clipPath: isHovered
            ? `circle(250px at ${pos.x}px ${pos.y}px)`
            : `circle(0px at ${pos.x}px ${pos.y}px)`,
        }}
      >
        <div
          className="text-center text-white transition-transform duration-[1500ms] ease-out select-none"
          style={{
            transform: `translate(${
              (pos.x - (containerRef.current?.clientWidth ?? 0) / 2) * -0.05
            }px, ${
              (pos.y - (containerRef.current?.clientHeight ?? 0) / 2) * -0.05
            }px)`,
          }}
        >
          <h2 className="text-[12vw] font-bold leading-none uppercase tracking-tighter">
            {t("spotlight_1")}
            <br />
            {t("spotlight_2")}
          </h2>
          <p className="mt-8 font-serif text-2xl lg:text-3xl italic text-white/80">
            {t("spotlight_sub")}
          </p>
        </div>
      </div>
    </section>
  );
}
