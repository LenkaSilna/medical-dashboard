import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        title: 'var(--title-color)',
        label: 'var(--label-color)',
        border: 'var(--border-color)',
        button: 'var(--button-color)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
