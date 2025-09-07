// import fs from 'fs';
// import path from 'path';
// import formidable from 'express-formidable';
// import AdminJS, { ComponentLoader } from 'adminjs';
// import AdminJSExpress from '@adminjs/express';
// import AdminJSSequelize from '@adminjs/sequelize';
// import bcrypt from 'bcryptjs';
//
// import { componentLoader, Components } from './adminComponents/components.js';
//
// import Category from './models/Category.js';
// import Product from './models/Product.js';
// import HomepageConfig from './models/HomepageConfig.js';
// import Admin from './models/Admin.js';
// import Order from './models/Order.js';
// import OrderItem from './models/OrderItem.js';
// import OrderStatusLog from './models/OrderStatusLog.js';
// import Collection from './models/Collection.js';
// import DeliveryOption from './models/DeliveryOption.js';
// import PaymentMethod from './models/PaymentMethod.js';
// import SnakeConfig from './models/SnakeConfig.js';
// import MobileSliderConfig from './models/MobileSliderConfig.js';
// import IconLinksConfig from './models/IconLinksConfig.js';
// import ReelGalleryConfig from './models/ReelGalleryConfig.js';
//
// import { fileURLToPath } from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// const hashPasswordHook = async (request, context) => {
//     if (request.payload && request.payload.password && request.method !== 'get') {
//         const saltRounds = 10;
//         request.payload.hashedPassword = await bcrypt.hash(request.payload.password, saltRounds);
//         delete request.payload.password;
//     }
//     return request;
// };
//
//
// AdminJS.registerAdapter({
//     Database: AdminJSSequelize.Database,
//     Resource: AdminJSSequelize.Resource,
// });
//
// const setupAdminPanel = async (app) => {
//     console.log('NODE_ENV:', process.env.NODE_ENV);
//     console.log('Component paths check:');
//     console.log('UploadImageInput path exists:', fs.existsSync(compiledUploadImagePath));
//     console.log('Dashboard path exists:', fs.existsSync(compiledDashboardPath));
//     try {
//         const adminJs = new AdminJS({
//             componentLoader,
//             dashboard: {
//                 component: Components.Dashboard,
//             },
//             resources: [
//                 {
//                     resource: Category,
//                     options: {
//                         navigation: { name: 'Catalog', icon: 'Archive' },
//                         properties: {
//                             name: { label: 'Title (EN)' },
//                             title_ru: { label: 'Title (RU)', isRequired: true },
//                             subtitle_en: { label: 'Subtitle (EN)', type: 'textarea' },
//                             subtitle_ru: { label: 'Subtitle (RU)', type: 'textarea' },
//                             description_en: { label: 'Description (EN)', type: 'richtext' },
//                             description_ru: { label: 'Description (RU)', type: 'richtext' },
//                             slug: { isRequired: true }
//                         },
//                         listProperties: ['id', 'name', 'title_ru', 'slug'],
//                         editProperties: [
//                             'name',
//                             'title_ru',
//                             'slug',
//                             'subtitle_en',
//                             'subtitle_ru',
//                             'description_en',
//                             'description_ru'
//                         ],
//                         showProperties: [
//                             'id',
//                             'name',
//                             'title_ru',
//                             'slug',
//                             'subtitle_en',
//                             'subtitle_ru',
//                             'description_en',
//                             'description_ru',
//                             'createdAt',
//                             'updatedAt'
//                         ],
//                     }
//                 },
//                 {
//                     resource: Collection,
//                     options: {
//                         navigation: { name: 'Catalog', icon: 'Archive' },
//                         properties: {
//                             name_ru: { label: 'Name (RU)', isRequired: true },
//                             name_en: { label: 'Name (EN)', isRequired: true },
//                             slug: { isRequired: true, description: 'URL-friendly name (e.g., summer-vibes)' },
//                             description_ru: { label: 'Description (RU)', type: 'textarea' },
//                             description_en: { label: 'Description (EN)', type: 'textarea' },
//                             categoryId: { isRequired: true },
//                         },
//                         listProperties: ['id', 'name_ru', 'name_en', 'slug', 'categoryId'],
//                         editProperties: ['name_ru', 'name_en', 'slug', 'description_ru', 'description_en', 'categoryId'],
//                         showProperties: [
//                             'id',
//                             'name_ru',
//                             'name_en',
//                             'slug',
//                             'description_ru',
//                             'description_en',
//                             'categoryId',
//                             'createdAt',
//                             'updatedAt'
//                         ],
//                     }
//                 },
//                 {
//                     resource: DeliveryOption,
//                     options: {
//                         navigation: { name: 'Shop Settings', icon: 'Settings' },
//                         properties: {
//                             isForRussia: {
//                                 label: 'Для России (если нет, то для остального мира)',
//                             },
//                             allowsPaymentOnDelivery: {
//                                 label: 'Возможна оплата при получении'
//                             },
//                             price: { type: 'number' }
//                         },
//                         listProperties: ['id', 'label', 'price', 'isForRussia', 'isEnabled', 'allowsPaymentOnDelivery'],
//                         editProperties: ['label', 'slug', 'price', 'isForRussia', 'isEnabled', 'allowsPaymentOnDelivery'],
//                     }
//                 },
//                 {
//                     resource: PaymentMethod,
//                     options: {
//                         navigation: { name: 'Shop Settings', icon: 'DollarSign' },
//                         properties: {
//                             isForRussia: {
//                                 label: 'Для России (если нет, то для остального мира)',
//                             }
//                         },
//                         listProperties: ['id', 'label', 'isForRussia', 'isEnabled'],
//                         editProperties: ['label', 'slug', 'isForRussia', 'isEnabled'],
//                     }
//                 },
//                 {
//                     resource: Product,
//                     options: {
//                         navigation: { name: 'Catalog', icon: 'Box' },
//                         properties: {
//                             name_ru: { isRequired: true, label: 'Name (RU)' },
//                             name_en: { isRequired: true, label: 'Name (EN)' },
//                             description_ru: { type: 'richtext', label: 'Description (RU)' },
//                             description_en: { type: 'richtext', label: 'Description (EN)' },
//                             material_ru: { isRequired: true, label: 'Material (RU)' },
//                             material_en: { isRequired: true, label: 'Material (EN)' },
//                             sku: { isRequired: true },
//                             price: { isRequired: true },
//                             stockQuantity: { isRequired: true },
//                             previewImage: {
//                                 label: 'Preview Image',
//                                 components: { edit: Components.UploadImageInput },
//                                 isRequired: true
//                             },
//                             image1: { components: { edit: Components.UploadImageInput } },
//                             image2: { components: { edit: Components.UploadImageInput } },
//                             image3: { components: { edit: Components.UploadImageInput } },
//                             image4: { components: { edit: Components.UploadImageInput } },
//                             categoryId: { isRequired: true },
//                         },
//                         listProperties: ['id', 'name_ru', 'sku', 'price', 'categoryId'],
//                         editProperties: [
//                             'name_ru',
//                             'name_en',
//                             'sku',
//                             'price',
//                             'categoryId',
//                             'collectionId',
//                             'material_ru',
//                             'material_en',
//                             'weight',
//                             'size',
//                             'stockQuantity',
//                             'isVisible',
//                             'description_ru',
//                             'description_en',
//                             'previewImage',
//                             'image1',
//                             'image2',
//                             'image3',
//                             'image4'
//                         ],
//                         showProperties: [
//                             'id',
//                             'name_ru',
//                             'name_en',
//                             'sku',
//                             'price',
//                             'categoryId',
//                             'collectionId',
//                             'material_ru',
//                             'material_en',
//                             'weight',
//                             'size',
//                             'stockQuantity',
//                             'isVisible',
//                             'description_ru',
//                             'description_en',
//                             'previewImage',
//                             'image1',
//                             'image2',
//                             'image3',
//                             'image4',
//                             'createdAt',
//                             'updatedAt'
//                         ],
//                     }
//                 },
//                 {
//                     resource: HomepageConfig,
//                     options: {
//                         navigation: { name: 'Content', icon: 'Home' },
//                         actions: {
//                             new: { isAccessible: false },
//                             delete: { isAccessible: false },
//                             bulkDelete: { isAccessible: false },
//                         },
//                         properties: {
//                             text1_title_ru: { label: 'Text 1 - Title (RU)' },
//                             text1_title_en: { label: 'Text 1 - Title (EN)' },
//                             text1_content_ru: { type: 'richtext', label: 'Text 1 - Content (RU)' },
//                             text1_content_en: { type: 'richtext', label: 'Text 1 - Content (EN)' },
//                             image1_url: { label: 'Image 1', components: { edit: Components.UploadImageInput } },
//                             image2_url: { label: 'Image 2', components: { edit: Components.UploadImageInput } },
//                             image3_url: { label: 'Image 3', components: { edit: Components.UploadImageInput } },
//                             image4_url: { label: 'Image 4', components: { edit: Components.UploadImageInput } },
//                             image5_url: { label: 'Image 5', components: { edit: Components.UploadImageInput } },
//                             image6_url: { label: 'Image 6', components: { edit: Components.UploadImageInput } },
//                             text2_title_ru: { label: 'Text 2 - Title (RU)' },
//                             text2_title_en: { label: 'Text 2 - Title (EN)' },
//                             text2_content_ru: { type: 'richtext', label: 'Text 2 - Content (RU)' },
//                             text2_content_en: { type: 'richtext', label: 'Text 2 - Content (EN)' },
//                             image7_url: { label: 'Image 7', components: { edit: Components.UploadImageInput } },
//                             image8_url: { label: 'Image 8', components: { edit: Components.UploadImageInput } },
//                             image9_url: { label: 'Image 9', components: { edit: Components.UploadImageInput } },
//                             image10_url: { label: 'Image 10', components: { edit: Components.UploadImageInput } },
//                             text3_title_ru: { label: 'Text 3 - Title (RU)' },
//                             text3_title_en: { label: 'Text 3 - Title (EN)' },
//                             text3_content_ru: { type: 'richtext', label: 'Text 3 - Content (RU)' },
//                             text3_content_en: { type: 'richtext', label: 'Text 3 - Content (EN)' },
//                             image11_url: { label: 'Image 11', components: { edit: Components.UploadImageInput } },
//                             image12_url: { label: 'Image 12', components: { edit: Components.UploadImageInput } },
//                             image13_url: { label: 'Image 13', components: { edit: Components.UploadImageInput } },
//                             image14_url: { label: 'Image 14', components: { edit: Components.UploadImageInput } },
//                             text4_title_ru: { label: 'Text 4 - Title (RU)' },
//                             text4_title_en: { label: 'Text 4 - Title (EN)' },
//                             text4_content_ru: { type: 'richtext', label: 'Text 4 - Content (RU)' },
//                             text4_content_en: { type: 'richtext', label: 'Text 4 - Content (EN)' },
//                             image15_url: { label: 'Image 15', components: { edit: Components.UploadImageInput } },
//                             image16_url: { label: 'Image 16', components: { edit: Components.UploadImageInput } },
//                             image17_url: { label: 'Image 17', components: { edit: Components.UploadImageInput } },
//                             text5_title_ru: { label: 'Text 5 - Title (RU)' },
//                             text5_title_en: { label: 'Text 5 - Title (EN)' },
//                             text5_content_ru: { type: 'richtext', label: 'Text 5 - Content (RU)' },
//                             text5_content_en: { type: 'richtext', label: 'Text 5 - Content (EN)' },
//                             image18_url: { label: 'Image 18', components: { edit: Components.UploadImageInput } },
//                             image19_url: { label: 'Image 19', components: { edit: Components.UploadImageInput } },
//                             image20_url: { label: 'Image 20', components: { edit: Components.UploadImageInput } },
//                             image21_url: { label: 'Image 21', components: { edit: Components.UploadImageInput } },
//                         },
//                         listProperties: ['id', 'updatedAt'],
//                         editProperties: [
//                             'text1_title_ru', 'text1_title_en', 'text1_content_ru', 'text1_content_en',
//                             'image1_url', 'image2_url', 'image3_url', 'image4_url', 'image5_url', 'image6_url',
//                             'text2_title_ru', 'text2_title_en', 'text2_content_ru', 'text2_content_en',
//                             'image7_url', 'image8_url', 'image9_url', 'image10_url',
//                             'text3_title_ru', 'text3_title_en', 'text3_content_ru', 'text3_content_en',
//                             'image11_url', 'image12_url', 'image13_url', 'image14_url',
//                             'text4_title_ru', 'text4_title_en', 'text4_content_ru', 'text4_content_en',
//                             'image15_url', 'image16_url', 'image17_url',
//                             'text5_title_ru', 'text5_title_en', 'text5_content_ru', 'text5_content_en',
//                             'image18_url', 'image19_url', 'image20_url', 'image21_url',
//                         ],
//                     }
//                 },
//                 {
//                     resource: SnakeConfig,
//                     options: {
//                         navigation: { name: 'Content', icon: 'Image' },
//                         actions: {
//                             new: { isAccessible: false },
//                             delete: { isAccessible: false },
//                             bulkDelete: { isAccessible: false },
//                         },
//                         properties: {
//                             image1_top: { label: 'Item 1 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image1_bottom: { label: 'Item 1 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image2_top: { label: 'Item 2 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image2_bottom: { label: 'Item 2 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image3_top: { label: 'Item 3 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image3_bottom: { label: 'Item 3 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image4_top: { label: 'Item 4 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image4_bottom: { label: 'Item 4 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image5_top: { label: 'Item 5 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image5_bottom: { label: 'Item 5 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image6_top: { label: 'Item 6 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image6_bottom: { label: 'Item 6 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image7_top: { label: 'Item 7 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image7_bottom: { label: 'Item 7 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image8_top: { label: 'Item 8 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image8_bottom: { label: 'Item 8 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image9_top: { label: 'Item 9 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image9_bottom: { label: 'Item 9 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image10_top: { label: 'Item 10 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image10_bottom: { label: 'Item 10 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image11_top: { label: 'Item 11 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image11_bottom: { label: 'Item 11 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                             image12_top: { label: 'Item 12 - Top Image', components: { edit: Components.UploadImageInput } },
//                             image12_bottom: { label: 'Item 12 - Bottom Image', components: { edit: Components.UploadImageInput } },
//                         },
//                         listProperties: ['id', 'updatedAt'],
//                         editProperties: [
//                             'image1_top', 'image1_bottom', 'image2_top', 'image2_bottom', 'image3_top', 'image3_bottom',
//                             'image4_top', 'image4_bottom', 'image5_top', 'image5_bottom', 'image6_top', 'image6_bottom',
//                             'image7_top', 'image7_bottom', 'image8_top', 'image8_bottom', 'image9_top', 'image9_bottom',
//                             'image10_top', 'image10_bottom', 'image11_top', 'image11_bottom', 'image12_top', 'image12_bottom',
//                         ],
//                     }
//                 },
//                 {
//                     resource: MobileSliderConfig,
//                     options: {
//                         navigation: { name: 'Content', icon: 'Mobile' },
//                         actions: {
//                             new: { isAccessible: false },
//                             delete: { isAccessible: false },
//                             bulkDelete: { isAccessible: false },
//                         },
//                         properties: {
//                             slide1_image: { label: 'Slide 1 - Image', components: { edit: Components.UploadImageInput } },
//                             slide2_image: { label: 'Slide 2 - Image', components: { edit: Components.UploadImageInput } },
//                             slide3_image: { label: 'Slide 3 - Image', components: { edit: Components.UploadImageInput } },
//                             slide4_image: { label: 'Slide 4 - Image', components: { edit: Components.UploadImageInput } },
//                         },
//                         editProperties: [
//                             'slide1_image',
//                             'slide2_image',
//                             'slide3_image',
//                             'slide4_image',
//                         ],
//                     }
//                 },
//                 {
//                     resource: ReelGalleryConfig,
//                     options: {
//                         navigation: { name: 'Content', icon: 'Images' },
//                         actions: {
//                             new: { isAccessible: false },
//                             delete: { isAccessible: false },
//                             bulkDelete: { isAccessible: false },
//                         },
//                         properties: {
//                             image1: { label: 'Image 1', components: { edit: Components.UploadImageInput } },
//                             image2: { label: 'GIF 2', components: { edit: Components.UploadGifOrVideo } },
//                             image3: { label: 'Image 3', components: { edit: Components.UploadImageInput } },
//                             image4: { label: 'GIF 4', components: { edit: Components.UploadGifOrVideo } },
//                             image5: { label: 'Image 5', components: { edit: Components.UploadImageInput } },
//                             image6: { label: 'GIF 6', components: { edit: Components.UploadGifOrVideo } },
//                             image7: { label: 'Image 7', components: { edit: Components.UploadImageInput } },
//                             image8: { label: 'GIF 8', components: { edit: Components.UploadGifOrVideo } },
//                             image9: { label: 'Image 9', components: { edit: Components.UploadImageInput } },
//                             image10: { label: 'GIF 10', components: { edit: Components.UploadGifOrVideo } },
//                             image11: { label: 'Image 11', components: { edit: Components.UploadImageInput } },
//                             image12: { label: 'GIF 12', components: { edit: Components.UploadGifOrVideo } },
//                             image13: { label: 'Image 13', components: { edit: Components.UploadImageInput } },
//                             image14: { label: 'GIF 14', components: { edit: Components.UploadGifOrVideo } },
//                             image15: { label: 'Image 15', components: { edit: Components.UploadImageInput } },
//                             image16: { label: 'GIF 16', components: { edit: Components.UploadGifOrVideo } },
//                         },
//                         listProperties: ['id', 'updatedAt'],
//                         editProperties: [
//                             'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8',
//                             'image9', 'image10', 'image11', 'image12', 'image13', 'image14', 'image15', 'image16',
//                         ],
//                     }
//                 },
//                 {
//                     resource: IconLinksConfig,
//                     options: {
//                         navigation: { name: 'Content', icon: 'Link' },
//                         actions: {
//                             new: { isAccessible: false },
//                             delete: { isAccessible: false },
//                             bulkDelete: { isAccessible: false },
//                         },
//                         properties: {
//                             icon1_image: { label: 'Icon 1 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
//                             icon2_image: { label: 'Icon 2 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
//                             icon3_image: { label: 'Icon 3 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
//                             icon4_image: { label: 'Icon 4 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
//                         },
//                         editProperties: [
//                             'icon1_image',
//                             'icon2_image',
//                             'icon3_image',
//                             'icon4_image',
//                         ],
//                     }
//                 },
//                 {
//                     resource: Admin,
//                     options: {
//                         navigation: { name: 'Admin Users', icon: 'User' },
//                         properties: {
//                             hashedPassword: { isVisible: false },
//                             password: {
//                                 type: 'password',
//                                 isVisible: { list: false, show: false, edit: true, filter: false },
//                                 components: { edit: Components.SimpleTest }
//                             },
//                             email: { isRequired: true }
//                         },
//                         listProperties: ['id', 'email', 'createdAt'],
//                         editProperties: ['email', 'password'],
//                         showProperties: ['id', 'email', 'createdAt', 'updatedAt'],
//                         actions: {
//                             new: {
//                                 before: [hashPasswordHook],
//                             },
//                             edit: {
//                                 before: [hashPasswordHook],
//                             },
//                         },
//                     },
//                 },
//                 {
//                     resource: OrderItem,
//                     options: {
//                         navigation: { name: 'Orders', icon: 'ShoppingCart' },
//                         listProperties: ['id', 'orderId', 'productId', 'productName', 'quantity', 'priceAtOrder'],
//                         showProperties: ['id', 'orderId', 'productId', 'productName', 'productSku', 'quantity', 'priceAtOrder', 'createdAt'],
//                         actions: {
//                             new: { isAccessible: false },
//                             edit: { isAccessible: false },
//                         }
//                     }
//                 },
//                 {
//                     resource: Order,
//                     options: {
//                         navigation: { name: 'Orders', icon: 'ShoppingCart' },
//                         parent: { name: 'Orders' },
//                         properties: {
//                             status: { /* ... availableValues ... */ },
//                             customerAddress: { type: 'textarea' },
//                             customerComment: { type: 'textarea' },
//                             items: {
//                                 label: 'Order Items',
//                             },
//                             statusHistory: {
//                                 label: 'Status History',
//                             }
//                         },
//                         listProperties: ['id', 'customerName', 'customerEmail', 'totalAmount', 'status', 'createdAt'],
//                         editProperties: [
//                             'customerName', 'customerEmail', 'customerPhone', 'customerAddress',
//                             'deliveryMethod', 'deliveryCost', 'customerComment', 'paymentMethod',
//                             'totalAmount', 'status'
//                         ],
//                         showProperties: [
//                             'id', 'customerName', 'customerEmail', 'customerPhone', 'customerAddress',
//                             'deliveryMethod', 'deliveryCost', 'customerComment', 'paymentMethod',
//                             'totalAmount', 'status',
//                             'items',
//                             'statusHistory',
//                             'createdAt', 'updatedAt'
//                         ],
//                         actions: {
//                             new: { isAccessible: false },
//                             edit: { isAccessible: false },
//                             delete: { isAccessible: false },
//                             bulkDelete: { isAccessible: false },
//                         }
//                     }
//                 },
//                 {
//                     resource: OrderStatusLog,
//                     options: {
//                         navigation: { name: 'Orders', icon: 'Report' },
//                         parent: { name: 'Orders' },
//                         actions: {
//                             new: { isAccessible: false },
//                             edit: { isAccessible: false },
//                             delete: { isAccessible: false },
//                             bulkDelete: { isAccessible: false },
//                         },
//                         properties: {
//                             adminId: { label: 'Changed By Admin' },
//                             orderId: { label: 'Order ID' },
//                             adminEmail: { label: 'Changed By (Email)' }
//                         },
//                         listProperties: ['id', 'orderId', 'adminEmail', 'previousStatus', 'newStatus', 'changedAt', 'comment'],
//                         showProperties: ['id', 'orderId', 'adminId', 'adminEmail', 'previousStatus', 'newStatus', 'changedAt', 'comment', 'createdAt'],
//                         sort: { sortBy: 'changedAt', direction: 'desc' },
//                     }
//                 },
//             ],
//             rootPath: '/admin',
//             branding: {companyName: 'Jewelry Admin Panel'},
//         });
//
//         const authenticate = async (email, password) => {
//             const loginTime = new Date().toISOString();
//             try {
//                 const adminUser = await Admin.findOne({ where: { email } });
//                 if (adminUser && adminUser.hashedPassword) {
//                     const matched = await bcrypt.compare(password, adminUser.hashedPassword);
//                     if (matched) {
//                         console.log(`[AUTH SUCCESS] Time: ${loginTime}, User: ${email}`);
//                         return { id: adminUser.id, email: adminUser.email };
//                     }
//                 }
//             } catch (error) {
//                 console.error(`[AUTH ERROR] Time: ${loginTime}, User: ${email}, Error: ${error.message}`);
//             }
//             console.warn(`[AUTH FAILURE] Time: ${loginTime}, User: ${email}, Reason: Invalid credentials`);
//             return null;
//         };
//
//         const authOptions = {
//             authenticate,
//             cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
//             cookieName: 'adminjs-session',
//         };
//
//         const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
//             adminJs,
//             authOptions,
//             null,
//             {
//                 resave: false,
//                 saveUninitialized: true,
//                 secret: process.env.ADMIN_SESSION_SECRET,
//                 cookie: {
//                     maxAge: 1000 * 60 * 60 * 24
//                 }
//             }
//         );
//         app.use(adminJs.options.rootPath, adminJsRouter);
//         if (process.env.NODE_ENV !== 'production') {
//             adminJs.watch();
//             console.log('👨‍💻 AdminJS watch mode enabled.');
//         }
//         console.log(`✅ AdminJS setup complete. Panel available at http://localhost:${process.env.PORT || 5000}${adminJs.options.rootPath}`);
//
//     } catch (error) {
//         console.error('❌ Failed to setup AdminJS:', error);
//         console.error(error.stack);
//         setupAdminPanel.error = error;
//     }
// };
//
// export default setupAdminPanel;

