import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Generate', to: '/generate' },
  { label: 'Journal', to: '/journal' },
];

export default function Navbar() {
  const location = useLocation();
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-paper border-b-2 border-ink"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl tracking-wider leading-none">DCMJ</span>
            <span className="hidden sm:inline font-hand text-muted text-lg mt-0.5">
              daily cat meme journal
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-1 font-body text-xs font-semibold uppercase tracking-widest transition-all duration-150 ${
                    active ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-ink"
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Date */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-hand text-muted text-lg">{today}</span>
            <Link
              to="/generate"
              className="btn-primary text-xs px-4 py-2"
            >
              + Today's Meme
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
