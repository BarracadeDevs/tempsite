'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function KonamiEgg() {
  const [seq, setSeq] = useState<string[]>([]);
  const [triggered, setTriggered] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleKey = useCallback((e: KeyboardEvent) => {
    setSeq((prev) => {
      const next = [...prev, e.key].slice(-KONAMI.length);
      if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
        setTriggered(true);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!triggered) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTriggered(false);
      setSeq([]);
    }, 5000);
    return () => clearTimeout(t);
  }, [triggered]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="animate-in fade-in zoom-in duration-300 bg-[#0a0a0a] border border-emerald-800/30 rounded-xl px-10 py-8 text-center shadow-2xl shadow-emerald-900/20">
        <div className="text-emerald-500 font-mono text-[14px] mb-2">&#9608; SYSTEM OVERRIDE &#9608;</div>
        <div className="text-[28px] font-medium text-white tracking-tight mb-3">God mode activated</div>
        <div className="text-[12px] text-neutral-600 font-mono">defense.mode = &apos;autonomous&apos; | threats.blocked = all</div>
        <div className="mt-4 text-[10px] text-emerald-900 font-mono">SECRET_CODE: BRCD-K0N4M1-2026</div>
      </div>
    </div>
  );
}
