import { useRef, useEffect, useCallback, useState } from 'react';
import type { MemeStyle } from '../../types';
import { drawMeme, canvasToDataUrl } from '../../utils/memeCanvas';
import { getPreset } from '../../utils/memeCanvas';

interface MemeCanvasProps {
  imageSrc: string;
  topText: string;
  bottomText: string;
  style: MemeStyle;
  onCanvasReady?: (dataUrl: string) => void;
}

export default function MemeCanvas({
  imageSrc,
  topText,
  bottomText,
  style,
  onCanvasReady,
}: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const redraw = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    setIsDrawing(true);
    await drawMeme(canvas, imageSrc, topText, bottomText, style);
    setIsDrawing(false);

    if (onCanvasReady) {
      const dataUrl = canvasToDataUrl(canvas);
      onCanvasReady(dataUrl);
    }
  }, [imageSrc, topText, bottomText, style, onCanvasReady]);

  useEffect(() => {
    const timer = setTimeout(redraw, 100);
    return () => clearTimeout(timer);
  }, [redraw]);

  const preset = getPreset(style);

  return (
    <div className="relative">
      {/* Canvas wrapper with hard shadow */}
      <div
        className="relative border-2 border-ink overflow-hidden bg-border"
        style={{ boxShadow: `6px 6px 0px ${preset.accentColor}` }}
      >
        <canvas
          ref={canvasRef}
          className="block w-full aspect-square"
          style={{ maxWidth: '100%' }}
        />
        {/* Loading overlay */}
        {isDrawing && (
          <div className="absolute inset-0 bg-paper/80 flex items-center justify-center">
            <span className="font-hand text-muted text-lg animate-pulse">drawing...</span>
          </div>
        )}
        {/* Empty state */}
        {!imageSrc && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream gap-3">
            <span className="text-5xl">🐱</span>
            <span className="font-hand text-muted text-lg text-center px-4">
              pick a cat up there to start your meme
            </span>
          </div>
        )}
      </div>
      {/* Style label */}
      {imageSrc && (
        <div
          className="absolute -bottom-3 left-4 px-3 py-0.5 font-display text-sm border-2 border-ink bg-paper"
          style={{ color: preset.accentColor === '#f5f4ef' ? '#0a0a0a' : preset.accentColor }}
        >
          {preset.label}
        </div>
      )}
    </div>
  );
}
