import { defineConfig } from 'vite-plugin-windicss'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  safelist: ["p-1", "p-2", "p-3", "p-4", "p-5", "bg-[#1AAB8B]", "bg-[#28A745]", "bg-[#8B60ED]", "bg-[#F19A1A]", "bg-[#EC454F]", "bg-[#8795A1]", "bg-[#DDF4FF]"].join(" "),
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
  // plugins: [formsPlugin],
})