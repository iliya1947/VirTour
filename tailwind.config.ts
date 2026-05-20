import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        night: '#05070D',
        ink: '#0E1320'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(6, 12, 28, 0.45)'
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(3,7,18,0.75))'
      }
    }
  },
  plugins: []
};

export default config;
