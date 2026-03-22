import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sampleEntries = [
  {
    id: 'sample-1',
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80',
    topText: 'WHAT IS EVEN',
    bottomText: 'the point',
    mood: '🫠',
    moodLabel: 'existential',
    date: 'Mar 18',
    title: 'Another monday, another crisis',
    snippet: 'Sat and stared at the ceiling for 20 minutes. The cat joined. We understood each other.',
    rotation: '-2deg',
    accentColor: '#767676',
  },
  {
    id: 'sample-2',
    imageUrl: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&q=80',
    topText: 'ME EVERY MORNING',
    bottomText: 'vs me after coffee',
    mood: '😤',
    moodLabel: 'dramatic',
    date: 'Mar 19',
    title: 'The coffee dependency deepens',
    snippet: 'I have achieved caffeine. I am powerful. The cat looked unimpressed. Nothing new.',
    rotation: '1.5deg',
    accentColor: '#ffe500',
  },
  {
    id: 'sample-3',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    topText: 'PRODUCTIVITY LOADING',
    bottomText: '...please wait',
    mood: '😵‍💫',
    moodLabel: 'chaotic',
    date: 'Mar 20',
    title: 'today was a lot',
    snippet: 'I accidentally sent a voice memo to my boss. It was just me saying "okay but like" for 8 seconds.',
    rotation: '-1deg',
    accentColor: '#ff2d20',
  },
];

export default function SampleCards() {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 border-b-2 border-ink">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-hand text-muted text-2xl mb-1">— from the archive</p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wide">RECENT ENTRIES</h2>
          </div>
          <Link
            to="/journal"
            className="hidden sm:inline-flex font-body text-sm font-semibold uppercase tracking-widest text-muted hover:text-ink border-b-2 border-transparent hover:border-ink transition-all pb-0.5"
          >
            View all →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sampleEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                whileHover={{ rotate: 0, y: -6, boxShadow: '8px 8px 0px #0a0a0a' }}
                className="card cursor-pointer transition-shadow duration-200"
                style={{ rotate: entry.rotation }}
              >
                {/* Meme image */}
                <div className="relative aspect-square border-b-2 border-ink overflow-hidden">
                  <img
                    src={entry.imageUrl}
                    alt="cat meme"
                    className="w-full h-full object-cover"
                  />
                  {/* Text overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                    <p className="text-center font-['Impact'] font-black text-white text-lg leading-tight [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000]">
                      {entry.topText}
                    </p>
                    <p className="text-center font-['Impact'] font-black text-white text-lg leading-tight [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000]">
                      {entry.bottomText}
                    </p>
                  </div>
                  {/* Mood badge */}
                  <div
                    className="absolute top-2 right-2 border-2 border-ink px-2 py-0.5 font-display text-xs bg-paper shadow-hard-sm"
                    style={{ backgroundColor: entry.accentColor, borderColor: '#0a0a0a' }}
                  >
                    {entry.mood} {entry.moodLabel.toUpperCase()}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-hand text-muted text-2xl">{entry.date}</span>
                  </div>
                  <h3 className="font-body font-semibold text-sm uppercase tracking-wide mb-1 line-clamp-1">
                    {entry.title}
                  </h3>
                  <p className="font-hand text-muted text-2xl leading-snug line-clamp-2">
                    {entry.snippet}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link to="/generate" className="btn-yellow text-sm">
            ✦ Start Your Own Journal
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
