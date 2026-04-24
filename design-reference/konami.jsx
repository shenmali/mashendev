// Konami code easter egg — ↑ ↑ ↓ ↓ ← → ← → B A
// Aktif edince 6 saniyelik full-screen matrix takeover
// ESC ile çıkılır. Session başına bir kez otomatik yakalanır.

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const KonamiTakeover = () => {
  const [active, setActive] = React.useState(false);
  const bufRef = React.useRef([]);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => {
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

  React.useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const fs = 18;
    const cols = Math.floor(innerWidth / fs);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'.split('');
    const drops = Array.from({ length: cols }, () => Math.random() * -100);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#39ff88';

    let raf;
    const tick = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fs}px 'IBM Plex Mono', monospace`;
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        // leading head brighter
        ctx.fillStyle = '#e8f3ec';
        ctx.fillText(ch, i * fs, y * fs);
        ctx.fillStyle = accent;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, (y - 1) * fs);
        drops[i] = y * fs > canvas.height && Math.random() > 0.96 ? 0 : y + 1;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    // auto-dismiss after 6s
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
      <canvas ref={canvasRef} className="konami-canvas"></canvas>
      <div className="konami-scan"></div>
      <div className="konami-msg">
        <div className="glitch">WAKE UP, NEO...</div>
        <div className="sub">THE MATRIX HAS YOU</div>
        <div className="hint">// press ESC to return</div>
      </div>
    </div>
  );
};

window.KonamiTakeover = KonamiTakeover;
