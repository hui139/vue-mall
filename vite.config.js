import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
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
