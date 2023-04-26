import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) => ({
  plugins: [
    vue({
      isProduction: true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // dedupe: ['vue']
  },
  // server: {
  //   host: "0.0.0.0",
  //   port: 80,
  //   proxy: {
  //     '^/api/.*': process.env.DEV_BACKEND_URL,
  //   }
  // },
  // build: {
  //   lib: {
  //     formats: ['es'],
  //     entry: path.resolve(__dirname, 'src/main.js'),
  //     name: 'plugin-twp-cam',
  //     fileName: 'dynamic-component',
  //   }
  // },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
})
