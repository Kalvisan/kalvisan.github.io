import { useEffect, useMemo, useRef } from "react";

/**
 * AsciiNoise
 *
 * A 3D value-noise flow field rendered as ASCII chevrons on a canvas.
 * The component fills its nearest positioned ancestor, so wrap it in an
 * element with `position: relative`. It never blocks pointer events, it
 * rebuilds its noise table only when the `seed` prop changes, and it
 * tears down its animation frame and observers on unmount.
 *
 * Every visual value is a prop, so the look can be tuned from the outside.
 */

// Seeded value noise. Returns a sampler function noise(x, y, z).
function buildNoise(seed) {
  const perm = new Uint8Array(512);
  const base = new Uint8Array(256);
  for (let i = 0; i < 256; i++) base[i] = i;

  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = base[i];
    base[i] = base[j];
    base[j] = tmp;
  }
  for (let i = 0; i < 512; i++) perm[i] = base[i & 255];

  const h = (xi, yi, zi) =>
    perm[(perm[(perm[xi & 255] + yi) & 255] + zi) & 255] / 255;
  const smooth = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;

  return (x, y, z) => {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = x - xi, yf = y - yi, zf = z - zi;
    const u = smooth(xf), v = smooth(yf), w = smooth(zf);
    const c000 = h(xi, yi, zi),       c100 = h(xi + 1, yi, zi);
    const c010 = h(xi, yi + 1, zi),   c110 = h(xi + 1, yi + 1, zi);
    const c001 = h(xi, yi, zi + 1),   c101 = h(xi + 1, yi, zi + 1);
    const c011 = h(xi, yi + 1, zi + 1), c111 = h(xi + 1, yi + 1, zi + 1);
    const x00 = lerp(c000, c100, u), x10 = lerp(c010, c110, u);
    const x01 = lerp(c001, c101, u), x11 = lerp(c011, c111, u);
    return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w);
  };
}

// Stable per cell hash, used for the threshold jitter and rim character pick.
function cellHash(i, j) {
  let n = (i * 374761393 + j * 668265263) | 0;
  n = (n ^ (n >>> 13)) * 1274126177;
  n ^= n >>> 16;
  return (n >>> 0) / 4294967296;
}

const CHEV = [">", "/", "^", "\\", "<", "/", "v", "\\"]; // E NE N NW W SW S SE
const RIM = ["·", "°", "o", "0"];

export default function AsciiNoise({
  seed = 1337,
  cell = 15,
  fps = 20,
  threshold = 0.56,
  edge = 0.05,
  jitter = 0.04,
  octaves = 3,
  noiseScale = 0.055,
  flowScale = 0.03,
  drift = 0.18,
  timeSpeed = 0.1,
  parallax = 18,
  color = "143, 209, 122",
  background = null, // null keeps the canvas transparent
  maxDpr = 1.5,
  className,
  style,
}) {
  const canvasRef = useRef(null);

  // Rebuild the noise sampler only when the seed changes.
  const noise = useMemo(() => buildNoise(seed), [seed]);

  // Keep the live visual values in a ref so the animation loop reads the
  // latest props without being torn down and rebuilt on every change.
  const propsRef = useRef();
  propsRef.current = {
    cell, fps, threshold, edge, jitter, octaves,
    noiseScale, flowScale, drift, timeSpeed, parallax,
    color, background, maxDpr, noise,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = 1, cols = 0, rows = 0, W = 0, H = 0;
    let pointerX = 0.5, pointerY = 0.5;
    let raf = null, last = 0, startStamp = null;

    function fbm(x, y, z) {
      const p = propsRef.current;
      let amp = 0.5, freq = 1, sum = 0, norm = 0;
      for (let i = 0; i < p.octaves; i++) {
        sum += amp * p.noise(x * freq, y * freq, z * freq);
        norm += amp; amp *= 0.5; freq *= 2;
      }
      return sum / norm;
    }

    function resize() {
      const p = propsRef.current;
      const parent = canvas.parentElement;
      W = parent ? parent.clientWidth : window.innerWidth;
      H = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, p.maxDpr);
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = (p.cell - 2) + "px ui-monospace, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      cols = Math.ceil(W / p.cell) + 1;
      rows = Math.ceil(H / p.cell) + 1;
    }

    function draw(elapsed) {
      const p = propsRef.current;
      if (p.background) {
        ctx.fillStyle = p.background;
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
      const driftX = elapsed * p.drift;
      const z = elapsed * p.timeSpeed;
      const px = ((pointerX - 0.5) * p.parallax) / p.cell;
      const py = ((pointerY - 0.5) * p.parallax) / p.cell;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const n = fbm((i + driftX + px) * p.noiseScale, (j + py) * p.noiseScale, z);
          const thr = p.threshold + (cellHash(i, j) - 0.5) * 2 * p.jitter;
          if (n < thr) continue; // empty cell, skip

          const depth = n - thr;
          let ch, alpha;
          if (depth < p.edge) {
            ch = RIM[Math.floor(cellHash(i + 7, j + 3) * RIM.length) % RIM.length];
            alpha = 0.1 + (depth / p.edge) * 0.18;
          } else {
            const a = fbm((i + driftX) * p.flowScale + 50, j * p.flowScale + 50, z * 0.6);
            ch = CHEV[((Math.round(a * 8) % 8) + 8) % 8];
            alpha = 0.3 + Math.min(depth * 2.4, 0.6);
          }
          ctx.fillStyle = "rgba(" + p.color + ", " + alpha.toFixed(3) + ")";
          ctx.fillText(ch, i * p.cell + p.cell / 2, j * p.cell + p.cell / 2);
        }
      }
    }

    function loop(ts) {
      const p = propsRef.current;
      const frame = 1000 / p.fps;
      if (startStamp === null) startStamp = ts;
      if (ts - last >= frame) {
        last = ts;
        draw((ts - startStamp) / 1000);
      }
      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointerY = (e.clientY - rect.top) / Math.max(1, rect.height);
    }

    function onVisibility() {
      if (document.hidden) {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      } else if (!raf && !reduce) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    }

    resize();

    const ro =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(() => {
            resize();
            if (reduce) draw(12);
          })
        : null;
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement);

    if (reduce) {
      draw(12); // one settled static frame
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [noise]); // re-init only when the noise table (seed) changes

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
