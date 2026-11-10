import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Must come before react()
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  server: {
    // Forward API calls to the Express backend (npm run server).
    // Only used when MSW is off: when it's on, the service worker answers
    // these requests before they ever reach the dev server.
    proxy: {
      '/todos': {
        target: 'http://localhost:3001',
        // Page navigations (e.g. a future /todos/1 route) ask for HTML:
        // let Vite serve the app for those instead of proxying them.
        bypass: (req) =>
          req.headers.accept?.includes('text/html') ? '/index.html' : undefined,
      },
    },
  },
})
