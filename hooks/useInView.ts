"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface InViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView(
  options: InViewOptions = {}
): [(node: Element | null) => void, boolean] {
  const { threshold = 0.1, triggerOnce = true } = options;
  const [ref, setRef] = useState<Element | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.unobserve(ref);
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, triggerOnce]);

  return [setRef, inView];
}

interface AnimatedNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function useAnimatedNumber({
  end,
  duration = 1400,
}: Pick<AnimatedNumberProps, "end" | "duration">) {
  const [setRef, inView] = useInView({ threshold: 0.5 });
  const nodeRef = useRef<HTMLElement | null>(null);

  const setNode = useCallback(
    (node: HTMLElement | null) => {
      nodeRef.current = node;
      setRef(node);
    },
    [setRef]
  );

  useEffect(() => {
    const node = nodeRef.current;
    if (!inView || !node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.textContent = String(end);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      node.textContent =
        progress === 1 ? String(end) : String(Math.floor(eased * end));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return setNode;
}
