import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Download, Trash2, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import PageTransition from '../components/layout/PageTransition';
import { getEntries, getEntryById, toggleFavorite, deleteEntry, formatDate } from '../utils/storage';
import { MOOD_CONFIG } from '../types';
import Button from '../components/ui/Button';
import MemeCanvas from '../components/meme/MemeCanvas';

export default function EntryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(() => getEntryById(id ?? '')?.isFavorite ?? false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memeDataUrl, setMemeDataUrl] = useState('');
  const handleCanvasReady = useCallback((dataUrl: string) => setMemeDataUrl(dataUrl), []);

  const entries = getEntries();
  const entryIndex = entries.findIndex((e) => e.id === id);
  const entry = entries[entryIndex];

  const prevEntry = entries[entryIndex + 1];
  const nextEntry = entries[entryIndex - 1];

  if (!entry) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="text-6xl">🫠</span>
          <h2 className="font-display text-4xl tracking-wide">ENTRY NOT FOUND</h2>
          <p className="font-hand text-muted text-lg">This entry has vanished. Like your cat at bath time.</p>
          <Link to="/journal" className="btn-primary">← Back to Journal</Link>
        </div>
      </PageTransition>
    );
  }

  const moodConfig = MOOD_CONFIG[entry.mood];

  const handleFavorite = () => {
    toggleFavorite(entry.id);
    setIsFav((v) => !v);
  };

  const handleDelete = () => {
    deleteEntry(entry.id);
    navigate('/journal');
  };

  const downloadMeme = () => {
    if (!memeDataUrl) return;
    const a = document.createElement('a');
    a.href = memeDataUrl;
    a.download = `cat-meme-${entry.date}.jpg`;
    a.click();
  };

  return (
    <PageTransition>
      {/* Top bar */}
      <div className="border-b-2 border-ink px-4 sm:px-8 py-3 flex items-center justify-between sticky top-14 z-40 bg-paper">
        <Link
          to="/journal"
          className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Journal
        </Link>

        <div className="flex items-center gap-2">
          {/* Prev / Next */}
          {nextEntry && (
            <Link
              to={`/journal/${nextEntry.id}`}
              className="p-2 border-2 border-border hover:border-ink transition-colors"
            >
              <ArrowLeft size={14} />
            </Link>
          )}
          {prevEntry && (
            <Link
              to={`/journal/${prevEntry.id}`}
              className="p-2 border-2 border-border hover:border-ink transition-colors"
            >
              <ArrowRight size={14} />
            </Link>
          )}
          <span className="font-hand text-muted text-lg ml-1">
            {entryIndex + 1} / {entries.length}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFavorite}
            type="button"
            className="p-2 border-2 border-border hover:border-red transition-colors"
          >
            <Heart
              size={14}
              fill={isFav ? '#ff2d20' : 'none'}
              stroke={isFav ? '#ff2d20' : '#0a0a0a'}
            />
          </button>
          <button
            onClick={downloadMeme}
            type="button"
            className="p-2 border-2 border-border hover:border-ink transition-colors"
          >
            <Download size={14} />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            type="button"
            className="p-2 border-2 border-border hover:border-red transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Meme */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Date stamp */}
              <div className="absolute -top-4 -left-2 z-10">
                <div
                  className="font-display text-sm px-3 py-1 border-2 border-ink bg-paper shadow-hard-sm"
                  style={{ rotate: '-3deg' }}
                >
                  {formatDate(entry.date)}
                </div>
              </div>

              {/* Meme image */}
              <div
                className="border-2 border-ink overflow-hidden"
                style={{ boxShadow: `6px 6px 0px ${moodConfig.color}` }}
              >
                {entry.sourceImageUrl ? (
                  <MemeCanvas
                    imageSrc={entry.sourceImageUrl}
                    topText={entry.topText}
                    bottomText={entry.bottomText}
                    style={entry.style}
                    onCanvasReady={handleCanvasReady}
                  />
                ) : (
                  <div className="w-full aspect-square bg-cream flex items-center justify-center">
                    <span className="text-6xl">🐱</span>
                  </div>
                )}
              </div>

              {/* Meme caption labels */}
              {(entry.topText || entry.bottomText) && (
                <div className="mt-3 border-2 border-ink p-3 bg-cream">
                  {entry.topText && (
                    <p className="font-display text-lg tracking-wide">{entry.topText.toUpperCase()}</p>
                  )}
                  {entry.bottomText && (
                    <p className="font-hand text-lg text-muted">{entry.bottomText}</p>
                  )}
                </div>
              )}

              {/* Style badge */}
              <div className="mt-2 inline-block border-2 border-ink px-3 py-1 font-display text-sm bg-paper">
                Style: {entry.style.toUpperCase()}
              </div>
            </div>
          </motion.div>

          {/* Right: Journal entry */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Mood */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-4 py-2 border-2 border-ink"
                style={{ backgroundColor: moodConfig.color }}
              >
                <span className="text-2xl">{moodConfig.emoji}</span>
                <span className="font-display text-xl tracking-wide text-paper">{moodConfig.label.toUpperCase()}</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <p className="font-hand text-muted text-lg mb-1">— {formatDate(entry.date)}</p>
              <h1 className="font-display text-4xl sm:text-5xl tracking-wide leading-tight">
                {entry.title}
              </h1>
            </div>

            {/* Journal text */}
            {entry.journalText ? (
              <div className="border-l-4 border-yellow pl-4">
                <p className="font-hand text-lg leading-relaxed text-ink whitespace-pre-wrap">
                  {entry.journalText}
                </p>
              </div>
            ) : (
              <p className="font-hand text-muted text-lg italic">No journal entry written for this day.</p>
            )}

            {/* Tags */}
            {entry.tags.length > 0 && (
              <div>
                <p className="font-hand text-muted text-lg mb-2">tagged as</p>
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest border-2 border-ink bg-paper"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-4 border-t-2 border-ink">
              <div className="grid grid-cols-2 gap-3">
                {nextEntry ? (
                  <Link
                    to={`/journal/${nextEntry.id}`}
                    className="btn-outline text-xs justify-center"
                  >
                    ← Older Entry
                  </Link>
                ) : <div />}
                {prevEntry ? (
                  <Link
                    to={`/journal/${prevEntry.id}`}
                    className="btn-outline text-xs justify-center"
                  >
                    Newer Entry →
                  </Link>
                ) : <div />}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-paper border-2 border-ink shadow-hard-lg p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute top-4 right-4 text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
            <span className="text-4xl block mb-4">😿</span>
            <h3 className="font-display text-2xl tracking-wide mb-2">DELETE THIS ENTRY?</h3>
            <p className="font-hand text-muted text-lg mb-6">
              This will permanently remove this meme and journal entry. Your cat will pretend not to care.
            </p>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleDelete}
                className="flex-1 !bg-red !border-red"
              >
                Delete
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </PageTransition>
  );
}
