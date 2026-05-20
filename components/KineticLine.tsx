"use client";

import { useRef, useState, useEffect } from "react";

interface MousePos {
  x: number;
  y: number;
}

function KineticChar({ char, mousePos }: { char: string; mousePos: MousePos }) {
  const charRef = useRef<HTMLSpanElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    if (!charRef.current) return;
    const rect = charRef.current.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;
    const d = Math.sqrt(
      Math.pow(mousePos.x - charX, 2) + Math.pow(mousePos.y - charY, 2)
    );
    setDist(Math.max(0, 1 - d / 400));
  }, [mousePos]);

  return (
    <span
      ref={charRef}
      className="inline-block transition-all duration-300 ease-out"
      style={{
        fontWeight: 700 + dist * 200,
        letterSpacing: `${dist * -0.05}em`,
        transform: `translateY(${dist * -10}px)`,
        color: dist > 0.5 ? "#233C7F" : "inherit",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
}

interface KineticLineProps {
  text: string;
  delay: number;
  direction?: "left" | "right";
}

export default function KineticLine({ text, delay, direction = "left" }: KineticLineProps) {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="overflow-hidden py-1">
      <div
        className={`flex whitespace-nowrap transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          direction === "left"
            ? "-translate-x-full animate-[slideInRight_1.2s_ease-out_forwards]"
            : "translate-x-full animate-[slideInLeft_1.2s_ease-out_forwards]"
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {text.split("").map((char, i) => (
          <KineticChar key={i} char={char} mousePos={mousePos} />
        ))}
      </div>
    </div>
  );
}
