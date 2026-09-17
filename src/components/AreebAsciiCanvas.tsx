'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Terminal, Cpu, Eye, RefreshCw, Layers } from 'lucide-react';

export interface AsciiConfig {
  renderMode:
    | 'dither'
    | 'characters'
    | 'dots'
    | 'matrix'
    | 'cross'
    | 'diamond'
    | 'voxel'
    | 'lego'
    | 'pixel'
    | 'braille'
    | 'hexdump'
    | 'lines'
    | 'hexagons'
    | 'rings'
    | 'bubbles';
  cellSize: number;
  contrast: number;
  brightness: number;
  saturation: number;
  grayscale: number;
  coverage: number;
  density: number;
  invert: boolean;
  edgeEmphasis: number;
  tint: string;
  tintOpacity: number;
  overlayBlend: GlobalCompositeOperation;
  bgMode: 'none' | 'blur' | 'original' | 'solid';
  bgBlur: number;
  bgOpacity: number;
  animated: boolean;
  animStyle: 'shimmer' | 'wave' | 'pulse' | 'ripple' | 'flicker';
  animSpeed: { enabled: boolean; intensity: number };
  animIntensity: { enabled: boolean; intensity: number };
  charSet: 'standard' | 'dense' | 'minimal' | 'binary' | 'matrix' | 'custom';
  customChars?: string;
  pfx: {
    bloom: { enabled: boolean; intensity: number };
    glitch: { enabled: boolean; intensity: number };
    filmDust: { enabled: boolean; intensity: number };
    halftone: { enabled: boolean; intensity: number };
    pixelate: { enabled: boolean; intensity: number };
    vignette: { enabled: boolean; intensity: number };
    chromatic: { enabled: boolean; intensity: number };
    filmGrain: { enabled: boolean; intensity: number };
    scanLines: { enabled: boolean; intensity: number };
  };
  lights: {
    enabled: boolean;
    points: { x: number; y: number; radius: number; intensity: number; color?: string }[];
  };
}

export const DEFAULT_ASCII_CONFIG: AsciiConfig = {
  pfx: {
    bloom: { enabled: false, intensity: 25 },
    glitch: { enabled: false, intensity: 20 },
    filmDust: { enabled: false, intensity: 20 },
    halftone: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    vignette: { enabled: true, intensity: 38 },
    chromatic: { enabled: false, intensity: 15 },
    filmGrain: { enabled: true, intensity: 24 },
    scanLines: { enabled: true, intensity: 28 },
  },
  tint: '#3ca6ff',
  tintOpacity: 0,
  bgBlur: 12,
  bgMode: 'none',
  bgOpacity: 90,
  invert: false,
  lights: { points: [], enabled: false },
  charSet: 'standard',
  density: 20,
  animated: true,
  cellSize: 9,
  contrast: 158,
  coverage: 100,
  brightness: 0,
  saturation: 100,
  grayscale: 0,
  edgeEmphasis: 10,
  renderMode: 'dither',
  overlayBlend: 'source-over',
  animStyle: 'shimmer',
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
};

const CHAR_SETS = {
  standard: ' .:-=+*#%@',
  dense: ' .`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
  minimal: ' .oO@',
  binary: ' 01',
  matrix: ' 0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ',
};

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface AreebAsciiCanvasProps {
  imageSrc: string;
  config?: Partial<AsciiConfig>;
  className?: string;
  allowControls?: boolean;
}

