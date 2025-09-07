import { ComponentLoader } from 'adminjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

// В production используем .jsx файлы для правильного bundling
const getComponentPath = (name) => {
    if (process.env.NODE_ENV === 'production') {
        // В production AdminJS должен использовать исходные .jsx файлы для bundling
        return path.resolve(__dirname, `${name}.jsx`);
    } else {
        // В development тоже используем .jsx
        return path.resolve(__dirname, `${name}.jsx`);
    }
};

const Components = {
    UploadImageInput: componentLoader.add('UploadImageInput', getComponentPath('UploadImageInput')),
    PasswordInput: componentLoader.add('PasswordInput', getComponentPath('PasswordInput')),
    SimpleTest: componentLoader.add('SimpleTest', getComponentPath('SimpleTest')),
    Dashboard: componentLoader.add('Dashboard', getComponentPath('Dashboard')),
    UploadGifOrVideo: componentLoader.add('UploadGifOrVideo', getComponentPath('UploadGifOrVideo')),
};

export { componentLoader, Components };