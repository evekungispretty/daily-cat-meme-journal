import { motion } from 'framer-motion';
import type { MemeStyle } from '../../types';
import { STYLE_PRESETS } from '../../types';

interface StylePresetsProps {
  selected: MemeStyle;
  onChange: (style: MemeStyle) => void;
}

export default function StylePresets({ selected, onChange }: StylePresetsProps) {
  return (
    <div>
      <p className="font-hand text-muted text-lg mb-3">choose your energy</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {STYLE_PRESETS.map((preset) => {
          const isSelected = selected === preset.id;
          return (
            <motion.button
              key={preset.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(preset.id)}
              type="button"
              className={`
                text-left px-3 py-2.5 border-2 transition-all duration-100 cursor-pointer
                ${isSelected
                  ? 'border-ink shadow-hard-sm bg-ink text-paper'
                  : 'border-border hover:border-ink bg-paper text-ink'
                }
              `}
            >
              <div className="font-display text-sm tracking-widest">{preset.label}</div>
              <div className={`font-hand text-lg mt-0.5 ${isSelected ? 'text-paper/70' : 'text-muted'}`}>
                {preset.description}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
