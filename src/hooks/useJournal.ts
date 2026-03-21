import { useState, useCallback } from 'react';
import type { JournalEntry } from '../types';
import { getEntries, saveEntry, deleteEntry, toggleFavorite } from '../utils/storage';

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => getEntries());

  const refresh = useCallback(() => {
    setEntries(getEntries());
  }, []);

  const save = useCallback((entry: JournalEntry) => {
    saveEntry(entry);
    setEntries(getEntries());
  }, []);

  const remove = useCallback((id: string) => {
    deleteEntry(id);
    setEntries(getEntries());
  }, []);

  const favorite = useCallback((id: string) => {
    toggleFavorite(id);
    setEntries(getEntries());
  }, []);

  return { entries, refresh, save, remove, favorite };
}
