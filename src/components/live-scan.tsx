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

  // Cipher grid canvas animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    // Cipher fragments tied to the puzzle
    const glyphs = [
      'A3','F7','0x','B9','C4','E1','D6','48','7F','2A',
      '⌬','◇','⬡','△','▽','◈','⊡','⊞','⬢','⊠',
      'α','β','δ','λ','σ','ω','ψ','Σ','Δ','Ω',
    ];

    interface Node { x: number; y: number; vx: number; vy: number; glyph: string; phase: number; size: number }
    const nodes: Node[] = [];
    const nodeCount = 28;

    function initNodes() {
      nodes.length = 0;
      const w = canvas!.width;
      const h = canvas!.height;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
          phase: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 2,
        });
      }
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;
      if (nodes.length === 0) initNodes();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    function draw() {
      time += 0.008;
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      // Draw connections
      const maxDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[j].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw nodes as glyphs
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      for (const n of nodes) {
        const pulse = Math.sin(time * 2 + n.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.14;
        ctx!.font = `${9 + n.size}px "JetBrains Mono", monospace`;
        ctx!.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx!.fillText(n.glyph, n.x, n.y);

        // Tiny dot at center
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(16, 185, 129, ${alpha * 0.6})`;
        ctx!.fill();
      }

      // Scanning sweep line
      const sweepX = ((time * 40) % (w + 60)) - 30;
      const grad = ctx!.createLinearGradient(sweepX - 30, 0, sweepX + 30, 0);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0)');
      grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.03)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx!.fillStyle = grad;
      ctx!.fillRect(sweepX - 30, 0, 60, h);

      animFrame = requestAnimationFrame(draw);
    }

    animFrame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

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
      <div className="relative p-5 min-h-[340px]">
        {/* Cipher network background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        <div className="relative z-10 font-mono text-[12px] leading-[1.9]">
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
