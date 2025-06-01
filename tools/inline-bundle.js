import fs from 'fs';
import path from 'path';

const distDir = './dist';
const htmlPath = path.join(distDir, 'index.html');
const jsPath = path.join(distDir, 'bundle.min.js');
const assetsPath = path.join(distDir, 'assets');

// 1. Читаем файлы
const html = fs.readFileSync(htmlPath, 'utf8');
const js = fs.readFileSync(jsPath, 'utf8');


// 2. Заменяем
const inlined = html.replace(
    /<script type="module" crossorigin src="\.\/bundle\.min\.js"><\/script>/,
    `<script type="module" crossorigin>\n${js}<\/script>`
);

// 3. Записываем
fs.writeFileSync(htmlPath, inlined, 'utf8');

// 4. Удаляем bundle.min.js
if (fs.existsSync(jsPath)) {
    fs.unlinkSync(jsPath);
}

// 5. Удаляем assets
if (fs.existsSync(assetsPath)) {
    fs.rmSync(assetsPath, { recursive: true, force: true });
}

process.stdout.write(`✨ Done!✨\n`);