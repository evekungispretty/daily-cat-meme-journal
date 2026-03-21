import type { MemeStyle } from '../types';
import { STYLE_PRESETS } from '../types';

export function getPreset(style: MemeStyle) {
  return STYLE_PRESETS.find((p) => p.id === style) ?? STYLE_PRESETS[0];
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function drawMeme(
  canvas: HTMLCanvasElement,
  imageSrc: string,
  topText: string,
  bottomText: string,
  style: MemeStyle
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const SIZE = 600;
  canvas.width = SIZE;
  canvas.height = SIZE;

  try {
    const img = await loadImage(imageSrc);
    const preset = getPreset(style);

    // Draw image cover-fit
    ctx.filter = preset.filter;
    const scale = Math.max(SIZE / img.naturalWidth, SIZE / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (SIZE - w) / 2;
    const y = (SIZE - h) / 2;
    ctx.drawImage(img, x, y, w, h);
    ctx.filter = 'none';

    // Text setup
    const fontSize = 52;
    ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 6;
    ctx.lineJoin = 'round';

    const maxWidth = SIZE - 40;

    // Top text
    if (topText.trim()) {
      const lines = wrapText(ctx, topText.toUpperCase(), maxWidth);
      ctx.textBaseline = 'top';
      lines.forEach((line, i) => {
        const lineY = 16 + i * (fontSize + 6);
        ctx.strokeStyle = preset.strokeColor;
        ctx.strokeText(line, SIZE / 2, lineY);
        ctx.fillStyle = preset.textColor;
        ctx.fillText(line, SIZE / 2, lineY);
      });
    }

    // Bottom text
    if (bottomText.trim()) {
      const lines = wrapText(ctx, bottomText.toUpperCase(), maxWidth);
      ctx.textBaseline = 'bottom';
      const totalHeight = lines.length * (fontSize + 6) - 6;
      lines.forEach((line, i) => {
        const lineY = SIZE - 16 - totalHeight + i * (fontSize + 6) + fontSize;
        ctx.strokeStyle = preset.strokeColor;
        ctx.strokeText(line, SIZE / 2, lineY);
        ctx.fillStyle = preset.textColor;
        ctx.fillText(line, SIZE / 2, lineY);
      });
    }
  } catch (err) {
    // Draw error placeholder
    ctx.fillStyle = '#f5f4ef';
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = '#0a0a0a';
    ctx.font = '32px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Could not load image', SIZE / 2, SIZE / 2);
  }
}

export function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  try {
    return canvas.toDataURL('image/jpeg', 0.85);
  } catch {
    return '';
  }
}
