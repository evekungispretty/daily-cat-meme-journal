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
  memeImageDataUrl?: string;
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
    id: 'smiling-cat',
    url: '/cat-memes/smiling-cat.jpg',
    label: 'Smiling Cat',
    defaultTop: 'EVERYTHING IS FINE',
    defaultBottom: 'everything is not fine',
  },
  {
    id: 'screaming-cat',
    url: '/cat-memes/screaming-cat.jpg',
    label: 'Screaming Cat',
    defaultTop: 'ME WHEN THE ALARM GOES OFF',
    defaultBottom: 'every single morning',
  },
  {
    id: 'laptop-cat',
    url: '/cat-memes/laptop-cat.jpg',
    label: 'Laptop Cat',
    defaultTop: 'WORKING FROM HOME',
    defaultBottom: 'they said it would be fun',
  },
  {
    id: 'shocked-cat',
    url: '/cat-memes/shocked-cat.jpeg',
    label: 'Shocked Cat',
    defaultTop: 'YOU DID WHAT',
    defaultBottom: 'on a monday????',
  },
  {
    id: 'grumpy-cat',
    url: '/cat-memes/grumpy-cat.png',
    label: 'Grumpy Cat',
    defaultTop: 'HAD A GOOD TIME ONCE',
    defaultBottom: 'it was awful',
  },
  {
    id: 'sad-cat',
    url: '/cat-memes/sad-cat.jpg',
    label: 'Sad Cat',
    defaultTop: 'ME AFTER CHECKING MY BANK ACCOUNT',
    defaultBottom: 'just vibing in the void',
  },
  {
    id: 'crying-cat',
    url: '/cat-memes/crying-cat.jpg',
    label: 'Crying Cat',
    defaultTop: 'ME TRYING TO BE OKAY',
    defaultBottom: 'i am fine (i am not fine)',
  },
  {
    id: 'aw-cat',
    url: '/cat-memes/aw-cat.png',
    label: 'Aw Cat',
    defaultTop: 'MY CRUSG EXISTING',
    defaultBottom: 'sending me to a coma',
  },
  {
    id: 'sideeye-cat',
    url: '/cat-memes/cat-sideeye.jpg',
    label: 'Side eye Cat',
    defaultTop: 'WHEN SOMEONE SAYS THEY DONT LIKE CATS',
    defaultBottom: 'are you sure about that',
  },
  {
    id: 'cat-milk',
    url: '/cat-memes/cat-milk.jpg',
    label: 'Cat Milk',
    defaultTop: 'When you given your all',
    defaultBottom: 'But it is only Tuesday',
  },
];
