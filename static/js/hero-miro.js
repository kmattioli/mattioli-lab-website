/* hero-miro.js — Mattioli Lab animated "splice constellation" hero.
   Vanilla-JS port of design-reference/site/hero/{shared,hero-miro}.jsx (no React).
   Draws at 1600x800 (DPR-scaled) and is CSS-scaled to cover the hero, so it stays
   crisp at full width. Seamless 12s loop; honours prefers-reduced-motion. */
(function () {
  'use strict';

  // ---- palette + helpers (shared.jsx) --------------------------------------
  const PALETTE = { red: '#C0392B', yellow: '#E6A817', blue: '#2A6FB0' };

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function setupCanvas(canvas, w, h) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }
  function hexToRgb(hex) { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function rgba(hex, a) { const c = hexToRgb(hex); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  function roundRectPath(ctx, x, y, w, h, r) {
    r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function drawChevrons(ctx, x0, x1, y, dir, color, gap, size) {
    ctx.strokeStyle = color; ctx.lineWidth = 1.4; ctx.lineCap = 'round';
    for (let x = x0 + gap * 0.5; x < x1; x += gap) {
      ctx.beginPath(); ctx.moveTo(x - dir * size, y - size); ctx.lineTo(x, y); ctx.lineTo(x - dir * size, y + size); ctx.stroke();
    }
  }

  // ---- hero (hero-miro.jsx) ------------------------------------------------
  function initHero(canvas) {
    const W = 1600, H = 800;
    const ctx = setupCanvas(canvas, W, H);
    const INK = '#1b1a17', RED = PALETTE.red, YEL = PALETTE.yellow, BLU = PALETTE.blue;
    const HUES = [RED, YEL, BLU];

    function blob(c, r, rot, seed, sy) {
      const rnd = mulberry32(seed); const A = [0.16 + rnd() * 0.14, 0.07 + rnd() * 0.1, 0.05 + rnd() * 0.07]; const P = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28];
      const N = 36; c.beginPath();
      for (let i = 0; i <= N; i++) { const a = (i / N) * Math.PI * 2 + rot; const rr = r * (1 + A[0] * Math.sin(a * 2 + P[0]) + A[1] * Math.sin(a * 3 + P[1]) + A[2] * Math.sin(a * 5 + P[2])); c[i ? 'lineTo' : 'moveTo'](Math.cos(a) * rr, Math.sin(a) * rr * (sy || 1)); }
      c.closePath();
    }
    function asterisk(c, r, n, rot, col, w) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; for (let i = 0; i < n; i++) { const a = rot + (i / n) * Math.PI * 2; c.beginPath(); c.moveTo(-Math.cos(a) * r, -Math.sin(a) * r); c.lineTo(Math.cos(a) * r, Math.sin(a) * r); c.stroke(); } }

    const rnd = mulberry32(73);
    const cols = []; let x = 165, ci = 0;
    while (x < W - 130) { const w = 30 + rnd() * 44; cols.push({ x: x, w: w, hue: HUES[(ci + (rnd() < 0.2 ? 1 : 0)) % 3] }); x += w + (32 + rnd() * 44); ci++; }
    const NC = cols.length;
    cols[0].hue = RED; cols[NC - 1].hue = BLU;

    const rowYs = [205, 320, 435, 550, 665];
    const models = rowYs.map(function (y, ri) {
      if (ri === 0) { const inc = cols.map(function (_, i) { return i; }); return { y: y, inc: inc, arcs: [], ri: ri, canonical: true }; }
      const s0 = rnd() < 0.38 ? 1 : 0;
      const e0 = NC - 1 - (rnd() < 0.38 ? 1 : 0);
      const s = ri === 3 ? 0 : s0;
      const e = ri === 4 ? NC - 1 : e0;
      const inc = [s];
      for (let c = s + 1; c < e; c++) { const u = (c - s) / (e - s); const edgeness = Math.abs(u - 0.5) * 2; const skipProb = 0.16 + 0.52 * edgeness; if (rnd() > skipProb) inc.push(c); }
      inc.push(e);
      if (ri === 1) {
        let best = -1, bestD = 9;
        for (let k = 1; k < inc.length - 1; k++) { if (inc[k] - inc[k - 1] === 1 && inc[k + 1] - inc[k] === 1) { const d = Math.abs((inc[k] - s) / (e - s) - 0.5); if (d < bestD) { bestD = d; best = k; } } }
        if (best < 0) { for (let k = 1; k < inc.length - 1; k++) { const d = Math.abs((inc[k] - s) / (e - s) - 0.5); if (d < bestD) { bestD = d; best = k; } } }
        if (best > 0) inc.splice(best, 1);
      }
      let hasSkip = inc.some(function (c, k) { return k > 0 && c - inc[k - 1] >= 2; });
      if (!hasSkip && inc.length > 2) { inc.splice(Math.floor(inc.length / 2), 1); hasSkip = true; }
      const arcs = [];
      for (let k = 0; k < inc.length - 1; k++) { if (inc[k + 1] - inc[k] >= 2) arcs.push([inc[k], inc[k + 1]]); }
      return { y: y, inc: inc, arcs: arcs, ri: ri };
    });
    const minX = cols[0].x, maxX = cols[NC - 1].x + cols[NC - 1].w;
    const allArcs = [];
    models.forEach(function (m) { m.arcs.forEach(function (pr) { allArcs.push({ y: m.y, a: pr[0], b: pr[1], lx: cols[pr[0]].x }); }); });
    allArcs.sort(function (p, q) { return p.lx - q.lx; });

    const motifs = [
      { t: 'prot', x: 152, y: 96, r: 20, hue: YEL, dom: RED, domDx: 9, domDy: -4, domR: 9, seed: 21, rot: 0.4 },
      { t: 'prot', x: 300, y: 102, r: 28, hue: RED, dom: BLU, domDx: 14, domDy: -6, domR: 13, seed: 4, rot: 0.2, pocket: true },
      { t: 'prot', x: 468, y: 104, r: 23, hue: BLU, dom: YEL, domDx: -11, domDy: 6, domR: 10, dom2: RED, dom2Dx: 12, dom2Dy: 5, dom2R: 8, seed: 31, rot: 0.9 },
      { t: 'prot', x: 648, y: 88, r: 21, hue: BLU, dom: YEL, domDx: 10, domDy: 7, domR: 9, seed: 9, rot: 0.6 },
      { t: 'dot', x: 800, y: 130, r: 7, col: INK },
      { t: 'prot', x: 940, y: 106, r: 30, hue: RED, dom: BLU, domDx: 15, domDy: -7, domR: 13, dom2: YEL, dom2Dx: -13, dom2Dy: 6, dom2R: 9, seed: 17, rot: 0.3, pocket: true },
      { t: 'prot', x: 1100, y: 92, r: 24, hue: RED, dom: YEL, domDx: 11, domDy: 7, domR: 10, seed: 14, rot: 0.3 },
      { t: 'prot', x: 1255, y: 112, r: 22, hue: YEL, dom: BLU, domDx: -10, domDy: -7, domR: 10, seed: 25, rot: 0.5 },
      { t: 'prot', x: 1410, y: 98, r: 30, hue: YEL, dom: BLU, domDx: -14, domDy: -6, domR: 13, dom2: RED, dom2Dx: 13, dom2Dy: 8, dom2R: 9, seed: 6, rot: 0.5, pocket: true },
      { t: 'dot', x: 1490, y: 392, r: 7, col: INK },
      { t: 'dot', x: 120, y: 495, r: 7, col: RED },
      { t: 'aster', x: 735, y: 58, r: 13, n: 3, col: INK, rot: 0.3, w: 2.6 },
      { t: 'aster', x: 1190, y: 132, r: 11, n: 4, col: INK, rot: 0.5, w: 2.4 },
      { t: 'aster', x: 86, y: 312, r: 13, n: 3, col: RED, rot: 0.2, w: 2.8 },
      { t: 'aster', x: 1525, y: 250, r: 12, n: 4, col: BLU, rot: 0.45, w: 2.6 },
      { t: 'aster', x: 70, y: 658, r: 11, n: 3, col: INK, rot: 0.6, w: 2.5 }
    ];

    // Transparent ground (only the faint column guides are baked). The cream is
    // NOT painted into the canvas — the hero's flat --ml-cream background shows
    // through uniformly, so the canvas area and the letterbox margins on wide
    // screens are the exact same color (no vertical seam where the canvas ends).
    const off = document.createElement('canvas');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    off.width = W * dpr; off.height = H * dpr;
    const o = off.getContext('2d'); o.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols.forEach(function (c) { o.fillStyle = rgba(INK, 0.045); o.fillRect(c.x + c.w / 2 - 0.5, 172, 1, 520); });

    const ease = function (u) { return u < 0 ? 0 : u > 1 ? 1 : 1 - Math.pow(1 - u, 3); };
    const eb = function (u) { if (u <= 0) return 0; if (u >= 1) return 1; return (1 - Math.pow(1 - u, 2)) * (1 + 0.16 * Math.sin(u * Math.PI)); };

    function paintFrame(t) {
      let fg = 1;
      if (window.__heroLoop) { const CYCLE = 18, FADE = 2.8; t = t % CYCLE; if (t > CYCLE - FADE) fg = Math.max(0, (CYCLE - t) / FADE); }
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(off, 0, 0, W, H);
      ctx.globalAlpha = fg;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';

      const SWEEP = 3.8;  // slower left-to-right draw-in of the introns/exons
      const frontX = minX + (maxX - minX) * ease(Math.min(1, Math.max(0, (t - 0.25) / SWEEP)));

      models.forEach(function (m) {
        const inc = m.inc.map(function (c) { return cols[c]; });
        const x0 = inc[0].x, x1 = inc[inc.length - 1].x + inc[inc.length - 1].w;
        const fx = frontX + m.ri * 6;
        if (fx <= x0) return;
        const revX = Math.max(x0, Math.min(x1, fx));
        ctx.strokeStyle = rgba(INK, 0.82); ctx.lineWidth = 2; ctx.beginPath();
        for (let xx = x0; xx <= revX; xx += 6) { const yy = m.y + Math.sin(xx * 0.03 + m.ri) * 1.5; xx === x0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy); }
        ctx.stroke();
        drawChevrons(ctx, x0, revX, m.y, 1, rgba(INK, 0.3), 36, 3);
        m.inc.forEach(function (cI, bi) {
          const c = cols[cI];
          const ap = eb(Math.min(1, Math.max(0, (fx - c.x) / 70)));
          if (ap <= 0) return;
          const utr = (bi === 0 || bi === m.inc.length - 1);
          const h = utr ? 14 : 25;
          ctx.save(); ctx.translate(c.x + c.w / 2, m.y); ctx.scale(ap, ap);
          roundRectPath(ctx, -c.w / 2, -h / 2, c.w, h, 3);
          ctx.fillStyle = c.hue; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke();
          ctx.restore();
        });
      });

      const arcBase = 0.25 + SWEEP + 0.3;
      allArcs.forEach(function (ar, idx) {
        const ap = ease(Math.min(1, Math.max(0, (t - (arcBase + idx * 0.12)) / 0.7)));
        if (ap <= 0) return;
        const a = cols[ar.a], b = cols[ar.b];
        const ax = a.x + a.w, bx = b.x, ay = ar.y - 12, lift = Math.min(56, 18 + (bx - ax) * 0.12);
        const cx = (ax + bx) / 2, cy = ar.y - 12 - lift;
        ctx.strokeStyle = INK; ctx.lineWidth = 1.7; ctx.beginPath(); ctx.moveTo(ax, ay);
        const N = 26, n = Math.max(1, Math.floor(N * ap));
        for (let sN = 1; sN <= n; sN++) { const u = sN / N; const px = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * cx + u * u * bx; const py = (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * cy + u * u * ay; ctx.lineTo(px, py); }
        ctx.stroke();
        if (ap > 0.95) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(cx, cy, 3.6, 0, 7); ctx.fill(); }
      });

      motifs.forEach(function (m, i) {
        const mp = ease(Math.min(1, Math.max(0, (t - 0.25) / SWEEP)));
        const front2 = minX + (maxX - minX + 220) * mp;
        const ap = eb(Math.min(1, Math.max(0, (front2 - m.x) / 80)));
        if (ap <= 0) return;
        const fl = Math.sin(t * 0.6 + i * 1.7) * 2.4;
        ctx.save(); ctx.translate(m.x, m.y + fl); ctx.scale(ap, ap);
        if (m.t === 'prot') {
          blob(ctx, m.r, m.rot, m.seed, 0.82); ctx.fillStyle = m.hue; ctx.fill(); ctx.lineWidth = 2.4; ctx.strokeStyle = INK; ctx.stroke();
          ctx.save(); ctx.translate(m.domDx, m.domDy); blob(ctx, m.domR, m.rot + 1.3, m.seed + 5, 0.9); ctx.fillStyle = m.dom; ctx.fill(); ctx.lineWidth = 1.8; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore();
          if (m.dom2) { ctx.save(); ctx.translate(m.dom2Dx, m.dom2Dy); blob(ctx, m.dom2R, m.rot + 2.4, m.seed + 9, 0.9); ctx.fillStyle = m.dom2; ctx.fill(); ctx.lineWidth = 1.8; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); }
          if (m.pocket) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-m.r * 0.22, m.r * 0.04, 3, 0, 7); ctx.fill(); }
        } else if (m.t === 'aster') {
          asterisk(ctx, m.r, m.n || 3, m.rot || 0, m.col, m.w || 2.6); ctx.fillStyle = m.col; ctx.beginPath(); ctx.arc(0, 0, 2.6, 0, 7); ctx.fill();
        } else { ctx.fillStyle = m.col; ctx.beginPath(); ctx.arc(0, 0, m.r, 0, 7); ctx.fill(); }
        ctx.restore();
      });

      ctx.globalAlpha = 1;
    }

    window.__heroLoop = true;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { window.__heroLoop = false; paintFrame(5); return; }
    let raf, start = performance.now();
    function loop(now) { paintFrame((now - start) / 1000); raf = requestAnimationFrame(loop); }
    paintFrame(0); raf = requestAnimationFrame(loop);
  }

  function boot() { const c = document.getElementById('ml-hero-canvas'); if (c) initHero(c); }
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
