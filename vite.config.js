import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // GitHub Pages 部署在子路径 https://<user>.github.io/<repo>/ 下，
  // 需要把资源引用前缀改成该子路径，否则会去根路径找 /assets/... 而 404（白屏）。
  // 本地 dev 与自定义域名部署时用 '/'，通过命令行动态覆盖。
  base: process.env.VITE_BASE ?? '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false,
    watch: {
      // Windows 上原子写入（编辑器保存时先写临时文件再替换）会让
      // inotify/fs.watch 撞上中间态并抛出 EBUSY，导致 dev server 退出。
      // 轮询方式牺牲一点响应速度，换来在 Windows 上的稳定。
      usePolling: true,
      interval: 300
    }
  },
  build: {
    // 按依赖拆包，避免单个 vendor 文件过大
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          element: ['element-plus', '@element-plus/icons-vue']
        }
      }
    }
  }
})
