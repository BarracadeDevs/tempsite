'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/cn';

interface CipherTextProps {
  encrypted: string;
  decrypted: string;
  className?: string;
  hint?: string;
}

function scramble(text: string, progress: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  return text
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (i / text.length < progress) return text[i];
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join('');
}

export function CipherText({ encrypted, decrypted, className, hint }: CipherTextProps) {
  const [state, setState] = useState<'locked' | 'decrypting' | 'solved'>('locked');
  const [display, setDisplay] = useState(encrypted);

  const decrypt = useCallback(() => {
    if (state !== 'locked') return;
    setState('decrypting');

    const steps = 12;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setDisplay(scramble(decrypted, progress));

      if (step >= steps) {
        clearInterval(interval);
        setDisplay(decrypted);
        setState('solved');
      }
    }, 50);
  }, [state, decrypted]);

  return (
    <button
      onClick={decrypt}
      className={cn(
        'font-mono text-[9px] tracking-wider transition-all duration-700 select-none',
        state === 'locked' && 'text-neutral-800/40 hover:text-neutral-700/60 cursor-pointer',
        state === 'decrypting' && 'text-neutral-600/50 cursor-wait',
        state === 'solved' && 'text-neutral-700/30 cursor-default',
        className,
      )}
      title={state === 'locked' ? (hint || '') : undefined}
    >
      <span className={cn(
        state === 'decrypting' && 'animate-pulse',
      )}>
        {display}
      </span>
    </button>
  );
}
