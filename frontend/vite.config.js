import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/login': {
        target: 'http://localhost:8800',
        changeOrigin: true
      },
      '/add-user': {
        target: 'http://localhost:8800',
        changeOrigin: true
      },
      '/users': {
        target: 'http://localhost:8800',
        changeOrigin: true
      },
      '/reservas': {
        target: 'http://localhost:8800',
        changeOrigin: true
      },
      '/addReservas': {
        target: 'http://localhost:8800',
        changeOrigin: true
      },
      '/users/:id': {
        target: 'http://localhost:8800',
        changeOrigin: true
      },
    }
  }
})
