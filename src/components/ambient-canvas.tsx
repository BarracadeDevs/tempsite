'use client';

import { useEffect, useRef } from 'react';

type Variant =
  | 'constellation'   // drifting dots with connecting lines
  | 'hexgrid'         // pulsing hexagonal grid
  | 'waveform'        // oscillating signal waves
  | 'particles'       // rising particle field
  | 'circuits'        // circuit board trace paths
  | 'radar'           // rotating radar sweep
  | 'binary'          // falling binary streams
  | 'topology';       // network topology map

interface AmbientCanvasProps {
  variant: Variant;
  className?: string;
  opacity?: number;
}

export function AmbientCanvas({ variant, className = '', opacity = 1 }: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const emerald = { r: 16, g: 185, b: 129 };

    function rgba(a: number) {
      return `rgba(${emerald.r}, ${emerald.g}, ${emerald.b}, ${a})`;
    }

    // ----- CONSTELLATION -----
    interface Star { x: number; y: number; vx: number; vy: number; phase: number }
    const stars: Star[] = [];

    function initConstellation() {
      const w = canvas!.width, h = canvas!.height;
      for (let i = 0; i < 35; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawConstellation() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0 || s.x > w) s.vx *= -1;
        if (s.y < 0 || s.y > h) s.vy *= -1;
      }
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx!.beginPath();
            ctx!.moveTo(stars[i].x, stars[i].y);
            ctx!.lineTo(stars[j].x, stars[j].y);
            ctx!.strokeStyle = rgba((1 - dist / 140) * 0.22);
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }
      for (const s of stars) {
        const pulse = Math.sin(time * 2 + s.phase) * 0.5 + 0.5;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, 1.5 + pulse, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(0.14 + pulse * 0.25);
        ctx!.fill();
      }
    }

    // ----- HEX GRID -----
    function drawHexgrid() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      const size = 30;
      const h3 = size * Math.sqrt(3);
      for (let row = -1; row < h / h3 + 1; row++) {
        for (let col = -1; col < w / (size * 1.5) + 1; col++) {
          const cx = col * size * 1.5;
          const cy = row * h3 + (col % 2) * (h3 / 2);
          const dist = Math.sqrt((cx - w / 2) ** 2 + (cy - h / 2) ** 2);
          const wave = Math.sin(time * 1.5 - dist * 0.015) * 0.5 + 0.5;
          ctx!.beginPath();
          for (let k = 0; k < 6; k++) {
            const angle = (Math.PI / 3) * k - Math.PI / 6;
            const px = cx + size * 0.4 * Math.cos(angle);
            const py = cy + size * 0.4 * Math.sin(angle);
            k === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py);
          }
          ctx!.closePath();
          ctx!.strokeStyle = rgba(0.07 + wave * 0.15);
          ctx!.lineWidth = 0.6;
          ctx!.stroke();
        }
      }
    }

    // ----- WAVEFORM -----
    function drawWaveform() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      const waves = [
        { freq: 0.008, amp: 0.15, speed: 1.2, alpha: 0.17 },
        { freq: 0.012, amp: 0.1, speed: 0.8, alpha: 0.12 },
        { freq: 0.02, amp: 0.06, speed: 1.6, alpha: 0.09 },
      ];
      for (const wave of waves) {
        ctx!.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = h / 2 + Math.sin(x * wave.freq + time * wave.speed) * h * wave.amp
            + Math.sin(x * wave.freq * 2.3 + time * wave.speed * 0.7) * h * wave.amp * 0.3;
          x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = rgba(wave.alpha);
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    // ----- PARTICLES -----
    interface Particle { x: number; y: number; speed: number; size: number; phase: number }
    const particles: Particle[] = [];

    function initParticles() {
      const w = canvas!.width, h = canvas!.height;
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          speed: 0.2 + Math.random() * 0.5,
          size: 0.5 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function drawParticles() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += Math.sin(time + p.phase) * 0.3;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        const pulse = Math.sin(time * 1.5 + p.phase) * 0.5 + 0.5;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(0.13 + pulse * 0.2);
        ctx!.fill();
      }
    }

    // ----- CIRCUITS -----
    interface Trace { segments: { x1: number; y1: number; x2: number; y2: number }[]; phase: number }
    const traces: Trace[] = [];

    function initCircuits() {
      const w = canvas!.width, h = canvas!.height;
      for (let i = 0; i < 12; i++) {
        const segs: Trace['segments'] = [];
        let x = Math.random() * w, y = Math.random() * h;
        const steps = 3 + Math.floor(Math.random() * 5);
        for (let s = 0; s < steps; s++) {
          const dir = Math.floor(Math.random() * 4);
          const len = 20 + Math.random() * 60;
          const nx = dir === 0 ? x + len : dir === 1 ? x - len : x;
          const ny = dir === 2 ? y + len : dir === 3 ? y - len : y;
          segs.push({ x1: x, y1: y, x2: nx, y2: ny });
          x = nx; y = ny;
        }
        traces.push({ segments: segs, phase: Math.random() * Math.PI * 2 });
      }
    }

    function drawCircuits() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      for (const trace of traces) {
        const pulse = Math.sin(time * 1.2 + trace.phase) * 0.5 + 0.5;
        ctx!.strokeStyle = rgba(0.1 + pulse * 0.14);
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        for (const seg of trace.segments) {
          ctx!.moveTo(seg.x1, seg.y1);
          ctx!.lineTo(seg.x2, seg.y2);
        }
        ctx!.stroke();
        // Nodes at joints
        for (const seg of trace.segments) {
          ctx!.beginPath();
          ctx!.arc(seg.x2, seg.y2, 2, 0, Math.PI * 2);
          ctx!.fillStyle = rgba(0.15 + pulse * 0.2);
          ctx!.fill();
        }
      }
    }

    // ----- RADAR -----
    function drawRadar() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const maxR = Math.min(w, h) * 0.4;

      // Rings
      for (let i = 1; i <= 4; i++) {
        ctx!.beginPath();
        ctx!.arc(cx, cy, maxR * (i / 4), 0, Math.PI * 2);
        ctx!.strokeStyle = rgba(0.1);
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }

      // Cross lines
      ctx!.beginPath();
      ctx!.moveTo(cx - maxR, cy); ctx!.lineTo(cx + maxR, cy);
      ctx!.moveTo(cx, cy - maxR); ctx!.lineTo(cx, cy + maxR);
      ctx!.strokeStyle = rgba(0.07);
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // Sweep — layered arcs (no createConicGradient for compatibility)
      const angle = time * 0.8;
      const sweepLen = Math.PI * 0.35;
      for (let i = 0; i < 8; i++) {
        const frac = 1 - i / 8;
        const a0 = angle - sweepLen * ((i + 1) / 8);
        const a1 = angle - sweepLen * (i / 8);
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.arc(cx, cy, maxR, a0, a1);
        ctx!.closePath();
        ctx!.fillStyle = rgba(0.22 * frac);
        ctx!.fill();
      }

      // Sweep line
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx!.strokeStyle = rgba(0.4);
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Blips
      const blips = [0.3, 0.55, 0.72, 0.4, 0.85];
      const blipAngles = [0.8, 2.1, 3.8, 5.2, 1.4];
      for (let i = 0; i < blips.length; i++) {
        const bAngle = blipAngles[i];
        const diff = ((angle - bAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (diff < 1.5) {
          const fade = 1 - diff / 1.5;
          ctx!.beginPath();
          ctx!.arc(cx + Math.cos(bAngle) * maxR * blips[i], cy + Math.sin(bAngle) * maxR * blips[i], 3, 0, Math.PI * 2);
          ctx!.fillStyle = rgba(fade * 0.45);
          ctx!.fill();
        }
      }
    }

    // ----- BINARY -----
    interface BinaryCol { x: number; chars: string[]; y: number; speed: number; length: number }
    const binaryCols: BinaryCol[] = [];

    function initBinary() {
      const w = canvas!.width;
      const cols = Math.floor(w / 16);
      for (let i = 0; i < cols; i++) {
        if (Math.random() > 0.4) continue; // sparse
        const length = 5 + Math.floor(Math.random() * 12);
        const chars: string[] = [];
        for (let j = 0; j < length; j++) chars.push(Math.random() > 0.5 ? '1' : '0');
        binaryCols.push({
          x: i * 16 + 8, chars, y: Math.random() * canvas!.height,
          speed: 0.3 + Math.random() * 0.8, length,
        });
      }
    }

    function drawBinary() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);
      ctx!.font = '10px "JetBrains Mono", monospace';
      ctx!.textAlign = 'center';

      for (const col of binaryCols) {
        col.y += col.speed;
        if (col.y > h + col.length * 14) col.y = -col.length * 14;
        // Random char mutations
        if (Math.random() < 0.01) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = Math.random() > 0.5 ? '1' : '0';
        }
        for (let j = 0; j < col.chars.length; j++) {
          const cy = col.y + j * 14;
          if (cy < -14 || cy > h + 14) continue;
          const fade = j / col.chars.length;
          ctx!.fillStyle = rgba(0.08 + fade * 0.15);
          ctx!.fillText(col.chars[j], col.x, cy);
        }
      }
    }

    // ----- TOPOLOGY -----
    interface TopoNode { x: number; y: number; connections: number[]; pulse: number; tier: number }
    const topoNodes: TopoNode[] = [];

    function initTopology() {
      const w = canvas!.width, h = canvas!.height;
      // Central node
      topoNodes.push({ x: w / 2, y: h / 2, connections: [], pulse: 0, tier: 0 });
      // Ring 1
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i + 0.3;
        const r = Math.min(w, h) * 0.2;
        topoNodes.push({ x: w / 2 + Math.cos(angle) * r, y: h / 2 + Math.sin(angle) * r, connections: [0], pulse: i * 0.7, tier: 1 });
      }
      // Ring 2
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 / 8) * i;
        const r = Math.min(w, h) * 0.35;
        const parent = 1 + (i % 5);
        topoNodes.push({ x: w / 2 + Math.cos(angle) * r, y: h / 2 + Math.sin(angle) * r, connections: [parent], pulse: i * 0.5, tier: 2 });
      }
    }

    function drawTopology() {
      const w = canvas!.width, h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      // Draw connections
      for (const node of topoNodes) {
        for (const ci of node.connections) {
          const target = topoNodes[ci];
          const pulse = Math.sin(time * 1.5 + node.pulse) * 0.5 + 0.5;
          ctx!.beginPath();
          ctx!.moveTo(node.x, node.y);
          ctx!.lineTo(target.x, target.y);
          ctx!.strokeStyle = rgba(0.09 + pulse * 0.1);
          ctx!.lineWidth = 0.7;
          ctx!.stroke();

          // Data packet traveling along line
          const t = ((time * 0.5 + node.pulse) % 1);
          const px = node.x + (target.x - node.x) * t;
          const py = node.y + (target.y - node.y) * t;
          ctx!.beginPath();
          ctx!.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = rgba(0.2 + pulse * 0.2);
          ctx!.fill();
        }
      }

      // Draw nodes
      for (const node of topoNodes) {
        const pulse = Math.sin(time * 2 + node.pulse) * 0.5 + 0.5;
        const r = node.tier === 0 ? 4 : node.tier === 1 ? 2.5 : 1.5;

        // Glow
        if (node.tier < 2) {
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = rgba(0.04 + pulse * 0.05);
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = rgba(0.18 + pulse * 0.22);
        ctx!.fill();
      }
    }

    // Init based on variant
    switch (variant) {
      case 'constellation': initConstellation(); break;
      case 'particles': initParticles(); break;
      case 'circuits': initCircuits(); break;
      case 'binary': initBinary(); break;
      case 'topology': initTopology(); break;
    }

    function draw() {
      time += 0.01;
      switch (variant) {
        case 'constellation': drawConstellation(); break;
        case 'hexgrid': drawHexgrid(); break;
        case 'waveform': drawWaveform(); break;
        case 'particles': drawParticles(); break;
        case 'circuits': drawCircuits(); break;
        case 'radar': drawRadar(); break;
        case 'binary': drawBinary(); break;
        case 'topology': drawTopology(); break;
      }
      animFrame = requestAnimationFrame(draw);
    }

    animFrame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animFrame); ro.disconnect(); };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}
