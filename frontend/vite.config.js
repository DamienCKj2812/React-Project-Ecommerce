import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",  //Requests starting with "/api/" to be forwarded to a local server running on http://localhost:5000
      "/uploads/": "http://localhost:5000",
    }
  }
})
