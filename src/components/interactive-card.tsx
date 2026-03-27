'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';

interface InteractiveCardProps {
  icon: LucideIcon;
  label: string;
  desc: string;
  children?: React.ReactNode;
  className?: string;
}

export function InteractiveCard({ icon: Icon, label, desc, children, className }: InteractiveCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative rounded-lg border border-white/[0.04] bg-[#080808] p-6 overflow-hidden transition-all duration-500',
        'hover:border-emerald-900/30',
        className,
      )}
    >
      {/* Spotlight follow effect */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 100,
            top: mousePos.y - 100,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          }}
        />
      )}
      <div className="relative z-10">
        <Icon className={cn(
          'h-5 w-5 mb-4 transition-colors duration-500',
          isHovered ? 'text-emerald-500' : 'text-emerald-600',
        )} />
        <h3 className="text-[14px] font-medium text-neutral-200 mb-2">{label}</h3>
        <p className="text-[13px] text-neutral-600 leading-relaxed">{desc}</p>
        {children}
      </div>
    </div>
  );
}
