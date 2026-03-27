'use client';

import { useEffect, useState, useRef } from 'react';

interface ThreatTickerProps {
  className?: string;
}

export function ThreatTicker({ className }: ThreatTickerProps) {
  const [count, setCount] = useState(0);
  const target = 2847163;
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [started]);

  // After reaching target, slowly increment
  useEffect(() => {
    if (count < target) return;
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div ref={ref} className={className}>
      <div className="font-mono text-[32px] font-medium text-white tracking-tight tabular-nums">
        {count.toLocaleString()}
      </div>
      <div className="text-[12px] text-neutral-600 mt-1">threats blocked to date</div>
    </div>
  );
}
