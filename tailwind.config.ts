import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        xdd: '#778DA9',

        text: '#E0E1DD',
        bg: '#0D1B2A',
        primary: '#25313f',
        secondary: '#3d4854',
        tertiary: '#555f69',
      },
    },
  },
  plugins: [],
};
export default config;
