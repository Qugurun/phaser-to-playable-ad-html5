import { promises as fs } from 'fs';
import path from 'path';
import pako from 'pako';

class PackerService {
    constructor() { }

    /**
     * Compresses the file with pako, encodes as base64, and generates HTML with loader logic.
     * @returns {Promise<{fileName: string, html: string}>}
     */
    async pack() {
        const distDir = './dist';
        const htmlPath = path.join(distDir, 'index.html');
        const filePath = path.resolve(process.cwd(), htmlPath);
        const originalName = path.basename(filePath).replace(/\.html?$/i, "");
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const pakoMinPath = path.resolve(process.cwd(), 'tools/pako_inflate.min.js');
        const pakoMin = await fs.readFile(pakoMinPath, 'utf-8');

        const compressed = pako.deflate(fileContent);

        const base64 = this._arrayBufferToBase64(compressed);

        const loaderHtml =
            '<!DOCTYPE html>' +
            '<html><head><meta charset="utf-8"><title>' +
            originalName +
            ' (Packed)</title></head><body>' +
            '<script>' + pakoMin + '</script>' +
            '<script>' +
            '// Loader logic\n' +
            'const b64 = "' + base64 + '";\n' +
            'function b64ToUint8Array(b64) {\n' +
            '  const bin = atob(b64);\n' +
            '  const arr = new Uint8Array(bin.length);\n' +
            '  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);\n' +
            '  return arr;\n' +
            '}\n' +
            '(function() {\n' +
            '  const compressed = b64ToUint8Array(b64);\n' +
            '  const html = window.pako.inflate(compressed, { to: \'string\' });\n' +
            '  document.open();\n' +
            '  document.write(html);\n' +
            '  document.close();\n' +
            '})();\n' +
            '</script></body></html>';
        return {
            fileName: `${originalName}.html`,
            html: loaderHtml
        };
    }

    _arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
}

async function main() {
    try {
        const packer = new PackerService();
        const result = await packer.pack();

        // Write the output file
        await fs.writeFile('./dist/' + result.fileName, result.html);
        console.log(`Packed file created: ${result.fileName}`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();