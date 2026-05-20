"use client";

import { useAnimatedNumber } from "@/hooks/useInView";

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedNumber({ end, suffix = "", duration = 2000 }: Props) {
  const { setRef, count } = useAnimatedNumber({ end, duration });
  return (
    <span ref={setRef}>
      {count}
      {suffix}
    </span>
  );
}
