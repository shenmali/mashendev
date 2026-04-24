/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        mono: 'var(--mono)',
        sans: 'var(--sans)',
      },
    },
  },
  plugins: [],
};
