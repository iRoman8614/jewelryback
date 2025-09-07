import { build } from 'esbuild';
import { copyFile, mkdir, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyDir(src, dest) {
    await mkdir(dest, { recursive: true });
    const entries = await readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await copyFile(srcPath, destPath);
        }
    }
}

async function buildServer() {
    console.log('Building server files...');

    // Build main server files (excluding adminComponents)
    await build({
        entryPoints: ['src/server.js', 'src/admin.js'],
        bundle: false,
        platform: 'node',
        target: 'node18',
        format: 'esm',
        outdir: 'dist',
        sourcemap: true,
        external: [
            // External dependencies that shouldn't be bundled
            'adminjs',
            '@adminjs/*',
            'express',
            'sequelize',
            'mysql2',
            'bcryptjs',
            'cors',
            'dotenv',
            'nodemailer',
            'handlebars',
            'multer',
            'axios'
        ]
    });

    // Copy non-JS files
    const nonJSFiles = [
        'src/config',
        'src/controllers',
        'src/middleware',
        'src/migrations',
        'src/models',
        'src/routes',
        'src/seeders',
        'src/services',
        'src/email-template'
    ];

    for (const dir of nonJSFiles) {
        try {
            const srcPath = join(__dirname, dir);
            const destPath = join(__dirname, 'dist', dir.replace('src/', ''));
            await copyDir(srcPath, destPath);
            console.log(`Copied ${dir}`);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(`Error copying ${dir}:`, err);
            }
        }
    }
}

async function buildComponents() {
    console.log('Building React components...');

    await build({
        entryPoints: [
            'src/adminComponents/Dashboard.jsx',
            'src/adminComponents/UploadImageInput.jsx',
            'src/adminComponents/UploadGifOrVideo.jsx',
            'src/adminComponents/PasswordInput.jsx',
            'src/adminComponents/SimpleTest.jsx'
        ],
        bundle: false,
        platform: 'browser',
        target: 'es2020',
        format: 'esm',
        outdir: 'dist/adminComponents',
        sourcemap: true,
        jsx: 'automatic'
    });

    // Copy components.js
    await copyFile(
        join(__dirname, 'src/adminComponents/components.js'),
        join(__dirname, 'dist/adminComponents/components.js')
    );
}

async function main() {
    try {
        console.log('Starting build process...');
        await buildServer();
        await buildComponents();
        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

main();