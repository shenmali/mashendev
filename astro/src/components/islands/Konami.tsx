import { useEffect, useRef, useState } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export default function KonamiTakeover() {
  const [active, setActive] = useState(false);
  const bufRef = useRef<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      bufRef.current = [...bufRef.current, k].slice(-KONAMI.length);
      if (bufRef.current.join(',') === KONAMI.join(',')) {
        bufRef.current = [];
        setActive(true);
      }
      if (e.key === 'Escape' && active) setActive(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fs = 18;
    const cols = Math.floor(window.innerWidth / fs);
    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'.split(
        '',
      );
    const drops = Array.from({ length: cols }, () => Math.random() * -100);
    const accent =
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() ||
      '#39ff88';

    let raf = 0;
    const tick = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fs}px 'IBM Plex Mono', monospace`;
      drops.forEach((y, i) => {
        ctx.fillStyle = '#e8f3ec';
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
        ctx.fillStyle = accent;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, (y - 1) * fs);
        drops[i] = y * fs > canvas.height && Math.random() > 0.96 ? 0 : y + 1;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    const timeout = setTimeout(() => setActive(false), 6000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="konami-overlay">
      <canvas ref={canvasRef} className="konami-canvas" />
      <div className="konami-scan" />
      <div className="konami-msg">
        <div className="glitch">WAKE UP, NEO...</div>
        <div className="sub">THE MATRIX HAS YOU</div>
        <div className="hint">// press ESC to return</div>
      </div>
    </div>
  );
}
