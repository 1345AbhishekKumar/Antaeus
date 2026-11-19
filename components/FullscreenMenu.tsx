"use client";

import { useEffect, useRef } from "react";
import { X, ArrowUpRight, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function FullscreenMenu({
  isOpen,
  onClose,
}: FullscreenMenuProps) {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const root = menuRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  const menuItems = [
    { name: t("nav_about"), id: "about" },
    { name: t("nav_services"), id: "services" },
    { name: t("nav_tech"), id: "technology" },
    { name: "More", id: "more" },
    { name: t("btn_contact"), id: "contact" },
  ];

  return (
    <div
      id="site-menu"
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("nav_menu")}
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`fixed inset-0 z-50 bg-white transition-[clip-path,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        isOpen
          ? "opacity-100 pointer-events-auto clip-path-open duration-[400ms]"
          : "opacity-0 pointer-events-none clip-path-closed duration-[250ms]"
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
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 hover:bg-black/5 rounded-full transition-colors duration-200 group"
          >
            <X
              size={24}
              aria-hidden="true"
              className="group-hover:rotate-90 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
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
                  className={`group flex items-center justify-between text-4xl md:text-6xl font-bold tracking-tight uppercase hover:text-[#233C7F] transition-[transform,opacity,color] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isOpen
                      ? "translate-y-0 opacity-100 duration-[400ms]"
                      : "translate-y-[100%] opacity-0 duration-[250ms]"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${150 + i * 60}ms` : "0ms",
                  }}
                >
                  <span className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 motion-reduce:transition-none">
                    {item.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-200 translate-y-1 group-hover:translate-y-0"
                    size={32}
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Sidebar Info */}
          <div
            className={`flex flex-col justify-between w-full md:w-1/2 gap-12 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
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
                      <span className="text-black/40 font-mono group-hover:text-[#233C7F] transition-colors duration-150">
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
                <label htmlFor="nl-email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-b border-black/20 pb-2 focus:border-[#233C7F] transition-colors duration-150 rounded-none w-full text-lg"
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
                    aria-hidden="true"
                    className="group-hover/btn:translate-x-2 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
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
