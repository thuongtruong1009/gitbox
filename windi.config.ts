import { defineConfig } from 'vite-plugin-windicss'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  safelist: 'p-1 p-2 p-3 p-4 p-5',
  attributify: true,
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#096',
        },
      },
    },
  },
  plugins: [formsPlugin],
})