import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

const assetsDir = './public/assets'; // path.join(__dirname, '..', 'public', 'assets'); // <-- вверх на уровень выше
const outputFile = './src/assets-base64.js'; // path.join(__dirname, '..', 'src', 'assets-base64.js'); // или куда нужно

function walkDir(dir, fileList = [], baseDir = dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath, fileList, baseDir);
        } else {
            fileList.push(path.relative(baseDir, filePath));
        }
    });
    return fileList;
}

function encodeAssetsToBase64() {
    const allFiles = walkDir(assetsDir);
    const assets = {};
    allFiles.forEach(relPath => {
        const absPath = path.join(assetsDir, relPath);
        const mimeType = mime.lookup(absPath) || 'application/octet-stream';
        const data = fs.readFileSync(absPath).toString('base64');
        assets[relPath.replace(/\\/g, '/')] = {
            mime: mimeType,
            data: data
        };
    });
    return assets;
}

function writeAssetsJS(assets) {
    const jsContent =
        '// This file is auto-generated. Do not edit manually.\n' +
        'export const assets = ' + JSON.stringify(assets, null, 2) + ';\n';
    fs.writeFileSync(outputFile, jsContent, 'utf8');
    console.log(`Generated ${outputFile} with ${Object.keys(assets).length} assets.`);
}

const assets = encodeAssetsToBase64();
writeAssetsJS(assets); 