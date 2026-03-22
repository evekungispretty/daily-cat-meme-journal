import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { JournalEntry } from '../../types';
import { MOOD_CONFIG } from '../../types';
import { formatDateShort } from '../../utils/storage';

interface EntryCardProps {
  entry: JournalEntry;
  onFavorite?: (id: string) => void;
  index?: number;
  compact?: boolean;
}

const rotations = ['-1.5deg', '1deg', '-0.5deg', '1.5deg', '-1deg', '0.5deg'];

export default function EntryCard({ entry, onFavorite, index = 0, compact = false }: EntryCardProps) {
  const moodConfig = MOOD_CONFIG[entry.mood];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        whileHover={{ rotate: 0, y: -5, boxShadow: '8px 8px 0px #0a0a0a' }}
        className="card relative cursor-pointer"
        style={{ rotate: rotation }}
      >
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavorite?.(entry.id);
          }}
          type="button"
          className="absolute top-2 right-2 z-10 p-1 bg-paper/80 border border-ink hover:bg-yellow transition-colors"
        >
          <Heart
            size={12}
            fill={entry.isFavorite ? '#ff2d20' : 'none'}
            stroke={entry.isFavorite ? '#ff2d20' : '#0a0a0a'}
          />
        </button>

        <Link to={`/journal/${entry.id}`} className="block">
          {/* Meme image */}
          <div className="relative border-b-2 border-ink overflow-hidden" style={{ aspectRatio: '1' }}>
            {entry.sourceImageUrl ? (
              <img
                src={entry.sourceImageUrl}
                alt="cat meme"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-cream flex items-center justify-center">
                <span className="text-4xl">🐱</span>
              </div>
            )}
            {/* Mood badge */}
            <div
              className="absolute bottom-0 left-0 px-2 py-0.5 border-r-2 border-t-2 border-ink font-body text-xs font-semibold bg-paper"
              style={{ backgroundColor: moodConfig.color, color: '#f5f4ef' }}
            >
              {moodConfig.emoji}
            </div>
          </div>

          {/* Card content */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-hand text-muted text-lg">{formatDateShort(entry.date)}</span>
              <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-muted">
                {entry.mood}
              </span>
            </div>
            <h3 className="font-body font-semibold text-sm uppercase tracking-wide line-clamp-1 mb-1">
              {entry.title}
            </h3>
            {!compact && entry.journalText && (
              <p className="font-hand text-muted text-lg leading-snug line-clamp-2">
                {entry.journalText}
              </p>
            )}
            {/* Tags */}
            {!compact && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {entry.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="font-body text-[10px] uppercase tracking-wide text-muted border border-border px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
                {entry.tags.length > 3 && (
                  <span className="font-hand text-lg text-muted">+{entry.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