import path from 'path';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import bcrypt from 'bcryptjs';

// Временно закомментируем импорт компонентов
// import { componentLoader, Components } from './adminComponents/components.js';

import Category from './models/Category.js';
import Product from './models/Product.js';
import HomepageConfig from './models/HomepageConfig.js';
import Admin from './models/Admin.js';
import Order from './models/Order.js';
import OrderItem from './models/OrderItem.js';
import OrderStatusLog from './models/OrderStatusLog.js';
import Collection from './models/Collection.js';
import DeliveryOption from './models/DeliveryOption.js';
import PaymentMethod from './models/PaymentMethod.js';
import SnakeConfig from './models/SnakeConfig.js';
import MobileSliderConfig from './models/MobileSliderConfig.js';
import IconLinksConfig from './models/IconLinksConfig.js';
import ReelGalleryConfig from './models/ReelGalleryConfig.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hashPasswordHook = async (request, context) => {
    if (request.payload && request.payload.password && request.method !== 'get') {
        const saltRounds = 10;
        request.payload.hashedPassword = await bcrypt.hash(request.payload.password, saltRounds);
        delete request.payload.password;
    }
    return request;
};

AdminJS.registerAdapter({
    Database: AdminJSSequelize.Database,
    Resource: AdminJSSequelize.Resource,
});

