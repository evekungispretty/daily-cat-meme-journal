export type Mood =
  | 'chaotic'
  | 'existential'
  | 'dramatic'
  | 'wholesome'
  | 'unhinged'
  | 'sleepy'
  | 'happy'
  | 'sad';

export type MemeStyle =
  | 'chaotic'
  | 'existential'
  | 'dramatic'
  | 'wholesome'
  | 'unhinged'
  | 'sleepy';

export type Tag =
  | 'work'
  | 'tired'
  | 'grateful'
  | 'anxious'
  | 'silly'
  | 'productive'
  | 'romantic'
  | 'overwhelmed'
  | 'cozy'
  | 'hungry'
  | 'inspired';

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  createdAt: number;
  memeImageDataUrl: string;
  sourceImageUrl: string;
  topText: string;
  bottomText: string;
  style: MemeStyle;
  title: string;
  journalText: string;
  mood: Mood;
  tags: Tag[];
  isFavorite: boolean;
}

export interface StylePresetConfig {
  id: MemeStyle;
  label: string;
  textColor: string;
  strokeColor: string;
  filter: string;
  accentColor: string;
  description: string;
}

export const STYLE_PRESETS: StylePresetConfig[] = [
  {
    id: 'chaotic',
    label: 'CHAOTIC',
    textColor: '#ff2d20',
    strokeColor: '#000000',
    filter: 'saturate(1.8) contrast(1.2)',
    accentColor: '#ff2d20',
    description: 'maximum distress energy',
  },
  {
    id: 'existential',
    label: 'EXISTENTIAL',
    textColor: '#ffffff',
    strokeColor: '#000000',
    filter: 'grayscale(0.8) contrast(1.1)',
    accentColor: '#767676',
    description: 'staring into the void',
  },
  {
    id: 'dramatic',
    label: 'DRAMATIC',
    textColor: '#ffe500',
    strokeColor: '#000000',
    filter: 'contrast(1.3) brightness(0.9)',
    accentColor: '#ffe500',
    description: 'oscar-worthy performance',
  },
  {
    id: 'wholesome',
    label: 'WHOLESOME',
    textColor: '#ffffff',
    strokeColor: '#0a0a0a',
    filter: 'saturate(1.2) brightness(1.05)',
    accentColor: '#0047ff',
    description: 'pure and soft vibes',
  },
  {
    id: 'unhinged',
    label: 'UNHINGED',
    textColor: '#ff2d20',
    strokeColor: '#ffe500',
    filter: 'saturate(2) contrast(1.4)',
    accentColor: '#ff2d20',
    description: 'beyond saving, fully committed',
  },
  {
    id: 'sleepy',
    label: 'SLEEPY',
    textColor: '#aaaaaa',
    strokeColor: '#333333',
    filter: 'grayscale(1) brightness(0.8)',
    accentColor: '#767676',
    description: 'too tired to function',
  },
];

export const MOOD_CONFIG: Record<Mood, { emoji: string; label: string; color: string }> = {
  chaotic: { emoji: '😵‍💫', label: 'Chaotic', color: '#ff2d20' },
  existential: { emoji: '🫠', label: 'Existential', color: '#767676' },
  dramatic: { emoji: '😤', label: 'Dramatic', color: '#ffe500' },
  wholesome: { emoji: '🥹', label: 'Wholesome', color: '#0047ff' },
  unhinged: { emoji: '🤪', label: 'Unhinged', color: '#ff2d20' },
  sleepy: { emoji: '😴', label: 'Sleepy', color: '#aaaaaa' },
  happy: { emoji: '😺', label: 'Happy', color: '#ffe500' },
  sad: { emoji: '😿', label: 'Sad', color: '#0047ff' },
};

export const ALL_TAGS: Tag[] = [
  'work', 'tired', 'grateful', 'anxious', 'silly',
  'productive', 'romantic', 'overwhelmed', 'cozy', 'hungry', 'inspired',
];

export const SAMPLE_CATS = [
  {
    id: 'orange',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
    label: 'The Classic',
    defaultTop: 'MONDAYS BE LIKE',
    defaultBottom: 'send help',
  },
  {
    id: 'white',
    url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80',
    label: 'The Philosopher',
    defaultTop: 'WHAT IS EVEN',
    defaultBottom: 'the point',
  },
  {
    id: 'tabby',
    url: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&q=80',
    label: 'The Dramatic',
    defaultTop: 'ME EVERY MORNING',
    defaultBottom: 'vs me after coffee',
  },
  {
    id: 'serious',
    url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80',
    label: 'The Judge',
    defaultTop: 'YOUR DECISIONS',
    defaultBottom: 'disappoint me',
  },
  {
    id: 'sleepy',
    url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80',
    label: 'The Mood',
    defaultTop: 'PRODUCTIVITY',
    defaultBottom: 'has left the chat',
  },
  {
    id: 'crying',
    url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
    label: 'Crying Cat',
    defaultTop: 'ME TRYING TO BE OKAY',
    defaultBottom: 'i am fine (i am not fine)',
  },
  {
    id: 'smudge',
    url: 'https://images.unsplash.com/photo-1578897367009-1c29da5e2f98?w=600&q=80',
    label: 'Smudge at Dinner',
    defaultTop: 'NO I DON\'T WANT YOUR SALAD',
    defaultBottom: 'absolutely not',
  },
  {
    id: 'grumpy',
    url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&q=80',
    label: 'Grumpy Cat',
    defaultTop: 'HAD A GOOD TIME ONCE',
    defaultBottom: 'it was awful',
  },
  {
    id: 'keyboard',
    url: 'https://images.unsplash.com/photo-1511044568932-338ceba04787?w=600&q=80',
    label: 'Keyboard Cat',
    defaultTop: 'WHEN THE DEADLINE IS TODAY',
    defaultBottom: '♪ dun dun dun dun ♪',
  },
  {
    id: 'shocked',
    url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
    label: 'Shocked Cat',
    defaultTop: 'YOU DID WHAT',
    defaultBottom: 'on a monday????',
  },
];
