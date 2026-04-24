// Varyasyon 6 — V5 HERO + V1 TERMINAL + V3 DOSSIER
// Üstte V5 stil büyük tipografi + sticky nav + lede
// Ortada V1 terminal (ls focus, tail experience, cat contact)
// Altta V3 dossier grid + timeline + skills + edu/certs

const V6_Mix = ({ lang = "en" }) => {
  const C = window.CONTENT;
  const T = C.ui[lang];

  return (
    <div className="artboard v6" style={{ width: 1280, height: 4000 }}>
      <MatrixBackdrop intensity={42} />

      {/* — STICKY NAV (V5) — */}
      <nav className="v6-nav">
        <span className="brand">MASHEN.DEV</span>
        <div className="links">
          <a href="#v6-home">{T.nav.home}</a>
          <a href="#v6-terminal">~/shell</a>
          <a href="#v6-dossier">{T.nav.focus}</a>
          <a href="#v6-work">{T.nav.work}</a>
          <a href="#v6-contact">{T.nav.contact}</a>
        </div>
        <span className="status"><span className="dot"></span>{T.status}</span>
      </nav>

      {/* — V5 HERO — */}
      <section className="v6-hero" id="v6-home">
        <div className="eyebrow">AI / ML · GENERATIVE · AGENTIC · MULTI-MODAL</div>
        <h1>Pipelines that <em>think</em>, assets that <em>ship</em>.</h1>
        <p className="lede">{C.tagline[lang]}</p>
        <div className="v6-hero-actions">
          <a className="btn" href={`mailto:${C.identity.email}`}>→ {T.cta.contact}</a>
          <a className="btn ghost" href="#v6-terminal">~/shell ↓</a>
        </div>
        <div className="v6-hero-meta">
          <div><span className="k">ROLE</span><span className="v">{C.role[lang]}</span></div>
          <div><span className="k">BASE</span><span className="v">{C.identity.location}</span></div>
          <div><span className="k">NOW</span><span className="v">Unico Studio · 2025 →</span></div>
          <div><span className="k">STATUS</span><span className="v" style={{color:"var(--accent)"}}>● {T.latency}</span></div>
        </div>

        {/* — NOW / CURRENTLY BUILDING — */}
        <div className="v6-now">
          <div className="v6-now-head">
            <span className="v6-now-badge">
              <span className="v6-now-dot"></span>
              NOW · {lang === "tr" ? "SU AN INSA EDIYORUM" : lang === "nl" ? "NU AAN HET BOUWEN" : "CURRENTLY BUILDING"}
            </span>
            <div className="v6-now-rule"></div>
            <span className="v6-now-meta">{C.availability[lang]}</span>
          </div>
          <p className="v6-now-body">{C.now[lang]}</p>
          <div className="v6-now-stack">
            {C.nowStack.map((s, i) => <span key={i} className="tag">{s}</span>)}
          </div>
        </div>

        {/* — LANGUAGES STRIP — */}
        <div className="v6-langs">
          {C.languages.map((l) => (
            <div key={l.code} className="v6-lang">
              <span className="code">{l.code}</span>
              <div className="bar"><span style={{ width: `${l.pct}%` }}></span></div>
              <span className="lvl">{l.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* — V1 TERMINAL (ismi yok; whoami --verbose cikti + ls focus + tail exp) — */}
      <section className="v6-terminal-wrap" id="v6-terminal">
        <div className="v1-shell v6-shell">
          <div className="v1-chrome">
            <span className="v1-dots"><i></i><i></i><i></i></span>
            <span style={{ marginLeft: 14 }}>— mashen@matrix : ~/portfolio —</span>
            <span style={{ marginLeft: "auto" }}>tmux · 80×24 · {T.status}</span>
          </div>
          <div className="v1-body">
            <div>
              <span className="v1-prompt">mashen@matrix</span>
              <span className="v1-dim">:</span>
              <span className="v1-path">~/portfolio</span>
              <span className="v1-dim">$</span>{" "}
              <span className="v1-cmd">whoami --verbose</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.9 }}>
              <div><span className="v1-dim">user</span>{"    "}<span style={{ color: "var(--accent)" }}>{C.identity.name.toLowerCase().replace(/[.\s]/g, "")}</span> <span className="v1-dim">({C.identity.name})</span></div>
              <div><span className="v1-dim">uid</span>{"     "}1000 &nbsp; <span className="v1-dim">gid</span>{" "}1000(ai-ml)</div>
              <div><span className="v1-dim">groups</span>{" "}ai-ml, generative, agentic, automation, l10n, game-lab</div>
              <div><span className="v1-dim">shell</span>{"   "}/bin/ship</div>
              <div><span className="v1-dim">since</span>{"   "}2021 · {C.experience.length} engagements · {C.focus.length} active domains</div>
            </div>

            <div style={{ marginTop: 26 }}>
              <span className="v1-prompt">mashen@matrix</span>
              <span className="v1-dim">:</span>
              <span className="v1-path">~/portfolio</span>
              <span className="v1-dim">$</span>{" "}
              <span className="v1-cmd">ls -la focus/</span>
            </div>
            <div className="v1-listing" style={{ marginTop: 10 }}>
              <div className="kind">total {C.focus.length}</div><div></div><div></div>
              {C.focus.map((f) => (
                <React.Fragment key={f.id}>
                  <div className="kind">drwxr-xr-x</div>
                  <div><span className="name">{f.id}/</span> <span className="v1-dim">— {f.title[lang]}</span></div>
                  <div className="hint">[{f.code}]</div>
                </React.Fragment>
              ))}
            </div>

            <div style={{ marginTop: 26 }}>
              <span className="v1-prompt">mashen@matrix</span>
              <span className="v1-dim">:</span>
              <span className="v1-path">~/portfolio</span>
              <span className="v1-dim">$</span>{" "}
              <span className="v1-cmd">tail -n {C.experience.length} experience.log</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.9 }}>
              {C.experience.map((e, i) => (
                <div key={i}>
                  <span className="v1-dim">[{e.year}]</span>{" "}
                  <span style={{ color: "var(--accent)" }}>{e.company}</span>{" "}
                  <span className="v1-dim">·</span>{" "}
                  <span>{e.role[lang]}</span>
                  {e.tag === "current" && <span className="tag" style={{ marginLeft: 10 }}>● {T.latency}</span>}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 26 }}>
              <span className="v1-prompt">mashen@matrix</span>
              <span className="v1-dim">:</span>
              <span className="v1-path">~/portfolio</span>
              <span className="v1-dim">$</span>{" "}
              <span className="v1-cmd">cat contact.sh</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.9 }}>
              <div><span className="v1-dim">#!/bin/bash</span></div>
              <div><span className="v1-dim">email=</span><span style={{ color: "var(--accent)" }}>"{C.identity.email}"</span></div>
              <div><span className="v1-dim">github=</span><span style={{ color: "var(--accent)" }}>"github.com/{C.identity.github}"</span></div>
              <div><span className="v1-dim">linkedin=</span><span style={{ color: "var(--accent)" }}>"in/{C.identity.linkedin}"</span></div>
              <div><span className="v1-dim">medium=</span><span style={{ color: "var(--accent)" }}>"medium.com/{C.identity.medium}"</span></div>
              <div>
                <span className="v1-prompt">mashen@matrix</span>
                <span className="v1-dim">:</span>
                <span className="v1-path">~/portfolio</span>
                <span className="v1-dim">$</span> <span className="caret"></span>
              </div>
            </div>
          </div>
          <div className="v1-bar">
            <span>-- INSERT --</span>
            <span>utf-8 · {lang} · {T.status}</span>
            <span>mashen.dev · {C.identity.location}</span>
          </div>
        </div>
      </section>

      {/* — V3 DOSSIER (masthead + big name + 3x3 focus + timeline + skills + edu/certs + contact) — */}
      <section className="v6-dossier-wrap" id="v6-dossier">
        <div className="v3-masthead">
          <span className="wordmark">MASHEN.DEV</span>
          <div className="rule"></div>
          <span className="id">DOSSIER / 001 · REV 2026.Q2 · {C.identity.location.toUpperCase()}</span>
        </div>
        <h1 className="v3-title">M. ALİ <em>ŞEN</em></h1>
        <p className="v3-sub">{C.role[lang]} — {C.tagline[lang]}</p>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <span className="mono uppercase" style={{ fontSize: 11, color: "var(--accent)" }}>§ {T.sections.focus}</span>
          <div style={{ height: 1, background: "var(--line)" }}></div>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{String(C.focus.length).padStart(2, "0")} ENTRIES</span>
        </div>

        <div className="v3-grid">
          {C.focus.map((f, i) => (
            <article className="v3-card" key={f.id}>
              <span className="idx">{String(i + 1).padStart(2, "0")} / {String(C.focus.length).padStart(2, "0")}</span>
              <div className="code">[{f.code}]</div>
              <h3>{f.title[lang]}</h3>
              <p>{f.body[lang]}</p>
              <div className="stack">
                {f.stack.map((s, j) => <span key={j} className="tag" style={{ color: "var(--muted)", borderColor: "var(--line)" }}>{s}</span>)}
              </div>
              {f.proof && <div className="v6-proof">{f.proof[lang]}</div>}
            </article>
          ))}
        </div>

        <div id="v6-work" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span className="mono uppercase" style={{ fontSize: 11, color: "var(--accent)" }}>§ {T.sections.work}</span>
              <div style={{ height: 1, background: "var(--line)" }}></div>
            </div>
            {C.experience.map((e, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 14, padding: "14px 0", borderTop: i > 0 ? "1px solid var(--line)" : "none" }}>
                <div className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>{e.year}</div>
                <div>
                  <div className="mono" style={{ fontSize: 14, color: "var(--text)" }}>
                    {e.company}
                    {e.tag === "current" && <span className="tag" style={{ marginLeft: 10 }}>● NOW</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{e.role[lang]}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, lineHeight: 1.6 }}>{e.note[lang]}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span className="mono uppercase" style={{ fontSize: 11, color: "var(--accent)" }}>§ {T.sections.skills}</span>
              <div style={{ height: 1, background: "var(--line)" }}></div>
              <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>0 — 6</span>
            </div>
            {C.skills.map((s, i) => (
              <div key={i} className="skillbar">
                <span className="label">{s.name}</span>
                <span className="track">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <span key={j} className={`cell${j < s.level ? " on" : ""}`}></span>
                  ))}
                </span>
                <span className="num">{s.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* — GITHUB SHOWCASE — */}
        <div id="v6-repos" style={{ marginTop: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span className="mono uppercase" style={{ fontSize: 11, color: "var(--accent)" }}>§ REPOSITORIES</span>
            <div style={{ height: 1, background: "var(--line)" }}></div>
            <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>github.com/{C.identity.github}</span>
            <a href={`https://github.com/${C.identity.github}`} className="mono" style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>→ ALL</a>
          </div>
          <div className="v6-repos">
            {C.github.map((r) => (
              <a key={r.name} href={r.url} className="v6-repo" target="_blank" rel="noopener noreferrer">
                <div className="v6-repo-head">
                  <span className="v6-repo-icon">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </span>
                  <span className="v6-repo-name">{r.name}</span>
                  <span className="v6-repo-arrow">↗</span>
                </div>
                <p className="v6-repo-desc">{r.desc[lang]}</p>
                <div className="v6-repo-tags">
                  {r.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div id="v6-contact" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, paddingTop: 28, borderTop: "1px solid var(--line-2)" }}>          <div>
            <div className="mono uppercase" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: "0.14em", marginBottom: 8 }}>{T.sections.edu}</div>
            {C.education.map((e, i) => (
              <div key={i} style={{ fontSize: 12, marginBottom: 8 }}>
                <div className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>{e.year}</div>
                <div style={{ color: "var(--text)" }}>{e.degree}</div>
                <div style={{ color: "var(--muted)" }}>{e.school}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="mono uppercase" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: "0.14em", marginBottom: 8 }}>{T.sections.certs}</div>
            {C.certs.map((c, i) => (
              <div key={i} className="mono" style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.8 }}>→ {c}</div>
            ))}
          </div>
          <div>
            <div className="mono uppercase" style={{ fontSize: 10, color: "var(--muted-2)", letterSpacing: "0.14em", marginBottom: 8 }}>{T.sections.contact}</div>
            <div className="mono" style={{ fontSize: 12, lineHeight: 2, color: "var(--muted)" }}>
              <div><span style={{color:"var(--muted-2)"}}>email</span> &nbsp;&nbsp;<span style={{color:"var(--accent)"}}>{C.identity.email}</span></div>
              <div><span style={{color:"var(--muted-2)"}}>git</span> &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"var(--accent)"}}>github.com/{C.identity.github}</span></div>
              <div><span style={{color:"var(--muted-2)"}}>in</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"var(--accent)"}}>linkedin.com/in/{C.identity.linkedin}</span></div>
              <div><span style={{color:"var(--muted-2)"}}>medium</span> &nbsp;<span style={{color:"var(--accent)"}}>medium.com/{C.identity.medium}</span></div>
              <div><span style={{color:"var(--muted-2)"}}>tel</span> &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"var(--text)"}}>{C.identity.phone}</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

window.V6_Mix = V6_Mix;
