import { MARQUEE_TEXTS } from '../../data/content';

interface MarqueeStripProps {
  inverted?: boolean;
  speed?: 'normal' | 'slow';
}

export default function MarqueeStrip({ inverted = false, speed = 'normal' }: MarqueeStripProps) {
  const text = [...MARQUEE_TEXTS, ...MARQUEE_TEXTS];

  return (
    <div
      className={`overflow-hidden border-y-2 border-ink py-3 ${
        inverted ? 'bg-ink' : 'bg-yellow'
      }`}
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: `marquee ${speed === 'slow' ? '50s' : '30s'} linear infinite`,
          display: 'inline-flex',
        }}
      >
        {text.map((t, i) => (
          <span
            key={i}
            className={`font-display text-lg tracking-widest px-4 ${
              inverted ? 'text-yellow' : 'text-ink'
            }`}
          >
            {t}
          </span>
        ))}
        {text.map((t, i) => (
          <span
            key={`dup-${i}`}
            className={`font-display text-lg tracking-widest px-4 ${
              inverted ? 'text-yellow' : 'text-ink'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
