import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, './src/index.html'),
                store: resolve(__dirname, './src/store.html'),
            },
        },
    }
})