"use client";

import { useAnimatedNumber } from "@/hooks/useInView";

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedNumber({
  end,
  suffix = "",
  duration = 1400,
}: Props) {
  const setRef = useAnimatedNumber({ end, duration });

  return (
    <span className="tabular-nums">
      <span aria-hidden="true">
        <span ref={setRef}>0</span>
        {suffix}
      </span>
      <span className="sr-only">
        {end}
        {suffix}
      </span>
    </span>
  );
}
