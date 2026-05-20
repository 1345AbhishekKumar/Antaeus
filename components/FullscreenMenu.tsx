"use client";

import { X, ArrowUpRight, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const { t } = useTranslation();

  const menuItems = [
    { name: t("nav_about"), id: "about" },
    { name: t("nav_services"), id: "services" },
    { name: t("nav_tech"), id: "technology" },
    { name: "More", id: "more" },
    { name: t("btn_contact"), id: "contact" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isOpen
          ? "opacity-100 pointer-events-auto clip-path-open"
          : "opacity-0 pointer-events-none clip-path-closed"
      }`}
    >
      <div className="h-full flex flex-col justify-between p-6 md:p-12">
        {/* Header */}
        <div className="flex justify-between items-center pb-6 relative">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10" />
          <span className="text-sm font-semibold tracking-widest uppercase">
            {t("nav_menu")}
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors group"
          >
            <X
              size={24}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row flex-grow pt-12 gap-12 md:gap-24 overflow-y-auto">
          {/* Nav Links */}
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-1/2">
            {menuItems.map((item, i) => (
              <div key={i} className="overflow-hidden">
                <a
                  href={`#${item.id}`}
                  onClick={onClose}
                  className={`block text-4xl md:text-6xl font-bold tracking-tight uppercase hover:text-[#233C7F] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between group ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[100%] opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${isOpen ? 300 + i * 100 : 0}ms`,
                  }}
                >
                  <span className="group-hover:translate-x-4 transition-transform duration-500">
                    {item.name}
                  </span>
                  <ArrowUpRight
                    className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0"
                    size={32}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Sidebar Info */}
          <div
            className={`flex flex-col justify-between w-full md:w-1/2 gap-12 transition-all duration-1000 ease-out delay-700 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Offices */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-6">
                Offices
              </h4>
              <ul className="space-y-4 text-lg">
                {["GR Athens", "CH Basel", "CY Limassol", "PH Manila", "US Miami"].map(
                  (o) => (
                    <li
                      key={o}
                      className="flex gap-4 group cursor-default uppercase"
                    >
                      <span className="text-black/40 font-mono group-hover:text-[#233C7F] transition-colors">
                        {o.split(" ")[0]}
                      </span>
                      {o.split(" ")[1]}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <h4 className="text-sm font-semibold tracking-widest uppercase mb-4">
                Stay Informed
              </h4>
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-b border-black/20 pb-2 focus:outline-none focus:border-[#233C7F] transition-colors rounded-none w-full text-lg"
                />
                <label className="flex items-center gap-3 text-sm cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#233C7F]"
                  />
                  I agree to the privacy policy
                </label>
                <button
                  type="button"
                  className="self-start mt-4 text-sm font-semibold tracking-widest uppercase flex items-center gap-2 group/btn"
                >
                  Subscribe{" "}
                  <ArrowRight
                    className="group-hover/btn:translate-x-2 transition-transform duration-300"
                    size={16}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
