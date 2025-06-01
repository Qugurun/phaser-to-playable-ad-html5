import { defineConfig } from 'vite';

const phasermsg = () => {
    return {
        name: 'phasermsg',
        buildStart() {
            process.stdout.write(`Building for production...\n`);
        },
        buildEnd() {
            const line = "---------------------------------------------------------";
            const msg = `❤️❤️❤️ Tell us about your game! - tg:@phaser_community ❤️❤️❤️`;
            process.stdout.write(`${line}\n${msg}\n${line}\n`);

            process.stdout.write(`Merging for production...\n`);
        }
    }
}

export default defineConfig({
    base: './',
    logLevel: 'warn',
    build: {
        chunkSizeWarningLimit: 50000,
        rollupOptions: {
            output: {
                inlineDynamicImports: true, // Объединяет динамические импорты в один файл
                entryFileNames: 'bundle.min.js', // Имя выходного файла
            }
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                passes: 2
            },
            mangle: true,
            format: {
                comments: false
            }
        }
    },
    server: {
        port: 8080
    },
    plugins: [
        phasermsg()
    ]
});
