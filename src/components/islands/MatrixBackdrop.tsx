import { useEffect, useRef } from 'react';

interface Props {
  intensity?: number;
  accent?: string;
  grid?: boolean;
  paused?: boolean;
  scanlines?: boolean;
}

function MatrixRain({
  intensity = 55,
  accent = '#39ff88',
  paused = false,
  fontSize = 16,
}: {
  intensity?: number;
  accent?: string;
  paused?: boolean;
  fontSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]()'.split(
        '',
      );

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      const cols = Math.floor(canvas.offsetWidth / fontSize);
      dropsRef.current = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener('resize', resize);

    let last = 0;
    const speed = 45 + (100 - intensity) * 0.8;

    const tick = (t: number) => {
      if (paused) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (t - last > speed) {
        last = t;
        ctx.fillStyle = 'rgba(2, 4, 2, 0.08)';
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        ctx.font = `${fontSize}px 'IBM Plex Mono', monospace`;
        const opacity = Math.max(0.15, intensity / 100);
        dropsRef.current.forEach((y, i) => {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          ctx.fillStyle = `${accent}${Math.floor(Math.min(1, opacity + 0.3) * 255)
            .toString(16)
            .padStart(2, '0')}`;
          ctx.fillText(char, x, y * fontSize);
          ctx.fillStyle = `${accent}${Math.floor(opacity * 180)
            .toString(16)
            .padStart(2, '0')}`;
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * fontSize);

          if (y * fontSize > canvas.offsetHeight && Math.random() > 0.975) {
            dropsRef.current[i] = 0;
          }
          dropsRef.current[i] = y + 1;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, accent, paused, fontSize]);

  return <canvas ref={canvasRef} className="mx-rain-canvas" />;
}

export default function MatrixBackdrop({
  intensity = 55,
  accent = '#39ff88',
  grid = true,
  paused = false,
  scanlines = false,
}: Props) {
  return (
    <div className="mx-backdrop" aria-hidden="true">
      <div
        className="mx-glow"
        style={{
          background: `radial-gradient(circle at 20% 18%, ${accent}1f, transparent 24rem), radial-gradient(circle at 82% 4%, ${accent}14, transparent 22rem)`,
        }}
      />
      {grid && (
        <div
          className="mx-grid"
          style={{
            backgroundImage: `linear-gradient(${accent}0c 1px, transparent 1px), linear-gradient(90deg, ${accent}0c 1px, transparent 1px)`,
          }}
        />
      )}
      {intensity > 3 && <MatrixRain intensity={intensity} accent={accent} paused={paused} />}
      {scanlines && <div className="mx-scan" />}
      <div className="mx-vignette" />
    </div>
  );
}
