// src/adminComponents/components.js
import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

const componentLoader = new ComponentLoader();

// Пути к скомпилированным файлам
const compiledUploadImagePath = path.join(projectRoot, 'dist', 'adminComponents', 'UploadImageInput.js');
const compiledPasswordPath = path.join(projectRoot, 'dist', 'adminComponents', 'PasswordInput.js');
// const compiledSimpleTestPath = path.join(projectRoot, 'dist', 'adminComponents', 'SimpleTest.js'); // Если нужен

const Components = {
    UploadImageInput: componentLoader.add('UploadImageInput', compiledUploadImagePath),
    PasswordInput: componentLoader.add('PasswordInput', compiledPasswordPath),
    // SimpleTest: componentLoader.add('SimpleTest', compiledSimpleTestPath),
};

export { componentLoader, Components };