'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  end: number;
  suffix: string;
  label: string;
  duration: number;
}

const stats: Stat[] = [
  { end: 15, suffix: '+', label: 'Years in Trade',      duration: 1200 },
  { end: 500, suffix: '+', label: 'Hospitals Served',   duration: 1800 },
  { end: 6,   suffix: '+', label: 'Cities Covered',     duration: 900  },
  { end: 24,  suffix: '/7', label: 'Technical Support', duration: 1000 },
];

function useCountUp(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    const startValue = 0;

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + eased * (end - startValue)));
      if (progress < 1) requestAnimationFrame(step);
    }

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [active, end, duration]);

  return count;
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.end, stat.duration, active);

  return (
    <div className="flex flex-col gap-1.5 pl-3.5 border-l-2 border-accent-500/30">
      <span className="font-serif text-3xl md:text-4xl font-bold leading-none tracking-tight text-primary-500">
        {active ? `${count}${stat.suffix}` : `0${stat.suffix}`}
      </span>
      <span className="text-[13px] font-medium text-[#5b7285]">{stat.label}</span>
    </div>
  );
}

export default function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} active={active} />
      ))}
    </div>
  );
}
