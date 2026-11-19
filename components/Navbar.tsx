"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { RevealLine } from "@/components/UI";
import { translations, LangKey } from "@/data/translations";

interface NavbarProps {
  onMenuOpen: () => void;
  isMenuOpen?: boolean;
}

export default function Navbar({ onMenuOpen, isMenuOpen = false }: NavbarProps) {
  const { lang, setLang, t } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isLangMenuOpen) {
      setIsLangMenuOpen(false);
      langButtonRef.current?.focus();
    }
  };

  const navLinks = [
    { name: t("nav_about"), id: "about" },
    { name: t("nav_services"), id: "services" },
    { name: t("nav_tech"), id: "technology" },
  ];

  return (
    <nav className="fixed w-full top-0 z-40 bg-white">
      <div className="absolute bottom-0 left-0 w-full">
        <RevealLine />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-bold text-2xl tracking-tighter uppercase flex items-center gap-2 group"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 49.35 50.314"
            aria-hidden="true"
            className="fill-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-180 motion-reduce:transition-none"
          >
            <path d="M24.688,49.315h0A24.907,24.907,0,0,1,20.731,49a24.656,24.656,0,0,1,3.9-49,24.921,24.921,0,0,1,3.957.319,24.656,24.656,0,0,1-3.9,49ZM20.817,32.408l-1.462,3.373H35.9l-1.5-3.373Zm3.266-20.8L12.839,35.781h4.431l7.223-16.407,3.646,8.247H22.9l-1.471,3.373H34.06L25.038,11.606h-.955Z" />
          </svg>
          <span className="hidden sm:block">Antaeus</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l, i) => (
            <a
              key={i}
              href={`#${l.id}`}
              className="text-sm font-semibold tracking-widest uppercase hover:text-[#233C7F] relative group transition-colors duration-200"
            >
              {l.name}
              <span className="absolute -bottom-1 left-0 h-px w-full bg-[#233C7F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" />
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <div className="relative block" ref={langMenuRef} onKeyDown={handleLangKeyDown}>
            <button
              ref={langButtonRef}
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              aria-expanded={isLangMenuOpen}
              aria-haspopup="menu"
              aria-controls="lang-menu"
              className="flex items-center gap-2 text-sm font-semibold cursor-pointer group"
            >
              <Globe
                size={16}
                aria-hidden="true"
                className="transition-colors duration-150 group-hover:text-[#233C7F]"
              />
              <span className="uppercase">{lang}</span>
            </button>

            <div
              id="lang-menu"
              role="menu"
              aria-hidden={!isLangMenuOpen}
              inert={!isLangMenuOpen}
              className={`absolute top-full right-0 mt-6 w-32 bg-white border border-black/10 shadow-2xl overflow-hidden transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none origin-top-right ${
                isLangMenuOpen
                  ? "scale-100 opacity-100 translate-y-0 duration-200"
                  : "scale-95 opacity-0 -translate-y-2 pointer-events-none duration-150"
              }`}
            >
              {(Object.keys(translations) as LangKey[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setLang(l);
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-6 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#233C7F] hover:text-white transition-colors duration-200 ${
                    lang === l ? "bg-black/5 text-[#233C7F]" : "text-black/70"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => {
              setIsLangMenuOpen(false);
              onMenuOpen();
            }}
            aria-label="Open Menu"
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            aria-haspopup="dialog"
            className="flex flex-col gap-1.5 p-2 group"
          >
            <span className="w-8 h-0.5 bg-black block transition-colors duration-200 group-hover:bg-[#233C7F]" />
            <span className="w-6 h-0.5 bg-black block transition-colors duration-200 group-hover:bg-[#233C7F]" />
          </button>
        </div>
      </div>
    </nav>
  );
}
