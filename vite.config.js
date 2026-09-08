import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
export default defineConfig({plugins:[svelte()],base:'./',build:{outDir:'site',emptyOutDir:false,manifest:true,rollupOptions:{input:'src/main.js',output:{entryFileNames:'reader/[name]-[hash].js',chunkFileNames:'reader/[name]-[hash].js',assetFileNames:'reader/[name]-[hash][extname]'}}}});
