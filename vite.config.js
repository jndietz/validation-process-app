import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({})],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [resolve(__dirname, 'src/test/setup.js')],
    },
});
