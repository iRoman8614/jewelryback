// src/bundle.js
// Pre-compiles AdminJS browser bundle during the build step so that the
// production server does NOT have to bundle custom components on startup.
//
// Runs AFTER babel has emitted dist/adminComponents/*.js, because
// componentLoader (imported below) points at the compiled files in dist/.
//
// Output: dist/.adminjs/  (components.bundle.js + adminjs vendor bundles)
// The production server serves this directory statically (see admin.js).
//
// IMPORTANT: at runtime the server sets ADMIN_JS_SKIP_BUNDLE="true" so AdminJS
// uses these prebuilt files instead of regenerating them.

import { bundle } from '@adminjs/bundler';
import path from 'path';
import { fileURLToPath } from 'url';

// The bundler must actually build, regardless of NODE_ENV.
process.env.ADMIN_JS_SKIP_BUNDLE = 'false';
process.env.NODE_ENV = 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = async () => {
    // componentLoader is the SAME instance the app uses, with all components
    // registered (UploadImageInput, PasswordInput, Dashboard, UploadGifOrVideo).
    const { componentLoader } = await import('./adminComponents/components.js');

    // Destination is relative to CWD. The build runs from project root, and
    // the compiled server lives in dist/, so emit the bundle into dist/.adminjs.
    const destinationDir = path.join('dist', '.adminjs');

    const files = await bundle({
        componentLoader,
        destinationDir,
    });

    console.log(`✅ AdminJS bundle generated in ${destinationDir}`);
    console.log('   Files:', files);
};

run().catch((err) => {
    console.error('❌ AdminJS bundle generation failed:', err);
    process.exit(1);
});