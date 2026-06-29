import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const nvidiaKey = env.NVIDIA_API_KEY || env.VITE_NVIDIA_API_KEY
  const valseaKey = env.VALSEA_API_KEY || env.VITE_VALSEA_API_KEY

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/nvidia': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/nvidia/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (nvidiaKey) {
                proxyReq.setHeader('Authorization', `Bearer ${nvidiaKey}`)
              }
            })
          },
        },
        '/api/valsea': {
          target: 'https://api.valsea.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/valsea/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (valseaKey) {
                proxyReq.setHeader('Authorization', `Bearer ${valseaKey}`)
              }
            })
          },
        },
        '/api/overpass': {
          target: 'https://overpass-api.de',
          changeOrigin: true,
          rewrite: () => '/api/interpreter',
        },
      },
    },
  }
})
