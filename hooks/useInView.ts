"use client";

import { useState, useEffect } from "react";

interface InViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView(
  options: InViewOptions = { threshold: 0.1, triggerOnce: true }
): [(node: Element | null) => void, boolean] {
  const [ref, setRef] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.triggerOnce) observer.unobserve(ref);
        } else if (!options.triggerOnce) {
          setInView(false);
        }
      },
      { threshold: options.threshold }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options.threshold, options.triggerOnce]);

  return [setRef, inView];
}

interface AnimatedNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function useAnimatedNumber({ end, duration = 2000 }: Pick<AnimatedNumberProps, "end" | "duration">) {
  const [setRef, inView] = useInView({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration ?? 2000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [inView, end, duration]);

  return { setRef, count };
}
