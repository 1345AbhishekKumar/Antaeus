"use client";

import React, { useCallback, useEffect, useRef, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

// ─── Magnetic Button ─────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  theme?: "light" | "dark";
  tabIndex?: number;
}

export function MagneticButton({
  children,
  href = "#",
  theme = "light",
  tabIndex,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const isDark = theme === "dark";

  const canTrack = useCallback(
    () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const apply = useCallback(() => {
    frameRef.current = null;
    const el = buttonRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;
    const x = (pointerRef.current.x - rect.left - rect.width / 2) * 0.25;
    const y = (pointerRef.current.y - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!buttonRef.current || !canTrack()) return;
    rectRef.current = buttonRef.current.getBoundingClientRect();
    buttonRef.current.style.transition = "none";
    pointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !rectRef.current) return;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(apply);
    }
  };

  const reset = useCallback(() => {
    rectRef.current = null;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const el = buttonRef.current;
    if (el) {
      el.style.transition = "";
      el.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onBlur={reset}
      className={`magnetic-button group relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border overflow-hidden transition-colors duration-200 focus-visible:outline-offset-4 ${
        isDark
          ? "border-white/20 hover:border-white"
          : "border-black/20 hover:border-black"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full scale-[0.85] opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 group-active:scale-100 group-active:opacity-100 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDark ? "bg-white" : "bg-black"
        }`}
      />
      <span
        className={`relative z-10 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200 text-center px-6 leading-relaxed ${
          isDark
            ? "text-white group-hover:text-black group-focus-visible:text-black"
            : "text-black group-hover:text-white group-focus-visible:text-white"
        }`}
      >
        {children}
      </span>
    </a>
  );
}

// ─── Reveal Line ─────────────────────────────────────────────────────────────

export function RevealLine() {
  const [setRef, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <div
      ref={setRef}
      className="w-full h-[1px] bg-black/10 origin-left overflow-hidden"
    >
      <div
        className={`w-full h-full bg-black/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          inView ? "scale-x-100" : "scale-x-0"
        } origin-left`}
      />
    </div>
  );
}

// ─── Reveal Text ─────────────────────────────────────────────────────────────

type ValidTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  as?: ValidTag;
  className?: string;
}

export function RevealText({
  children,
  delay = 0,
  as: Component = "span",
  className = "",
}: RevealTextProps) {
  const [setRef, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <span
      ref={setRef}
      className="overflow-hidden inline-block align-bottom w-full"
    >
      <Component
        className={`block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:transition-none ${
          inView ? "translate-y-0" : "translate-y-[110%]"
        } ${className}`}
        style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      >
        {children}
      </Component>
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export function SectionHeader({
  index,
  title,
  subtitle,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between w-full pb-12 mb-12 relative">
      <div className="absolute bottom-0 left-0 w-full">
        <RevealLine />
      </div>
      <div className="w-full md:w-2/3 pr-0 md:pr-12">
        <div className="flex items-baseline gap-4 mb-4">
          <RevealText
            delay={0}
            as="span"
            className="text-sm font-medium text-black/40 block md:hidden"
          >
            {index}
          </RevealText>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-tight">
            <RevealText delay={60}>{title}</RevealText>
          </h2>
        </div>
        {subtitle && (
          <h3 className="text-sm md:text-base font-semibold tracking-widest uppercase text-black/60 mb-6">
            <RevealText delay={120}>{subtitle}</RevealText>
          </h3>
        )}
        {description && (
          <p className="text-lg md:text-2xl text-black/80 max-w-2xl leading-relaxed font-serif">
            <RevealText delay={180}>{description}</RevealText>
          </p>
        )}
      </div>
      <div className="hidden md:block w-1/3 text-right">
        <RevealText
          as="span"
          delay={60}
          className="text-sm font-medium text-black/40 inline-block"
        >
          {index}
        </RevealText>
      </div>
    </div>
  );
}
