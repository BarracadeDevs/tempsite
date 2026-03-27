'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ScanResult {
  text: string;
  type: 'command' | 'blank' | 'info' | 'pass' | 'fail' | 'summary';
}

function generateResults(url: string): ScanResult[] {
  // Deterministic-ish results based on URL characters
  const hash = url.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const checks = [
    { name: 'TLS', detail: hash % 3 === 0 ? 'TLS 1.2' : 'TLS 1.3', pass: true },
    { name: 'Strict-Transport-Security', detail: hash % 5 === 0 ? 'missing' : 'present', pass: hash % 5 !== 0 },
    { name: 'Content-Security-Policy', detail: hash % 4 === 0 ? 'missing' : 'present', pass: hash % 4 !== 0 },
    { name: 'X-Frame-Options', detail: hash % 3 === 0 ? 'missing' : 'DENY', pass: hash % 3 !== 0 },
    { name: 'X-Content-Type-Options', detail: 'nosniff', pass: true },
    { name: 'Permissions-Policy', detail: hash % 2 === 0 ? 'missing' : 'present', pass: hash % 2 !== 0 },
    { name: 'Referrer-Policy', detail: hash % 7 === 0 ? 'missing' : 'strict-origin', pass: hash % 7 !== 0 },
  ];

  const failures = checks.filter((c) => !c.pass).length;
  const passes = checks.length - failures;

  const lines: ScanResult[] = [
    { text: `$ barracade scan ${url}`, type: 'command' },
    { text: '', type: 'blank' },
    { text: `  Resolving target...        ${url.replace(/^https?:\/\//, '')}`, type: 'info' },
  ];

  checks.forEach((check) => {
    lines.push({
      text: `  ${check.name.padEnd(28)}${check.detail}`,
      type: check.pass ? 'pass' : 'fail',
    });
  });

  lines.push({ text: '', type: 'blank' });
  lines.push({ text: `  ${failures} issue${failures !== 1 ? 's' : ''} · ${passes} passed`, type: 'summary' });

  return lines;
}

const defaultLines: ScanResult[] = [
  { text: '$ barracade scan https://example.com', type: 'command' },
  { text: '', type: 'blank' },
  { text: '  Resolving target...        example.com', type: 'info' },
  { text: '  TLS                        TLS 1.3', type: 'pass' },
  { text: '  Strict-Transport-Security  present', type: 'pass' },
  { text: '  Content-Security-Policy    present', type: 'pass' },
  { text: '  X-Frame-Options            missing', type: 'fail' },
  { text: '  X-Content-Type-Options     nosniff', type: 'pass' },
  { text: '  Permissions-Policy         missing', type: 'fail' },
  { text: '', type: 'blank' },
  { text: '  2 issues · 5 passed', type: 'summary' },
];

export function LiveScan() {
  const [lines, setLines] = useState<ScanResult[]>(defaultLines);
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-play on first view
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Animate lines appearing
  useEffect(() => {
    if (!hasStarted) return;
    const delays = lines.map((_, i) => 300 + i * 180);
    const timeouts: NodeJS.Timeout[] = [];
    delays.forEach((delay, i) => {
      timeouts.push(setTimeout(() => {
        setVisibleLines(i + 1);
      }, delay));
    });
    // Show input after animation
    timeouts.push(setTimeout(() => {
      setShowInput(true);
    }, 300 + lines.length * 180 + 400));
    return () => timeouts.forEach(clearTimeout);
  }, [hasStarted, lines]);

  const runScan = useCallback(() => {
    if (isScanning || !inputUrl.trim()) return;
    const url = inputUrl.trim().startsWith('http') ? inputUrl.trim() : `https://${inputUrl.trim()}`;
    setIsScanning(true);
    setShowInput(false);

    const newLines = generateResults(url);
    setLines(newLines);
    setVisibleLines(0);
    setHasStarted(false);

    // Re-trigger animation
    setTimeout(() => {
      setHasStarted(true);
      setIsScanning(false);
      setInputUrl('');
    }, 200);
  }, [isScanning, inputUrl]);

  return (
    <div ref={ref} className="rounded-xl border border-white/[0.07] bg-[#0c0c0c] overflow-hidden shadow-2xl shadow-black/40">
      {/* Terminal header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05] bg-[#0f0f0f]">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/[0.08]" />
        </div>
        <span className="flex-1 text-center text-[10px] text-neutral-600 font-mono">barracade — scan</span>
        <div className={`h-2 w-2 rounded-full shrink-0 transition-colors duration-500 ${
          isScanning || (hasStarted && visibleLines < lines.length)
            ? 'bg-emerald-500 animate-pulse'
            : 'bg-emerald-900'
        }`} />
      </div>
      {/* Terminal body */}
      <div className="relative p-5 min-h-[300px]">
        <div className="font-mono text-[12px] leading-[1.9]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={`${line.text}-${i}`} className={getLineClass(line.type)}>
              {line.text || '\u00A0'}
            </div>
          ))}
          {visibleLines < lines.length && hasStarted && (
            <span className="inline-block w-1.5 h-3.5 bg-emerald-700/50 animate-pulse" />
          )}
          {showInput && (
            <div className="mt-3 pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <span className="text-neutral-700">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runScan()}
                  placeholder="enter a URL to scan..."
                  className="flex-1 bg-transparent text-neutral-400 placeholder:text-neutral-800 outline-none text-[12px] font-mono"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function getLineClass(type: string): string {
  switch (type) {
    case 'command': return 'text-neutral-300';
    case 'pass': return 'text-emerald-700';
    case 'fail': return 'text-red-500/70';
    case 'info': return 'text-neutral-600';
    case 'summary': return 'text-neutral-400';
    default: return '';
  }
}
