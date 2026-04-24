import { useEffect, useRef, useState } from 'react';

type Tweaks = {
  accent: string;
  rainIntensity: number;
  paused: boolean;
  scanlines: boolean;
};

const DEFAULTS: Tweaks = {
  accent: '#39ff88',
  rainIntensity: 55,
  paused: false,
  scanlines: false,
};

const PRESETS: { value: string; label: string }[] = [
  { value: '#39ff88', label: 'Matrix' },
  { value: '#5ec9ff', label: 'Cyan' },
  { value: '#ffb13d', label: 'Amber' },
  { value: '#ff6f91', label: 'Magenta' },
];

function applyAccent(color: string) {
  const root = document.documentElement.style;
  root.setProperty('--accent', color);
  const hex = color.replace('#', '');
  const rr = parseInt(hex.substr(0, 2), 16);
  const gg = parseInt(hex.substr(2, 2), 16);
  const bb = parseInt(hex.substr(4, 2), 16);
  root.setProperty('--line', `rgba(${rr}, ${gg}, ${bb}, 0.16)`);
  root.setProperty('--line-2', `rgba(${rr}, ${gg}, ${bb}, 0.32)`);
  root.setProperty('--line-3', `rgba(${rr}, ${gg}, ${bb}, 0.58)`);
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState<Tweaks>(DEFAULTS);
  const loadedRef = useRef(false);

  // hydrate from localStorage
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const raw = localStorage.getItem('mashen-tweaks');
      if (raw) {
        const saved = JSON.parse(raw);
        setT({ ...DEFAULTS, ...saved });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // apply + persist + broadcast
  useEffect(() => {
    applyAccent(t.accent);
    try {
      localStorage.setItem('mashen-tweaks', JSON.stringify(t));
    } catch { /* ignore */ }
    window.dispatchEvent(
      new CustomEvent('mashen:tweaks', { detail: t }),
    );
  }, [t]);

  const set = <K extends keyof Tweaks>(k: K, v: Tweaks[K]) =>
    setT((prev) => ({ ...prev, [k]: v }));

  const reset = () => setT(DEFAULTS);

  return (
    <>
      <button
        className="tweaks-fab"
        aria-label="Open tweaks"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="tweaks-fab-dot" />
        TWEAKS
      </button>

      {open && (
        <div className="tweaks-panel" role="dialog" aria-label="Visual tweaks">
          <div className="tweaks-head">
            <span>// tweaks</span>
            <button className="tweaks-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className="tweaks-section">Accent</div>
          <div className="tweaks-presets">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                className={`tweaks-swatch${t.accent === p.value ? ' active' : ''}`}
                onClick={() => set('accent', p.value)}
                title={p.label}
                style={{ background: p.value }}
              >
                <span className="sr">{p.label}</span>
              </button>
            ))}
            <input
              type="color"
              value={t.accent}
              onChange={(e) => set('accent', e.target.value)}
              className="tweaks-color"
              title="Custom"
            />
          </div>

          <div className="tweaks-section">Matrix rain</div>
          <div className="tweaks-row">
            <label>Intensity</label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={t.rainIntensity}
              onChange={(e) => set('rainIntensity', Number(e.target.value))}
            />
            <span className="tweaks-val">{t.rainIntensity}</span>
          </div>

          <div className="tweaks-row toggle">
            <label>
              <input
                type="checkbox"
                checked={t.paused}
                onChange={(e) => set('paused', e.target.checked)}
              />
              Pause animation
            </label>
          </div>

          <div className="tweaks-row toggle">
            <label>
              <input
                type="checkbox"
                checked={t.scanlines}
                onChange={(e) => set('scanlines', e.target.checked)}
              />
              CRT scanlines
            </label>
          </div>

          <div className="tweaks-actions">
            <button className="tweaks-reset" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      )}

      <style>{`
        .tweaks-fab {
          position: fixed; bottom: 20px; right: 20px; z-index: 60;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 14px;
          background: rgba(2,4,2,0.82);
          backdrop-filter: blur(8px);
          border: 1px solid var(--line-2);
          color: var(--accent);
          font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em;
          cursor: pointer;
          transition: border-color 160ms, transform 160ms;
        }
        .tweaks-fab:hover { border-color: var(--accent); transform: translateY(-1px); }
        .tweaks-fab-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); box-shadow: 0 0 8px var(--accent);
        }
        .tweaks-panel {
          position: fixed; bottom: 68px; right: 20px; z-index: 60;
          width: 280px;
          background: rgba(2,4,2,0.92);
          backdrop-filter: blur(12px);
          border: 1px solid var(--line-2);
          padding: 16px 18px;
          font-family: var(--mono);
          color: var(--text);
          animation: tweaksIn 140ms ease-out;
        }
        @keyframes tweaksIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .tweaks-head {
          display: flex; justify-content: space-between; align-items: center;
          color: var(--muted); font-size: 10.5px; letter-spacing: 0.14em;
          margin-bottom: 12px;
        }
        .tweaks-close {
          background: transparent; border: 1px solid var(--line);
          color: var(--muted); padding: 2px 8px; cursor: pointer;
          font-family: var(--mono); font-size: 12px;
        }
        .tweaks-close:hover { color: var(--accent); border-color: var(--accent); }
        .tweaks-section {
          color: var(--muted-2); font-size: 10px; letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 12px 0 8px; padding-bottom: 6px;
          border-bottom: 1px solid var(--line);
        }
        .tweaks-presets { display: flex; gap: 6px; align-items: center; }
        .tweaks-swatch {
          width: 22px; height: 22px; border: 1px solid var(--line-2);
          cursor: pointer; padding: 0;
          position: relative;
        }
        .tweaks-swatch.active { border-color: var(--accent); outline: 2px solid rgba(57,255,136,0.3); outline-offset: 2px; }
        .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
        .tweaks-color { width: 28px; height: 22px; border: 1px solid var(--line-2); background: transparent; padding: 0; cursor: pointer; }
        .tweaks-row {
          display: grid; grid-template-columns: auto 1fr 32px;
          align-items: center; gap: 10px; font-size: 11px; margin: 8px 0;
          color: var(--muted);
        }
        .tweaks-row.toggle { grid-template-columns: 1fr; }
        .tweaks-row.toggle label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .tweaks-val { color: var(--accent); text-align: right; font-size: 11px; }
        input[type="range"] { accent-color: var(--accent); width: 100%; }
        input[type="checkbox"] { accent-color: var(--accent); }
        .tweaks-actions { display: flex; justify-content: flex-end; margin-top: 14px; }
        .tweaks-reset {
          background: transparent; border: 1px solid var(--line-2);
          color: var(--muted); padding: 4px 10px; cursor: pointer;
          font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.14em;
        }
        .tweaks-reset:hover { color: var(--accent); border-color: var(--accent); }
      `}</style>
    </>
  );
}
