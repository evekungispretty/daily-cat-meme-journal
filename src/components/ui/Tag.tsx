interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  color?: string;
  size?: 'sm' | 'md';
}

export default function Tag({ label, selected = false, onClick, color, size = 'md' }: TagProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs';

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        ${sizeClass} font-body font-semibold uppercase tracking-widest border-2 transition-all duration-100 cursor-pointer select-none
        ${selected
          ? 'bg-ink text-paper border-ink shadow-hard-sm'
          : 'bg-transparent text-muted border-border hover:border-ink hover:text-ink'
        }
      `}
      style={selected && color ? { backgroundColor: color, borderColor: color, color: '#f5f4ef' } : undefined}
    >
      {label}
    </button>
  );
}
