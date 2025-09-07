import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Определяем корневую директорию в зависимости от окружения
const getProjectRoot = () => {
    if (process.env.NODE_ENV === 'production') {
        // В production мы находимся в dist/adminComponents/
        return path.resolve(__dirname, '..', '..');
    } else {
        // В development мы в src/adminComponents/
        return path.resolve(__dirname, '..', '..');
    }
};

const projectRoot = getProjectRoot();
const componentLoader = new ComponentLoader();

// Определяем пути к компонентам
const getComponentPath = (componentName) => {
    if (process.env.NODE_ENV === 'production') {
        return path.join(projectRoot, 'dist', 'adminComponents', `${componentName}.js`);
    } else {
        return path.join(projectRoot, 'src', 'adminComponents', `${componentName}.jsx`);
    }
};

const Components = {
    UploadImageInput: componentLoader.add('UploadImageInput', getComponentPath('UploadImageInput')),
    PasswordInput: componentLoader.add('PasswordInput', getComponentPath('PasswordInput')),
    SimpleTest: componentLoader.add('SimpleTest', getComponentPath('SimpleTest')), // Исправлено имя
    Dashboard: componentLoader.add('Dashboard', getComponentPath('Dashboard')),
    UploadGifOrVideo: componentLoader.add('UploadGifOrVideo', getComponentPath('UploadGifOrVideo')),
};

export { componentLoader, Components };