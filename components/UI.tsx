"use client";

import React, { useState, useRef, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

// ─── Magnetic Button ─────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  theme?: "light" | "dark";
}

export function MagneticButton({ children, href = "#", theme = "light" }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isDark = theme === "dark";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.4;
    const y = (e.clientY - top - height / 2) * 0.4;
    setPosition({ x, y });
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className={`group relative inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border overflow-hidden ${
        isHovered ? "transition-none" : "transition-transform duration-700 ease-out"
      } ${
        isDark
          ? "border-white/20 hover:border-white"
          : "border-black/20 hover:border-black"
      }`}
    >
      <div
        className={`absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-center ${
          isDark ? "bg-white" : "bg-black"
        }`}
      />
      <span
        className={`relative z-10 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500 text-center px-6 leading-relaxed ${
          isDark
            ? "text-white group-hover:text-black"
            : "text-black group-hover:text-white"
        }`}
      >
        {children}
      </span>
    </a>
  );
}

// ─── Reveal Line ─────────────────────────────────────────────────────────────

export function RevealLine() {
  const [setRef, inView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={setRef}
      className="w-full h-[1px] bg-black/10 origin-left overflow-hidden"
    >
      <div
        className={`w-full h-full bg-black/40 transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
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
  const [setRef, inView] = useInView({ threshold: 0.2 });
  return (
    <span
      ref={setRef}
      className="overflow-hidden inline-block align-bottom w-full"
    >
      <Component
        className={`block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? "translate-y-0" : "translate-y-[110%]"
        } ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
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

export function SectionHeader({ index, title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between w-full pb-12 mb-12 relative">
      <div className="absolute bottom-0 left-0 w-full">
        <RevealLine />
      </div>
      <div className="w-full md:w-2/3 pr-0 md:pr-12">
        <div className="flex items-baseline gap-4 mb-4">
          <RevealText delay={0} as="span" className="text-sm font-medium text-black/40 block md:hidden">
            {index}
          </RevealText>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase leading-tight">
            <RevealText delay={100}>{title}</RevealText>
          </h2>
        </div>
        {subtitle && (
          <h3 className="text-sm md:text-base font-semibold tracking-widest uppercase text-black/60 mb-6">
            <RevealText delay={200}>{subtitle}</RevealText>
          </h3>
        )}
        {description && (
          <p className="text-lg md:text-2xl text-black/80 max-w-2xl leading-relaxed font-serif">
            <RevealText delay={300}>{description}</RevealText>
          </p>
        )}
      </div>
      <div className="hidden md:block w-1/3 text-right">
        <RevealText as="span" delay={100} className="text-sm font-medium text-black/40 inline-block">
          {index}
        </RevealText>
      </div>
    </div>
  );
}
