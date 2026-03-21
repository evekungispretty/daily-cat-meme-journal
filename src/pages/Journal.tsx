import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, AlignJustify, Heart } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import EntryCard from '../components/journal/EntryCard';
import MarqueeStrip from '../components/home/MarqueeStrip';
import { StarDoodle, FloatingSticker, StampFrame } from '../components/doodles/Doodles';
import { useJournal } from '../hooks/useJournal';
import { getStreak } from '../utils/storage';
import type { Mood } from '../types';
import { MOOD_CONFIG } from '../types';

type ViewMode = 'grid' | 'list';
type FilterMood = Mood | 'all' | 'favorites';

export default function Journal() {
  const { entries, favorite } = useJournal();
  const [view, setView] = useState<ViewMode>('grid');
  const [filterMood, setFilterMood] = useState<FilterMood>('all');
  const streak = getStreak();

  const moods = Object.entries(MOOD_CONFIG) as [Mood, typeof MOOD_CONFIG[Mood]][];

  const filtered = entries.filter((e) => {
    if (filterMood === 'all') return true;
    if (filterMood === 'favorites') return e.isFavorite;
    return e.mood === filterMood;
  });

  const isEmpty = entries.length === 0;

  return (
    <PageTransition>
      {/* Header */}
      <div className="border-b-2 border-ink">
        <div className="px-6 sm:px-10 lg:px-16 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="font-hand text-muted text-lg mb-1">— your emotional cat meme archive</p>
                <h1 className="font-display text-5xl sm:text-7xl tracking-wide">MY JOURNAL</h1>
              </div>
              <div className="flex flex-col items-end gap-2">
                <FloatingSticker delay={0}>
                  <StarDoodle size={28} color="#ffe500" />
                </FloatingSticker>
                <StampFrame
                  label={streak > 0 ? `${streak} DAY STREAK` : 'START TODAY'}
                  color={streak > 0 ? '#ff2d20' : '#0047ff'}
                />
              </div>
            </div>

            {/* Stats bar */}
            {!isEmpty && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-6 mt-8 pt-6 border-t-2 border-ink"
              >
                <div>
                  <p className="font-display text-3xl">{entries.length}</p>
                  <p className="font-hand text-muted text-sm">total entries</p>
                </div>
                <div>
                  <p className="font-display text-3xl">{streak}</p>
                  <p className="font-hand text-muted text-sm">day streak</p>
                </div>
                <div>
                  <p className="font-display text-3xl">{entries.filter((e) => e.isFavorite).length}</p>
                  <p className="font-hand text-muted text-sm">favorites</p>
                </div>
                <div>
                  <p className="font-display text-3xl">
                    {entries.length > 0 ? MOOD_CONFIG[
                      Object.entries(
                        entries.reduce((acc, e) => {
                          acc[e.mood] = (acc[e.mood] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).sort(([, a], [, b]) => b - a)[0][0] as Mood
                    ]?.emoji : '—'}
                  </p>
                  <p className="font-hand text-muted text-sm">top mood</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Filter + view controls */}
        {!isEmpty && (
          <div className="border-t-2 border-ink px-6 sm:px-10 lg:px-16 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
              {/* Mood filters */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilterMood('all')}
                  type="button"
                  className={`px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest border-2 transition-all duration-100 cursor-pointer ${
                    filterMood === 'all' ? 'bg-ink text-paper border-ink' : 'border-border text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterMood('favorites')}
                  type="button"
                  className={`px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest border-2 transition-all duration-100 cursor-pointer flex items-center gap-1 ${
                    filterMood === 'favorites' ? 'bg-red text-paper border-red' : 'border-border text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  <Heart size={10} fill={filterMood === 'favorites' ? 'white' : 'none'} />
                  Favorites
                </button>
                {moods.map(([mood, config]) => (
                  <button
                    key={mood}
                    onClick={() => setFilterMood(mood)}
                    type="button"
                    className={`px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest border-2 transition-all duration-100 cursor-pointer ${
                      filterMood === mood ? 'text-paper border-ink' : 'border-border text-muted hover:border-ink hover:text-ink'
                    }`}
                    style={filterMood === mood ? { backgroundColor: config.color, borderColor: '#0a0a0a' } : {}}
                  >
                    {config.emoji} {config.label}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex border-2 border-ink">
                <button
                  onClick={() => setView('grid')}
                  type="button"
                  className={`p-2 transition-colors ${view === 'grid' ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setView('list')}
                  type="button"
                  className={`p-2 border-l-2 border-ink transition-colors ${view === 'list' ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
                >
                  <AlignJustify size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isEmpty ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-8xl"
            >
              📔
            </motion.div>
            <div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-wide mb-3">YOUR JOURNAL AWAITS</h2>
              <p className="font-hand text-muted text-xl max-w-sm mx-auto leading-relaxed">
                No entries yet. Your cat has been living rent-free in your space. It's time they earn their keep.
              </p>
            </div>
            <Link to="/generate" className="btn-yellow">
              ✦ Generate Your First Meme
            </Link>
          </motion.div>
        ) : filtered.length === 0 ? (
          /* No results */
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center gap-4">
            <span className="text-5xl">🔍</span>
            <p className="font-hand text-muted text-xl">No entries matching this filter.</p>
            <button
              onClick={() => setFilterMood('all')}
              type="button"
              className="btn-outline"
            >
              Clear filter
            </button>
          </div>
        ) : view === 'grid' ? (
          /* Grid view */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filtered.map((entry, i) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onFavorite={favorite}
                index={i}
              />
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-3">
            {filtered.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
              >
                <Link
                  to={`/journal/${entry.id}`}
                  className="flex gap-4 border-2 border-ink p-4 hover:shadow-hard hover:-translate-y-0.5 transition-all duration-150 bg-cream"
                >
                  <div className="w-20 h-20 shrink-0 border-2 border-ink overflow-hidden">
                    {entry.memeImageDataUrl ? (
                      <img src={entry.memeImageDataUrl} alt="meme" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-border flex items-center justify-center">
                        <span>🐱</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-hand text-muted text-sm">{entry.date}</span>
                      <span className="font-body text-xs uppercase tracking-widest text-muted">
                        {MOOD_CONFIG[entry.mood]?.emoji} {entry.mood}
                      </span>
                    </div>
                    <h3 className="font-body font-semibold text-sm uppercase tracking-wide mb-1 truncate">{entry.title}</h3>
                    <p className="font-hand text-muted text-base line-clamp-1">{entry.journalText}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {!isEmpty && (
        <div className="border-t-2 border-ink py-6 px-6 text-center">
          <Link to="/generate" className="btn-primary">
            + Add Today's Entry
          </Link>
        </div>
      )}

      <MarqueeStrip inverted />
    </PageTransition>
  );
}
