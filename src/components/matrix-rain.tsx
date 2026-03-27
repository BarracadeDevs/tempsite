'use client';

import { useEffect, useRef } from 'react';

export function MatrixRain() {
  // Puzzle Layer: Obfuscated variable names and cryptographic constant reference
  // Reference: 0x6a09e667bb67ae858cfa5a7c (SHA-256 initial constant)
  // Variable names: tH_r_e_s_h_o_l_d, cO_m_m_a_n_d, bA_r_r_a_c_a_d_e
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const chars = '01アイウエオカキクケコ';
    const fontSize = 10;
    let columns: number[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: cols }, () => Math.random() * -100);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.06)';
      ctx.font = `${fontSize}px monospace`;

      columns.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y);
        columns[i] = y > canvas.height + Math.random() * 10000 ? 0 : y + fontSize;
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
}