const setupAdminPanel = async (app) => {
    try {
        const adminJs = new AdminJS({
            // Временно убираем componentLoader и dashboard
            // componentLoader,
            // dashboard: { component: Components.Dashboard },
            resources: [
                {
                    resource: Category,
                    options: {
                        navigation: { name: 'Catalog', icon: 'Archive' },
                        properties: {
                            name: { label: 'Title (EN)' },
                            title_ru: { label: 'Title (RU)', isRequired: true },
                            subtitle_en: { label: 'Subtitle (EN)', type: 'textarea' },
                            subtitle_ru: { label: 'Subtitle (RU)', type: 'textarea' },
                            description_en: { label: 'Description (EN)', type: 'richtext' },
                            description_ru: { label: 'Description (RU)', type: 'richtext' },
                            slug: { isRequired: true }
                        },
                        listProperties: ['id', 'name', 'title_ru', 'slug'],
                        editProperties: [
                            'name', 'title_ru', 'slug', 'subtitle_en', 'subtitle_ru', 'description_en', 'description_ru'
                        ],
                        showProperties: [
                            'id', 'name', 'title_ru', 'slug', 'subtitle_en', 'subtitle_ru', 'description_en', 'description_ru', 'createdAt', 'updatedAt'
                        ],
                    }
                },
                {
                    resource: Product,
                    options: {
                        navigation: { name: 'Catalog', icon: 'Box' },
                        properties: {
                            name_ru: { isRequired: true, label: 'Name (RU)' },
                            name_en: { isRequired: true, label: 'Name (EN)' },
                            description_ru: { type: 'richtext', label: 'Description (RU)' },
                            description_en: { type: 'richtext', label: 'Description (EN)' },
                            material_ru: { isRequired: true, label: 'Material (RU)' },
                            material_en: { isRequired: true, label: 'Material (EN)' },
                            sku: { isRequired: true },
                            price: { isRequired: true },
                            stockQuantity: { isRequired: true },
                            // Временно убираем кастомные компоненты
                            previewImage: { label: 'Preview Image', type: 'string' },
                            image1: { label: 'Image 1', type: 'string' },
                            image2: { label: 'Image 2', type: 'string' },
                            image3: { label: 'Image 3', type: 'string' },
                            image4: { label: 'Image 4', type: 'string' },
                            categoryId: { isRequired: true },
                        },
                        listProperties: ['id', 'name_ru', 'sku', 'price', 'categoryId'],
                        editProperties: [
                            'name_ru', 'name_en', 'sku', 'price', 'categoryId', 'collectionId',
                            'material_ru', 'material_en', 'weight', 'size', 'stockQuantity', 'isVisible',
                            'description_ru', 'description_en', 'previewImage', 'image1', 'image2', 'image3', 'image4'
                        ],
                    }
                },
                {
                    resource: Admin,
                    options: {
                        navigation: { name: 'Admin Users', icon: 'User' },
                        properties: {
                            hashedPassword: { isVisible: false },
                            password: {
                                type: 'password',
                                isVisible: { list: false, show: false, edit: true, filter: false }
                            },
                            email: { isRequired: true }
                        },
                        listProperties: ['id', 'email', 'createdAt'],
                        editProperties: ['email', 'password'],
                        showProperties: ['id', 'email', 'createdAt', 'updatedAt'],
                        actions: {
                            new: { before: [hashPasswordHook] },
                            edit: { before: [hashPasswordHook] },
                        },
                    },
                },
                // Добавьте остальные ресурсы без кастомных компонентов
            ],
            rootPath: '/admin',
            branding: {companyName: 'Jewelry Admin Panel'},
        });

        const authenticate = async (email, password) => {
            const loginTime = new Date().toISOString();
            try {
                const adminUser = await Admin.findOne({ where: { email } });
                if (adminUser && adminUser.hashedPassword) {
                    const matched = await bcrypt.compare(password, adminUser.hashedPassword);
                    if (matched) {
                        console.log(`[AUTH SUCCESS] Time: ${loginTime}, User: ${email}`);
                        return { id: adminUser.id, email: adminUser.email };
                    }
                }
            } catch (error) {
                console.error(`[AUTH ERROR] Time: ${loginTime}, User: ${email}, Error: ${error.message}`);
            }
            console.warn(`[AUTH FAILURE] Time: ${loginTime}, User: ${email}, Reason: Invalid credentials`);
            return null;
        };

        const authOptions = {
            authenticate,
            cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
            cookieName: 'adminjs-session',
        };

        const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, authOptions, null, {
            resave: false,
            saveUninitialized: true,
            secret: process.env.ADMIN_SESSION_SECRET,
            cookie: { maxAge: 1000 * 60 * 60 * 24 }
        });

        app.use(adminJs.options.rootPath, adminJsRouter);
        console.log(`✅ AdminJS setup complete. Panel available at http://localhost:${process.env.PORT || 5000}${adminJs.options.rootPath}`);

    } catch (error) {
        console.error('❌ Failed to setup AdminJS:', error);
        console.error(error.stack);
        setupAdminPanel.error = error;
    }
};

export default setupAdminPanel;