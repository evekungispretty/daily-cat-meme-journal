import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import Hero from '../components/home/Hero';
import MarqueeStrip from '../components/home/MarqueeStrip';
import SampleCards from '../components/home/SampleCards';
import { StarDoodle, WavyLine, FloatingSticker, CatFaceDoodle } from '../components/doodles/Doodles';

const steps = [
  {
    num: '01',
    title: 'Upload Your Cat',
    desc: 'Drop in a photo of your cat (or use one of our dramatic sample cats). We don\'t judge. Actually your cat does.',
    emoji: '📸',
  },
  {
    num: '02',
    title: 'Caption Your Feelings',
    desc: 'Add top and bottom text. Pick a style: chaotic, existential, dramatic, or whatever you\'re going through right now.',
    emoji: '✍️',
  },
  {
    num: '03',
    title: 'Save to Journal',
    desc: 'Add a short diary entry, tag your mood, and save it. Your daily emotional meme diary grows one entry at a time.',
    emoji: '📔',
  },
];

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      <MarqueeStrip />

      {/* How it works */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 border-b-2 border-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end gap-4 mb-12">
            <h2 className="font-display text-5xl sm:text-6xl tracking-wide">HOW IT WORKS</h2>
            <FloatingSticker delay={0}>
              <StarDoodle size={32} color="#ffe500" />
            </FloatingSticker>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-2 border-ink">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`p-8 ${i < steps.length - 1 ? 'border-b-2 sm:border-b-0 sm:border-r-2 border-ink' : ''}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-display text-5xl text-border leading-none">{step.num}</span>
                  <span className="text-3xl mt-1">{step.emoji}</span>
                </div>
                <h3 className="font-display text-2xl tracking-wide mb-3">{step.title}</h3>
                <p className="font-hand text-lg text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SampleCards />

      {/* Quote section */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-ink text-paper border-b-2 border-ink relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FloatingSticker className="absolute left-0 top-0" delay={0.5}>
            <CatFaceDoodle size={48} className="opacity-30" />
          </FloatingSticker>
          <p className="font-hand text-2xl sm:text-3xl text-paper/90 leading-relaxed mb-4">
            "A daily journal, but make it feline and emotionally unstable."
          </p>
          <WavyLine color="#ffe500" className="max-w-xs mx-auto" />
          <p className="font-body text-sm text-paper/50 mt-4 uppercase tracking-widest">
            — The Daily Cat Meme Journal Manifesto
          </p>
        </div>

        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[15rem] text-paper/5 leading-none">😺</span>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 border-b-2 border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="font-hand text-muted text-lg mb-1">— why you'll love it</p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wide">FEATURES</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-ink">
            {[
              { icon: '🎨', title: 'Meme Generator', desc: '6 style presets, live preview, Impact font and all the drama' },
              { icon: '📅', title: 'Daily Archive', desc: 'A growing visual diary. Your personal emotional museum.' },
              { icon: '😺', title: 'Mood Tracker', desc: '8 mood states from wholesome to fully unhinged' },
              { icon: '⬇️', title: 'Download Memes', desc: 'Save your art. Share your cat. You made this. Be proud.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 ${i % 2 === 0 && i < 2 ? 'border-b-2 lg:border-b-0' : ''} ${i < 3 ? 'border-r-2' : ''} border-ink`}
              >
                <span className="text-3xl block mb-3">{f.icon}</span>
                <h3 className="font-display text-xl tracking-wide mb-2">{f.title}</h3>
                <p className="font-hand text-muted text-base">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] tracking-wide leading-tight mb-6">
            YOUR CAT IS
            <br />
            WAITING
          </h2>
          <p className="font-hand text-muted text-xl mb-8 max-w-md mx-auto">
            They've been judging you for free this whole time. Now put them to work.
          </p>
          <Link to="/generate" className="btn-yellow text-lg px-10 py-4">
            ✦ Generate Today's Meme
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-ink py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl tracking-widest">DCMJ</span>
          <p className="font-hand text-muted text-sm text-center">
            Made with cat chaos energy. Your data stays on your device.
          </p>
          <div className="flex gap-4">
            <Link to="/generate" className="font-body text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors">Generate</Link>
            <Link to="/journal" className="font-body text-xs uppercase tracking-widest text-muted hover:text-ink transition-colors">Archive</Link>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
