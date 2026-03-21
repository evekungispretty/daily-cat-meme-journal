import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  StarDoodle,
  ArrowDoodle,
  ScribbleUnderline,
  CatFaceDoodle,
  FloatingSticker,
  StampFrame,
} from '../doodles/Doodles';

const sampleCard = {
  memeUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
  topText: 'ME ON MONDAYS',
  bottomText: 'send help immediately',
  mood: '😵‍💫',
  moodLabel: 'chaotic',
  date: 'mar 21',
};

export default function Hero() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative overflow-hidden border-b-2 border-ink min-h-[90vh] flex flex-col">
      {/* Issue label */}
      <div className="border-b-2 border-ink px-6 py-2 flex items-center justify-between">
        <span className="font-hand text-muted text-sm">★ The official feline emotional archive</span>
        <span className="font-hand text-muted text-sm">Issue №001 — Today</span>
      </div>

      {/* Main hero grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Text content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 border-b-2 lg:border-b-0 lg:border-r-2 border-ink relative"
        >
          {/* Floating doodles */}
          <FloatingSticker className="absolute top-8 right-8" delay={0}>
            <StarDoodle size={28} color="#ffe500" />
          </FloatingSticker>
          <FloatingSticker className="absolute bottom-12 left-8" delay={1.5}>
            <CatFaceDoodle size={40} />
          </FloatingSticker>

          <motion.div variants={itemVariants}>
            <StampFrame label="DAILY" color="#ff2d20" />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4">
            <h1 className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.92] tracking-wider text-ink">
              CAT
              <br />
              MEME
              <br />
              <span className="relative inline-block">
                JOURNAL
                <div className="absolute -bottom-2 left-0 right-0">
                  <ScribbleUnderline color="#ffe500" />
                </div>
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 font-hand text-xl text-ink max-w-sm leading-relaxed"
          >
            "One meme a day keeps the breakdown manageable."
          </motion.p>

          <motion.p variants={itemVariants} className="mt-2 font-body text-muted text-sm max-w-xs">
            Your cat already judges you. Now let them narrate your life — one meme, one entry, one day at a time.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3 items-center">
            <Link to="/generate">
              <motion.div
                whileHover={{ y: -3, boxShadow: '6px 6px 0px #0a0a0a' }}
                className="btn-primary"
              >
                ✦ Generate Today's Meme
              </motion.div>
            </Link>
            <Link to="/journal" className="btn-outline">
              View My Journal →
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 flex items-center gap-3">
            <ArrowDoodle />
            <span className="font-hand text-muted text-sm">no sign-up needed. just you and your cat.</span>
          </motion.div>
        </motion.div>

        {/* Right: Featured meme card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center px-6 py-12 bg-cream relative"
        >
          {/* Decorative background text */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
            <span className="font-display text-[12rem] text-border/40 leading-none">CAT</span>
          </div>

          <div className="relative">
            {/* Floating sticker badges */}
            <FloatingSticker
              className="absolute -top-6 -right-4 z-10"
              delay={0.5}
            >
              <div className="bg-yellow border-2 border-ink px-3 py-1 font-display text-sm shadow-hard-sm rotate-3">
                TODAYS PICK
              </div>
            </FloatingSticker>

            {/* Main meme card */}
            <motion.div
              whileHover={{ rotate: 0, y: -4, boxShadow: '8px 8px 0px #0a0a0a' }}
              className="card w-64 sm:w-72 shadow-hard-lg cursor-pointer"
              style={{ rotate: '-2deg' }}
            >
              {/* Meme image with text overlay */}
              <div className="relative aspect-square overflow-hidden border-b-2 border-ink">
                <img
                  src={sampleCard.memeUrl}
                  alt="sample cat meme"
                  className="w-full h-full object-cover"
                />
                {/* Meme text overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none">
                  <p className="text-center font-['Impact'] font-black text-white text-xl leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,1)] [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000]">
                    {sampleCard.topText}
                  </p>
                  <p className="text-center font-['Impact'] font-black text-white text-xl leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,1)] [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000]">
                    {sampleCard.bottomText}
                  </p>
                </div>
              </div>
              {/* Card footer */}
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="font-hand text-muted text-sm">{sampleCard.date}</span>
                  <div className="flex items-center gap-1">
                    <span>{sampleCard.mood}</span>
                    <span className="font-body text-xs text-muted uppercase tracking-wide">{sampleCard.moodLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Second card peeking behind */}
            <div
              className="absolute -bottom-3 -left-4 w-64 sm:w-72 h-20 card bg-border"
              style={{ rotate: '3deg', zIndex: -1 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
