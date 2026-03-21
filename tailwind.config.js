/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#f5f4ef',
        cream: '#faf9f4',
        yellow: '#ffe500',
        red: '#ff2d20',
        blue: '#0047ff',
        muted: '#767676',
        border: '#d8d6cc',
      },
      boxShadow: {
        hard: '4px 4px 0px #0a0a0a',
        'hard-sm': '2px 2px 0px #0a0a0a',
        'hard-lg': '8px 8px 0px #0a0a0a',
        'hard-yellow': '4px 4px 0px #ffe500',
        'hard-red': '4px 4px 0px #ff2d20',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
        stamp: 'stamp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.4s ease',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-1deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        stamp: {
          '0%': { transform: 'scale(1.4) rotate(-5deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(-5deg)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
