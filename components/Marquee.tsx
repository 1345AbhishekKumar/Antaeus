"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

export default function Marquee() {
  const { t } = useTranslation();
  const [setRef, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const labels = [
    t("btn_marine"),
    t("btn_corp"),
    t("btn_leisure"),
    t("nav_tech"),
  ];

  return (
    <div
      ref={setRef}
      className="w-full overflow-hidden bg-[#233C7F] text-white py-4 md:py-6 flex border-y border-white/10"
    >
      <span className="sr-only">{labels.join(", ")}</span>
      <div
        aria-hidden="true"
        className="animate-marquee whitespace-nowrap flex items-center gap-8 motion-reduce:animate-none"
        style={{
          animationPlayState: inView ? "running" : "paused",
          contain: "paint",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {labels.map((label) => (
              <React.Fragment key={label}>
                <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                  {label}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
