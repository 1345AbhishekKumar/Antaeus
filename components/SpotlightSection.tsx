"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";

const WINDOW_SIZE = 520;

export default function SpotlightSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const clientRef = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const render = useCallback(() => {
    frameRef.current = null;
    const win = windowRef.current;
    const content = contentRef.current;
    const container = containerRef.current;
    if (!win || !content || !container) return;

    const rect = container.getBoundingClientRect();
    const x = clientRef.current.x - rect.left;
    const y = clientRef.current.y - rect.top;
    const half = WINDOW_SIZE / 2;

    win.style.transform = `translate3d(${x - half}px, ${y - half}px, 0)`;
    content.style.width = `${rect.width}px`;
    content.style.height = `${rect.height}px`;
    content.style.transform = `translate3d(${half - x}px, ${half - y}px, 0)`;

    if (innerRef.current) {
      const px = (x - rect.width / 2) * -0.03;
      const py = (y - rect.height / 2) * -0.03;
      innerRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    }
  }, []);

  const schedule = useCallback(() => {
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(render);
    }
  }, [render]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clientRef.current = { x: e.clientX, y: e.clientY };
    setIsActive(true);
    schedule();
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setIsActive(false);
  };

  const revealAtCenter = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    clientRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setIsActive(true);
    schedule();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    const container = containerRef.current;
    if (!container) return;
    clientRef.current = { x: e.clientX, y: e.clientY };
    setIsActive(true);
    schedule();
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      aria-label={`${t("spotlight_1")} ${t("spotlight_2")}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onFocus={(e) => {
        if (
          e.target === e.currentTarget &&
          e.currentTarget.matches(":focus-visible")
        ) {
          revealAtCenter();
        }
      }}
      onBlur={() => setIsActive(false)}
      className="relative h-screen w-full bg-[#111] overflow-hidden flex items-center justify-center cursor-crosshair border-b border-white/10"
    >
      {/* Background text (dim) */}
      <div
        aria-hidden="true"
        className="text-center z-10 text-white/10 select-none"
      >
        <h2 className="text-[12vw] font-bold leading-none uppercase tracking-tighter">
          {t("spotlight_1")}
          <br />
          {t("spotlight_2")}
        </h2>
      </div>

      {/* Spotlight window */}
      <div
        ref={windowRef}
        className={`pointer-events-none absolute left-0 top-0 z-20 h-[520px] w-[520px] overflow-hidden rounded-full bg-[#233C7F] transition-opacity duration-200 ease-out will-change-transform ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={contentRef}
          className="absolute left-0 top-0 flex items-center justify-center will-change-transform"
        >
          <div
            ref={innerRef}
            className="text-center text-white select-none"
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
      </div>
    </section>
  );
}
