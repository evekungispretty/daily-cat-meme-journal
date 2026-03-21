import { motion } from 'framer-motion';
import type { Mood } from '../../types';
import { MOOD_CONFIG } from '../../types';

interface MoodSelectorProps {
  selected: Mood | null;
  onChange: (mood: Mood) => void;
  label?: string;
}

const moods = Object.entries(MOOD_CONFIG) as [Mood, typeof MOOD_CONFIG[Mood]][];

export default function MoodSelector({ selected, onChange, label = "today's mood" }: MoodSelectorProps) {
  return (
    <div>
      <p className="font-hand text-muted text-sm mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {moods.map(([mood, config]) => {
          const isSelected = selected === mood;
          return (
            <motion.button
              key={mood}
              whileTap={{ scale: 0.92 }}
              onClick={() => onChange(mood)}
              type="button"
              className={`
                flex flex-col items-center gap-1 px-3 py-2 border-2 transition-all duration-100 cursor-pointer min-w-[60px]
                ${isSelected
                  ? 'border-ink shadow-hard-sm'
                  : 'border-border hover:border-ink'
                }
              `}
              style={isSelected ? { backgroundColor: config.color, borderColor: '#0a0a0a' } : {}}
            >
              <span className="text-xl leading-none">{config.emoji}</span>
              <span
                className={`font-body text-[10px] font-semibold uppercase tracking-wide ${
                  isSelected ? 'text-paper' : 'text-muted'
                }`}
              >
                {config.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
