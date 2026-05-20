"use client";

import React from "react";
import { useTranslation } from "@/context/LanguageContext";

export default function Marquee() {
  const { t } = useTranslation();

  return (
    <div className="w-full overflow-hidden bg-[#233C7F] text-white py-4 md:py-6 flex border-y border-white/10">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
              {t("btn_marine")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
              {t("btn_corp")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
              {t("btn_leisure")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
              {t("nav_tech")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
