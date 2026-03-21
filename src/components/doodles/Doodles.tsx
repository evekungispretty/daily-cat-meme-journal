import { motion } from 'framer-motion';

export function StarDoodle({ size = 32, color = '#0a0a0a', className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      animate={{ rotate: [0, 15, -10, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M16 2 L17.5 12.5 L28 16 L17.5 19.5 L16 30 L14.5 19.5 L4 16 L14.5 12.5 Z"
        stroke={color}
        strokeWidth="2"
        fill={color}
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function ArrowDoodle({ color = '#0a0a0a', className = '' }) {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className={className}>
      <path
        d="M2 20 C10 18, 30 10, 50 20 M42 12 L52 20 L42 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ScribbleUnderline({ color = '#ffe500', className = '' }) {
  return (
    <svg width="100%" height="12" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" className={className}>
      <path
        d="M2 6 C30 2, 60 10, 90 6 C120 2, 150 10, 200 5"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function CircleScribble({ color = '#0a0a0a', className = '' }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className={className}>
      <path
        d="M40 8 C62 8, 74 22, 74 40 C74 58, 60 72, 40 72 C20 72, 6 58, 8 40 C10 22, 26 6, 44 10"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function StampFrame({ label, color = '#ff2d20', className = '' }: { label: string; color?: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ delay: 0.5, duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
      className={`inline-block border-4 px-3 py-1 font-display text-xl tracking-widest select-none ${className}`}
      style={{ borderColor: color, color }}
    >
      {label}
    </motion.div>
  );
}

export function WavyLine({ color = '#0a0a0a', className = '' }) {
  return (
    <svg width="100%" height="16" viewBox="0 0 300 16" preserveAspectRatio="none" fill="none" className={className}>
      <path
        d="M0 8 C25 2, 50 14, 75 8 C100 2, 125 14, 150 8 C175 2, 200 14, 225 8 C250 2, 275 14, 300 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function CatFaceDoodle({ size = 48, className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Head */}
      <path d="M8 34 C8 20, 16 8, 24 8 C32 8, 40 20, 40 34 C40 42, 8 42, 8 34 Z" stroke="#0a0a0a" strokeWidth="2" fill="none" strokeLinejoin="round" />
      {/* Ears */}
      <path d="M8 24 L4 10 L14 18" stroke="#0a0a0a" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="M40 24 L44 10 L34 18" stroke="#0a0a0a" strokeWidth="2" fill="none" strokeLinejoin="round" />
      {/* Eyes */}
      <ellipse cx="18" cy="27" rx="3" ry="2" fill="#0a0a0a" />
      <ellipse cx="30" cy="27" rx="3" ry="2" fill="#0a0a0a" />
      {/* Nose */}
      <path d="M22 32 L24 30 L26 32 L24 34 Z" fill="#0a0a0a" />
      {/* Whiskers */}
      <path d="M4 30 L16 32 M4 34 L16 34" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 30 L32 32 M44 34 L32 34" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
}

export function DoodleCorner({ className = '' }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={className}>
      <path d="M2 2 L20 2 M2 2 L2 20" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 8 L14 8 M8 8 L8 14" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function FloatingSticker({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0], rotate: [0, 2, -1, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}
