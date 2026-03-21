import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Mood, Tag, MemeStyle } from '../../types';
import { ALL_TAGS } from '../../types';
import MoodSelector from './MoodSelector';
import Button from '../ui/Button';

interface JournalFormProps {
  onSave: (data: {
    title: string;
    journalText: string;
    mood: Mood;
    tags: Tag[];
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function JournalForm({ onSave, onCancel, isLoading = false }: JournalFormProps) {
  const [title, setTitle] = useState('');
  const [journalText, setJournalText] = useState('');
  const [mood, setMood] = useState<Mood | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    if (!mood) return;
    onSave({
      title: title || 'Untitled entry',
      journalText,
      mood,
      tags: selectedTags,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block font-hand text-sm text-muted mb-1">entry title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="give this day a name..."
          className="input-field"
          maxLength={80}
        />
      </div>

      {/* Journal text */}
      <div>
        <label className="block font-hand text-sm text-muted mb-1">what actually happened today</label>
        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="write whatever. your cat won't judge. (they will a little.)"
          className="textarea-field h-32"
          maxLength={1000}
        />
        <p className="text-right font-hand text-xs text-muted mt-1">{journalText.length}/1000</p>
      </div>

      {/* Mood selector */}
      <MoodSelector selected={mood} onChange={setMood} />

      {/* Tags */}
      <div>
        <p className="font-hand text-muted text-sm mb-3">tag this entry</p>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`
                px-3 py-1 text-xs font-body font-semibold uppercase tracking-widest border-2 transition-all duration-100 cursor-pointer
                ${selectedTags.includes(tag)
                  ? 'bg-ink text-paper border-ink shadow-hard-sm'
                  : 'bg-transparent text-muted border-border hover:border-ink hover:text-ink'
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t-2 border-ink">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!mood || isLoading}
          className="flex-1"
        >
          {isLoading ? 'Saving...' : '★ Save to Journal'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {!mood && (
        <p className="font-hand text-muted text-sm text-center">
          pick a mood to save your entry ↑
        </p>
      )}
    </motion.div>
  );
}