export default function AreebAsciiCanvas({
  imageSrc,
  config: customConfig,
  className = '',
  allowControls = true,
}: AreebAsciiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceImageRef = useRef<HTMLImageElement | null>(null);
  const [config, setConfig] = useState<AsciiConfig>({
    ...DEFAULT_ASCII_CONFIG,
    ...customConfig,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const [revealMode, setRevealMode] = useState(false);
  const animationFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());

  // Matrix rain state
  const matrixDropsRef = useRef<number[]>([]);

  // Load source image
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      sourceImageRef.current = img;
      setIsLoaded(true);
    };
  }, [imageSrc]);

  // Main Render Loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const img = sourceImageRef.current;
    if (!canvas || !img || !isLoaded) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    const now = performance.now();
    const elapsed = (now - startTimeRef.current) / 1000;
    const speedFactor = config.animSpeed.enabled ? (config.animSpeed.intensity / 100) * 1.5 : 0;
    const animTime = elapsed * speedFactor;
    const animStrength = config.animIntensity.enabled ? config.animIntensity.intensity / 100 : 0;

    // Create / use an offscreen canvas to sample the scaled image
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    // Cover fit the source photo into the offscreen canvas
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;
    let drawW = width;
    let drawH = height;
    let drawX = 0;
    let drawY = 0;

    if (imgAspect > canvasAspect) {
      drawW = height * imgAspect;
      drawX = (width - drawW) / 2;
    } else {
      drawH = width / imgAspect;
      drawY = (height - drawH) / 2;
    }

    offCtx.drawImage(img, drawX, drawY, drawW, drawH);

    // 1. Draw Background
    ctx.clearRect(0, 0, width, height);
    if (config.bgMode === 'blur') {
      ctx.save();
      ctx.filter = `blur(${config.bgBlur}px)`;
      ctx.globalAlpha = config.bgOpacity / 100;
      ctx.drawImage(offscreen, 0, 0);
      ctx.restore();
    } else if (config.bgMode === 'original') {
      ctx.save();
      ctx.globalAlpha = config.bgOpacity / 100;
      ctx.drawImage(offscreen, 0, 0);
      ctx.restore();
    } else if (config.bgMode === 'solid') {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, width, height);
    }

    // Get Raw Pixel Data
    const imgData = offCtx.getImageData(0, 0, width, height);
    const pixels = imgData.data;

    // Cell size & Grid calculations
    const cellSize = Math.max(4, config.cellSize);
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    // Initialize matrix drops if needed
    if (config.renderMode === 'matrix' && matrixDropsRef.current.length !== cols) {
      matrixDropsRef.current = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
    }

    // Setup typography for glyph modes
    ctx.font = `bold ${cellSize * 0.95}px "JetBrains Mono", "Space Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Contrast adjustment factor
    const contrastFactor =
      (259 * (config.contrast + 255)) / (255 * (259 - Math.min(254, config.contrast)));
    const brightnessOffset = (config.brightness / 100) * 255;

    const charString =
      config.charSet === 'custom' && config.customChars
        ? config.customChars
        : CHAR_SETS[config.charSet as keyof typeof CHAR_SETS] || CHAR_SETS.standard;

    // 2. Sample and Draw Cells
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Coverage filter
        if (config.coverage < 100 && (col * 17 + row * 23) % 100 >= config.coverage) {
          continue;
        }

        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;

        // Sample center pixel of the cell
        const pxX = Math.min(width - 1, Math.floor(x));
        const pxY = Math.min(height - 1, Math.floor(y));
        const idx = (pxY * width + pxX) * 4;

        let r = pixels[idx];
        let g = pixels[idx + 1];
        let b = pixels[idx + 2];
        const a = pixels[idx + 3] / 255;

        if (a < 0.05) continue;

        // Color adjustments: brightness & contrast
        r = Math.min(255, Math.max(0, contrastFactor * (r - 128 + brightnessOffset) + 128));
        g = Math.min(255, Math.max(0, contrastFactor * (g - 128 + brightnessOffset) + 128));
        b = Math.min(255, Math.max(0, contrastFactor * (b - 128 + brightnessOffset) + 128));

        // Grayscale & Saturation
        let lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (config.grayscale > 0) {
          const grayFactor = config.grayscale / 100;
          r = r * (1 - grayFactor) + lum * grayFactor;
          g = g * (1 - grayFactor) + lum * grayFactor;
          b = b * (1 - grayFactor) + lum * grayFactor;
        }

        if (config.saturation !== 100) {
          const satFactor = config.saturation / 100;
          r = Math.min(255, Math.max(0, lum + (r - lum) * satFactor));
          g = Math.min(255, Math.max(0, lum + (g - lum) * satFactor));
          b = Math.min(255, Math.max(0, lum + (b - lum) * satFactor));
        }

        // Edge emphasis
        if (config.edgeEmphasis > 0 && col < cols - 1 && row < rows - 1) {
          const rightIdx = (pxY * width + Math.min(width - 1, pxX + cellSize)) * 4;
          const downIdx = (Math.min(height - 1, pxY + cellSize) * width + pxX) * 4;
          const lumRight = 0.299 * pixels[rightIdx] + 0.587 * pixels[rightIdx + 1] + 0.114 * pixels[rightIdx + 2];
          const lumDown = 0.299 * pixels[downIdx] + 0.587 * pixels[downIdx + 1] + 0.114 * pixels[downIdx + 2];
          const edgeDelta = Math.abs(lum - lumRight) + Math.abs(lum - lumDown);
          lum = Math.min(255, lum + (edgeDelta * config.edgeEmphasis) / 50);
        }

        // Apply Animation Dynamics
        if (config.animated) {
          let wave = 0;
          if (config.animStyle === 'shimmer') {
            wave = Math.sin(col * 0.35 + animTime * 3.5) * Math.cos(row * 0.35 - animTime * 2.8);
          } else if (config.animStyle === 'wave') {
            wave = Math.sin((col + row) * 0.18 - animTime * 3);
          } else if (config.animStyle === 'pulse') {
            wave = Math.sin(animTime * 4);
          } else if (config.animStyle === 'ripple') {
            const distFromCenter = Math.hypot(col - cols / 2, row - rows / 2);
            wave = Math.sin(distFromCenter * 0.3 - animTime * 4);
          } else if (config.animStyle === 'flicker') {
            wave = (Math.random() - 0.5) * 1.5;
          }
          lum = Math.min(255, Math.max(0, lum + wave * 45 * animStrength));
        }

        // Invert luminance if configured
        const normalizedLum = config.invert ? 1 - lum / 255 : lum / 255;

        // Interactive mouse proximity boost
        if (mousePos.x >= 0 && mousePos.y >= 0) {
          const mDist = Math.hypot(x - mousePos.x, y - mousePos.y);
          if (mDist < 120) {
            const boost = (1 - mDist / 120) * 0.28;
            r = Math.min(255, r * (1 + boost));
            g = Math.min(255, g * (1 + boost));
            b = Math.min(255, b * (1 + boost));
          }
        }

        // Cell Color
        let cellColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;

        // Tint overlay blend
        if (config.tintOpacity > 0) {
          ctx.save();
          ctx.globalAlpha = config.tintOpacity / 100;
          ctx.fillStyle = config.tint;
          ctx.fillRect(x - cellSize / 2, y - cellSize / 2, cellSize, cellSize);
          ctx.restore();
        }

        ctx.fillStyle = cellColor;
        ctx.strokeStyle = cellColor;

        // 3. Render Mode Drawing
        switch (config.renderMode) {
          case 'dither': {
            // Ordered Bayer Matrix Dithering
            const bayerVal = BAYER_4X4[row % 4][col % 4] / 16;
            const threshold = normalizedLum + (bayerVal - 0.5) * 0.45;
            if (threshold > 0.28) {
              const dSize = Math.max(1, cellSize * Math.min(1, threshold * 0.95));
              ctx.fillRect(x - dSize / 2, y - dSize / 2, dSize, dSize);
            }
            break;
          }

          case 'characters': {
            const charIdx = Math.min(
              charString.length - 1,
              Math.floor(normalizedLum * (charString.length - 1))
            );
            const glyph = charString[charIdx] || ' ';
            if (glyph !== ' ') {
              ctx.fillText(glyph, x, y);
            }
            break;
          }

          case 'dots': {
            const radius = (cellSize / 2) * normalizedLum * 0.92;
            if (radius > 0.5) {
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fill();
            }
            break;
          }

          case 'cross': {
            const crossSize = (cellSize / 2) * normalizedLum * 0.9;
            if (crossSize > 1) {
              ctx.lineWidth = Math.max(1, cellSize * 0.18 * normalizedLum);
              ctx.beginPath();
              ctx.moveTo(x - crossSize, y);
              ctx.lineTo(x + crossSize, y);
              ctx.moveTo(x, y - crossSize);
              ctx.lineTo(x, y + crossSize);
              ctx.stroke();
            }
            break;
          }

          case 'diamond': {
            const dRad = (cellSize / 2) * normalizedLum * 0.88;
            if (dRad > 0.5) {
              ctx.beginPath();
              ctx.moveTo(x, y - dRad);
              ctx.lineTo(x + dRad, y);
              ctx.lineTo(x, y + dRad);
              ctx.lineTo(x - dRad, y);
              ctx.closePath();
              ctx.fill();
            }
            break;
          }

          case 'voxel':
          case 'lego': {
            const blockSize = cellSize * 0.88;
            ctx.fillStyle = `rgb(${Math.floor(r * 0.75)}, ${Math.floor(g * 0.75)}, ${Math.floor(b * 0.75)})`;
            ctx.fillRect(x - blockSize / 2, y - blockSize / 2, blockSize, blockSize);
            ctx.fillStyle = cellColor;
            ctx.fillRect(x - blockSize / 2 + 1, y - blockSize / 2 + 1, blockSize - 2, blockSize - 2);

            if (config.renderMode === 'lego' && normalizedLum > 0.3) {
              ctx.beginPath();
              ctx.arc(x, y, blockSize * 0.22, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255,255,255,0.45)`;
              ctx.fill();
            }
            break;
          }

          case 'matrix': {
            const dropPos = matrixDropsRef.current[col] || 0;
            const distFromHead = row - dropPos;
            if (distFromHead >= 0 && distFromHead < 16) {
              const glyph =
                CHAR_SETS.matrix[Math.floor(Math.random() * (CHAR_SETS.matrix.length - 1)) + 1];
              if (distFromHead === 0) {
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 8;
              } else {
                const fade = 1 - distFromHead / 16;
                ctx.fillStyle = `rgba(0, ${Math.floor(200 + fade * 55)}, ${Math.floor(100 + fade * 100)}, ${fade * normalizedLum})`;
                ctx.shadowBlur = 0;
              }
              ctx.fillText(glyph, x, y);
              ctx.shadowBlur = 0;
            }
            break;
          }

          case 'hexdump': {
            if (normalizedLum > 0.15) {
              const hexVal = Math.floor(normalizedLum * 255)
                .toString(16)
                .toUpperCase()
                .padStart(2, '0');
              ctx.font = `${cellSize * 0.75}px monospace`;
              ctx.fillText(hexVal, x, y);
            }
            break;
          }

          case 'hexagons': {
            const hRad = (cellSize / 2) * normalizedLum * 0.92;
            if (hRad > 0.8) {
              ctx.beginPath();
              for (let a = 0; a < 6; a++) {
                const angle = (Math.PI / 3) * a;
                const hx = x + hRad * Math.cos(angle);
                const hy = y + hRad * Math.sin(angle);
                if (a === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
              }
              ctx.closePath();
              ctx.fill();
            }
            break;
          }

          case 'lines': {
            const lineH = cellSize * normalizedLum * 0.9;
            if (lineH > 0.5) {
              ctx.lineWidth = Math.max(1, cellSize * 0.15);
              ctx.beginPath();
              ctx.moveTo(x - cellSize / 2 + 1, y);
              ctx.lineTo(x + cellSize / 2 - 1, y);
              ctx.stroke();
            }
            break;
          }

          case 'pixel':
          default: {
            const pSize = cellSize * 0.92;
            ctx.fillRect(x - pSize / 2, y - pSize / 2, pSize, pSize);
            break;
          }
        }
      }
    }

    // Update matrix rain positions
    if (config.renderMode === 'matrix') {
      matrixDropsRef.current = matrixDropsRef.current.map((drop) => {
        if (drop > rows + 15 || Math.random() < 0.02) {
          return Math.floor(Math.random() * -20);
        }
        return drop + 0.65;
      });
    }

    // 4. Post-Processing Effects (PFX)
    // Scanlines
    if (config.pfx.scanLines.enabled) {
      const scanAlpha = config.pfx.scanLines.intensity / 400;
      ctx.fillStyle = `rgba(0, 0, 0, ${scanAlpha})`;
      for (let y = 0; y < height; y += 3) {
        ctx.fillRect(0, y, width, 1.5);
      }
    }

    // Vignette
    if (config.pfx.vignette.enabled) {
      const vigAlpha = config.pfx.vignette.intensity / 100;
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.hypot(width, height) * 0.55
      );
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, `rgba(5, 5, 10, ${vigAlpha * 0.95})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Film Grain
    if (config.pfx.filmGrain.enabled) {
      const grainIntensity = (config.pfx.filmGrain.intensity / 100) * 0.08;
      const grainCount = (width * height) / 90;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < grainCount; i++) {
        const gx = Math.random() * width;
        const gy = Math.random() * height;
        ctx.globalAlpha = Math.random() * grainIntensity;
        ctx.fillRect(gx, gy, 1, 1);
      }
      ctx.globalAlpha = 1.0;
    }

    // Optional Glitch slice
    if (config.pfx.glitch.enabled && Math.random() < (config.pfx.glitch.intensity / 100) * 0.15) {
      const sliceY = Math.random() * (height - 30);
      const sliceH = Math.random() * 20 + 5;
      const offset = (Math.random() - 0.5) * 16;
      ctx.drawImage(canvas, 0, sliceY, width, sliceH, offset, sliceY, width, sliceH);
    }

    // Request next frame
    animationFrameRef.current = requestAnimationFrame(render);
  }, [config, isLoaded, mousePos]);

  // Start & handle render loop
  useEffect(() => {
    if (isLoaded) {
      animationFrameRef.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isLoaded, render]);

  // Sync canvas size with container
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
  }, []);

  useEffect(() => {
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);
    return () => window.removeEventListener('resize', updateCanvasDimensions);
  }, [updateCanvasDimensions]);

  // Mouse interaction
  const handlePointerMove = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    setMousePos({
      x: (e.clientX - rect.left) * dpr,
      y: (e.clientY - rect.top) * dpr,
    });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: -1, y: -1 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-[24px] bg-[#07070d] ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
    >
      {/* 2D Canvas Target */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          revealMode ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Raw Reveal View (press or toggle) */}
      {revealMode && sourceImageRef.current && (
        <img
          src={imageSrc}
          alt="Original portrait"
          className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
        />
      )}

      {/* Quick Interactive Mode Bar */}
      {allowControls && (
        <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-auto">
          {/* Active Preset Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 text-[11px] font-mono text-white shadow-lg">
            <Terminal size={12} className="text-white" />
            <span className="uppercase tracking-wider font-semibold">
              {config.renderMode}
            </span>
            <span className="text-white/30">|</span>
            <span className="text-white/70">{config.cellSize}px</span>
          </div>

          {/* Mode Switchers */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 shadow-xl">
            {(['dither', 'characters', 'matrix', 'dots', 'hexagons'] as const).map((mode) => (
              <button
                key={mode}
                onClick={(e) => {
                  e.stopPropagation();
                  setConfig((prev) => ({ ...prev, renderMode: mode }));
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  config.renderMode === mode
                    ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={`Switch to ${mode} mode`}
              >
                {mode === 'characters' ? 'ASCII' : mode}
              </button>
            ))}

            {/* Toggle Raw Photo Reveal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRevealMode((prev) => !prev);
              }}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                revealMode ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={revealMode ? 'Switch to ASCII Art' : 'Peek Original Photo'}
            >
              <Eye size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
