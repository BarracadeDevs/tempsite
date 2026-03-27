'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01';

export function GlitchText({ children, className, as: Tag = 'span' }: GlitchTextProps) {
  const [display, setDisplay] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);

    let iterations = 0;
    intervalRef.current = setInterval(() => {
      setDisplay(
        children
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iterations) return children[i];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );
      iterations += 1;
      if (iterations > children.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(children);
        setIsGlitching(false);
      }
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Tag
      onMouseEnter={startGlitch}
      className={cn('cursor-default', className)}
    >
      {display}
    </Tag>
  );
}
