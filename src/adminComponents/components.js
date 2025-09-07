import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
    UploadImageInput: componentLoader.add('UploadImageInput', '/app/dist/adminComponents/UploadImageInput.js'),
    PasswordInput: componentLoader.add('PasswordInput', '/app/dist/adminComponents/PasswordInput.js'),
    SimpleTest: componentLoader.add('SimpleTest', '/app/dist/adminComponents/SimpleTest.js'),
    Dashboard: componentLoader.add('Dashboard', '/app/dist/adminComponents/Dashboard.js'),
    UploadGifOrVideo: componentLoader.add('UploadGifOrVideo', '/app/dist/adminComponents/UploadGifOrVideo.js'),
};

export { componentLoader, Components };