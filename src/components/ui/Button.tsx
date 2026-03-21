import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'yellow' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary: 'bg-ink text-paper border-ink hover:shadow-hard-lg',
  outline: 'bg-transparent text-ink border-ink hover:bg-ink hover:text-paper hover:shadow-hard-lg',
  yellow: 'bg-yellow text-ink border-ink hover:shadow-hard-lg',
  ghost: 'bg-transparent text-ink border-transparent hover:border-ink hover:shadow-hard-sm',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { y: 0, boxShadow: '2px 2px 0px #0a0a0a' }}
      className={`
        inline-flex items-center justify-center gap-2 font-body font-semibold uppercase tracking-widest
        border-2 shadow-hard transition-colors duration-150 cursor-pointer select-none
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled}
      {...(props as any)}
    />
  );
}
