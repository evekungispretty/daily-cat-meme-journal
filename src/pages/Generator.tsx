import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, RefreshCw, Download, Shuffle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import MemeCanvas from '../components/meme/MemeCanvas';
import StylePresets from '../components/meme/StylePresets';
import JournalForm from '../components/journal/JournalForm';
import Button from '../components/ui/Button';
import { StarDoodle, StampFrame, FloatingSticker } from '../components/doodles/Doodles';
import type { MemeStyle, Mood, Tag } from '../types';
import { SAMPLE_CATS } from '../types';
import { CAPTION_SUGGESTIONS, CAT_HOROSCOPES } from '../data/content';
import { generateId, getTodayDate } from '../utils/storage';
import { saveEntry } from '../utils/storage';
import { canvasToDataUrl } from '../utils/memeCanvas';

export default function Generator() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [style, setStyle] = useState<MemeStyle>('existential');
  const [currentMemeDataUrl, setCurrentMemeDataUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [horoscope] = useState(() => CAT_HOROSCOPES[Math.floor(Math.random() * CAT_HOROSCOPES.length)]);
  const [dragOver, setDragOver] = useState(false);
  const [isLoadingWebCat, setIsLoadingWebCat] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      setSelectedSampleId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const handleSampleSelect = (sample: typeof SAMPLE_CATS[0]) => {
    setSelectedImage(sample.url);
    setSelectedSampleId(sample.id);
    if (!topText && !bottomText) {
      setTopText(sample.defaultTop);
      setBottomText(sample.defaultBottom);
    }
  };

  const randomCaption = () => {
    const pick = CAPTION_SUGGESTIONS[Math.floor(Math.random() * CAPTION_SUGGESTIONS.length)];
    setTopText(pick.top);
    setBottomText(pick.bottom);
  };

  const randomSample = async () => {
    setIsLoadingWebCat(true);
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search');
      const [data] = await res.json();
      setSelectedImage(data.url);
      setSelectedSampleId(null);
    } catch {
      // fallback to local samples if fetch fails
      const pick = SAMPLE_CATS[Math.floor(Math.random() * SAMPLE_CATS.length)];
      handleSampleSelect(pick);
    } finally {
      setIsLoadingWebCat(false);
    }
  };

  const handleCanvasReady = useCallback((dataUrl: string) => {
    setCurrentMemeDataUrl(dataUrl);
  }, []);

  const downloadMeme = () => {
    if (!currentMemeDataUrl) return;
    const a = document.createElement('a');
    a.href = currentMemeDataUrl;
    a.download = `cat-meme-${getTodayDate()}.jpg`;
    a.click();
  };

  const handleSave = async (formData: { title: string; journalText: string; mood: Mood; tags: Tag[] }) => {
    if (!currentMemeDataUrl) return;
    setIsSaving(true);

    const entry = {
      id: generateId(),
      date: getTodayDate(),
      createdAt: Date.now(),
      memeImageDataUrl: currentMemeDataUrl,
      sourceImageUrl: selectedImage,
      topText,
      bottomText,
      style,
      title: formData.title,
      journalText: formData.journalText,
      mood: formData.mood,
      tags: formData.tags,
      isFavorite: false,
    };

    saveEntry(entry);
    setIsSaving(false);
    setSaved(true);

    setTimeout(() => {
      navigate('/journal');
    }, 1200);
  };

  if (saved) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="text-8xl"
          >
            😺
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="font-display text-5xl tracking-wide mb-2">SAVED!</h2>
            <p className="font-hand text-muted text-xl">Adding to your journal...</p>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="border-b-2 border-ink">
        {/* Page header */}
        <div className="border-b-2 border-ink px-6 sm:px-10 lg:px-16 py-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
            <div>
              <p className="font-hand text-muted text-lg mb-1">— make something good today</p>
              <h1 className="font-display text-5xl sm:text-7xl tracking-wide">GENERATOR</h1>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2">
              <FloatingSticker delay={0}>
                <StarDoodle size={28} color="#ffe500" />
              </FloatingSticker>
              <StampFrame label="TODAY" color="#0047ff" />
            </div>
          </div>
        </div>

        {/* Cat horoscope strip */}
        <div className="border-b-2 border-ink bg-yellow/30 px-6 sm:px-10 lg:px-16 py-3">
          <div className="max-w-7xl mx-auto flex items-start gap-3">
            <span className="font-display text-sm tracking-widest shrink-0 mt-0.5">★ CAT HOROSCOPE:</span>
            <p className="font-hand text-lg text-ink leading-relaxed">{horoscope}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Controls */}
          <div className="space-y-8">
            {/* Step 1: Image selection */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-4xl text-border">01</span>
                <h2 className="font-display text-2xl tracking-wide">PICK YOUR CAT</h2>
              </div>

              {/* Upload zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-150 mb-4
                  ${dragOver
                    ? 'border-ink bg-yellow/20'
                    : 'border-border hover:border-ink hover:bg-cream'
                  }
                `}
              >
                <Upload size={24} className="mx-auto mb-2 text-muted" />
                <p className="font-body text-sm font-semibold uppercase tracking-widest text-muted">
                  Drop or click to upload
                </p>
                <p className="font-hand text-lg text-muted mt-1">your cat photo goes here</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </div>

              {/* Sample cats */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-hand text-muted text-lg">or choose a sample cat</p>
                  <button
                    onClick={randomSample}
                    type="button"
                    disabled={isLoadingWebCat}
                    className="flex items-center gap-1 font-body text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={10} className={isLoadingWebCat ? 'animate-spin' : ''} />
                    {isLoadingWebCat ? 'Loading...' : 'Random'}
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {SAMPLE_CATS.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSampleSelect(cat)}
                      type="button"
                      className={`
                        relative aspect-square border-2 overflow-hidden transition-all duration-100
                        ${selectedSampleId === cat.id
                          ? 'border-ink shadow-hard-sm'
                          : 'border-border hover:border-ink'
                        }
                      `}
                    >
                      <img
                        src={cat.url}
                        alt={cat.label}
                        className="w-full h-full object-cover"
                      />
                      {selectedSampleId === cat.id && (
                        <div className="absolute inset-0 bg-yellow/30 flex items-center justify-center">
                          <span className="text-lg">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-4xl text-border">02</span>
                <h2 className="font-display text-2xl tracking-wide">ADD YOUR WORDS</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-hand text-lg text-muted mb-1">top text</label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="ME AT 9AM"
                    className="input-field"
                    maxLength={60}
                  />
                </div>
                <div>
                  <label className="block font-hand text-sm text-muted mb-1">bottom text</label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="also me at 9:05am"
                    className="input-field"
                    maxLength={60}
                  />
                </div>

                <button
                  onClick={randomCaption}
                  type="button"
                  className="flex items-center gap-2 font-body text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors border border-border hover:border-ink px-3 py-2 w-full justify-center"
                >
                  <Shuffle size={12} />
                  Generate random caption idea
                </button>
              </div>
            </div>

            {/* Step 3: Style */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-4xl text-border">03</span>
                <h2 className="font-display text-2xl tracking-wide">PICK A STYLE</h2>
              </div>
              <StylePresets selected={style} onChange={setStyle} />
            </div>
          </div>

          {/* Right: Preview + save */}
          <div className="space-y-6">
            {/* Canvas preview */}
            <div className="sticky top-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-4xl text-border">04</span>
                <h2 className="font-display text-2xl tracking-wide">LIVE PREVIEW</h2>
              </div>

              <MemeCanvas
                imageSrc={selectedImage}
                topText={topText}
                bottomText={bottomText}
                style={style}
                onCanvasReady={handleCanvasReady}
              />

              {/* Action buttons */}
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-3"
                >
                  {!showForm ? (
                    <>
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => setShowForm(true)}
                        disabled={!currentMemeDataUrl}
                      >
                        ★ Save to Journal
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={downloadMeme}
                        disabled={!currentMemeDataUrl}
                      >
                        <Download size={14} />
                        Download Meme
                      </Button>
                    </>
                  ) : (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-2 border-ink p-6 bg-cream"
                      >
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-ink">
                          <span className="font-display text-xl tracking-wide">JOURNAL ENTRY</span>
                          <span className="font-hand text-muted text-lg">— complete your entry</span>
                        </div>
                        <JournalForm
                          onSave={handleSave}
                          onCancel={() => setShowForm(false)}
                          isLoading={isSaving}
                        />
                      </motion.div>
                    </AnimatePresence>
                  )}
                </motion.div>
              )}

              {!selectedImage && (
                <p className="mt-4 text-center font-hand text-muted text-lg">
                  ← pick a cat to get started
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
