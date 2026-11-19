"use client";

import { useCallback, useEffect, useRef } from "react";

const RADIUS = 320;
const MAX_LIFT = 8;
const MAX_SCALE = 0.04;
const BASE_COLOR = { r: 17, g: 17, b: 17 };
const HOVER_COLOR = { r: 35, g: 60, b: 127 };

function mixChannel(from: number, to: number, amount: number) {
  return Math.round(from + (to - from) * amount);
}

interface KineticLineProps {
  text: string;
  delay?: number;
  direction?: "left" | "right";
}

export default function KineticLine({
  text,
  delay = 0,
  direction = "left",
}: KineticLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  const measure = useCallback(() => {
    centersRef.current = charsRef.current.map((el) => {
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
  }, []);

  const reset = useCallback(() => {
    pointerRef.current = null;
    for (const el of charsRef.current) {
      el.style.transform = "";
      el.style.color = "";
    }
  }, []);

  const render = useCallback(() => {
    frameRef.current = null;
    const pointer = pointerRef.current;
    const chars = charsRef.current;
    const centers = centersRef.current;
    if (!pointer) return;

    for (let i = 0; i < chars.length; i++) {
      const center = centers[i];
      const el = chars[i];
      if (!center || !el) continue;

      const distance = Math.hypot(pointer.x - center.x, pointer.y - center.y);
      const emphasis = Math.max(0, 1 - distance / RADIUS);
      const lift = emphasis * MAX_LIFT;
      const scale = 1 + emphasis * MAX_SCALE;

      el.style.transform = `translate3d(0, ${-lift}px, 0) scale(${scale})`;
      el.style.color =
        emphasis > 0.01
          ? `rgb(${mixChannel(BASE_COLOR.r, HOVER_COLOR.r, emphasis)}, ${mixChannel(BASE_COLOR.g, HOVER_COLOR.g, emphasis)}, ${mixChannel(BASE_COLOR.b, HOVER_COLOR.b, emphasis)})`
          : "";
    }
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hoverable = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!hoverable || reduce) return;

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(line);
    document.fonts?.ready.then(measure).catch(() => {});

    const handleMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", reset);
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      reset();
    };
  }, [measure, render, reset]);

  const animationName =
    direction === "left" ? "slideInRight" : "slideInLeft";

  return (
    <div className="overflow-hidden py-2">
      <div
        ref={lineRef}
        className="flex whitespace-nowrap"
        style={{
          animation: `${animationName} 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
        }}
      >
        <span className="sr-only">{text}</span>
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) charsRef.current[i] = el;
            }}
            aria-hidden="true"
            className="inline-block"
            style={{
              transition:
                "transform 140ms cubic-bezier(0.23, 1, 0.32, 1), color 140ms ease-out",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}
