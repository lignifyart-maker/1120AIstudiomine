import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 載入環境變數 (對應 Vercel 的 Environment Variables)
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // 這行程式碼讓您的原始碼中的 `process.env.API_KEY` 可以讀取到 Vercel 設定的變數
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // 防止有些套件存取 process.env 導致錯誤
      'process.env': {}
    }
  };
});