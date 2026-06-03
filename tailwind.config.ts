import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './docs/**/*.{md}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5A5F',
        'deep-text': '#222222',
        'body-text': '#484848',
        'muted-text': '#717171',
        surface: '#FFFFFF',
        'app-bg': '#F7F7F7',
        border: '#EBEBEB',
        success: '#008A05',
        warning: '#FFB400',
        error: '#D93025',
        hover: '#F2F2F2',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
