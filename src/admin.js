import path from 'path';
import formidable from 'express-formidable';
import AdminJS, { ComponentLoader } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import bcrypt from 'bcrypt';

import { componentLoader, Components } from './adminComponents/components.js';

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
            componentLoader,
            dashboard: {
                component: Components.Dashboard,
            },
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
                            'name',
                            'title_ru',
                            'slug',
                            'subtitle_en',
                            'subtitle_ru',
                            'description_en',
                            'description_ru'
                        ],
                        showProperties: [
                            'id',
                            'name',
                            'title_ru',
                            'slug',
                            'subtitle_en',
                            'subtitle_ru',
                            'description_en',
                            'description_ru',
                            'createdAt',
                            'updatedAt'
                        ],
                    }
                },
                {
                    resource: Collection,
                    options: {
                        navigation: { name: 'Catalog', icon: 'Archive' },
                        properties: {
                            name_ru: { label: 'Name (RU)', isRequired: true },
                            name_en: { label: 'Name (EN)', isRequired: true },
                            slug: { isRequired: true, description: 'URL-friendly name (e.g., summer-vibes)' },
                            description_ru: { label: 'Description (RU)', type: 'textarea' },
                            description_en: { label: 'Description (EN)', type: 'textarea' },
                            categoryId: { isRequired: true },
                        },
                        listProperties: ['id', 'name_ru', 'name_en', 'slug', 'categoryId'],
                        editProperties: ['name_ru', 'name_en', 'slug', 'description_ru', 'description_en', 'categoryId'],
                        showProperties: [
                            'id',
                            'name_ru',
                            'name_en',
                            'slug',
                            'description_ru',
                            'description_en',
                            'categoryId',
                            'createdAt',
                            'updatedAt'
                        ],
                    }
                },
                {
                    resource: DeliveryOption,
                    options: {
                        navigation: { name: 'Shop Settings', icon: 'Settings' },
                        properties: {
                            isForRussia: {
                                label: 'Для России (если нет, то для остального мира)',
                            },
                            price: { type: 'number' }
                        },
                        listProperties: ['id', 'label', 'price', 'isForRussia', 'isEnabled'],
                        editProperties: ['label', 'slug', 'price', 'isForRussia', 'isEnabled'],
                    }
                },
                {
                    resource: PaymentMethod,
                    options: {
                        navigation: { name: 'Shop Settings', icon: 'DollarSign' },
                        properties: {
                            isForRussia: {
                                label: 'Для России (если нет, то для остального мира)',
                            }
                        },
                        listProperties: ['id', 'label', 'isForRussia', 'isEnabled'],
                        editProperties: ['label', 'slug', 'isForRussia', 'isEnabled'],
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
                            previewImage: {
                                label: 'Preview Image',
                                components: { edit: Components.UploadImageInput },
                                isRequired: true
                            },
                            image1: { components: { edit: Components.UploadImageInput } },
                            image2: { components: { edit: Components.UploadImageInput } },
                            image3: { components: { edit: Components.UploadImageInput } },
                            image4: { components: { edit: Components.UploadImageInput } },
                            categoryId: { isRequired: true },
                        },
                        listProperties: ['id', 'name_ru', 'sku', 'price', 'categoryId'],
                        editProperties: [
                            'name_ru',
                            'name_en',
                            'sku',
                            'price',
                            'categoryId',
                            'collectionId',
                            'material_ru',
                            'material_en',
                            'weight',
                            'size',
                            'stockQuantity',
                            'isVisible',
                            'description_ru',
                            'description_en',
                            'previewImage',
                            'image1',
                            'image2',
                            'image3',
                            'image4'
                        ],
                        showProperties: [
                            'id',
                            'name_ru',
                            'name_en',
                            'sku',
                            'price',
                            'categoryId',
                            'collectionId',
                            'material_ru',
                            'material_en',
                            'weight',
                            'size',
                            'stockQuantity',
                            'isVisible',
                            'description_ru',
                            'description_en',
                            'previewImage',
                            'image1',
                            'image2',
                            'image3',
                            'image4',
                            'createdAt',
                            'updatedAt'
                        ],
                    }
                },
                {
                    resource: HomepageConfig,
                    options: {
                        navigation: { name: 'Content', icon: 'Home' },
                        properties: {
                            text1_title: { label: 'Text Block 1 Title (ID 0)' },
                            text1_content: { type: 'textarea', label: 'Text Block 1 (ID 0)' },
                            image1_url: { label: 'Image 1 (ID 1)', components: { edit: Components.UploadImageInput } },
                            image1_alt: { label: 'Image 1 Alt Text' },
                            image2_url: { label: 'Image 2 (ID 2)', components: { edit: Components.UploadImageInput } },
                            image2_alt: { label: 'Image 2 Alt Text' },
                            image3_url: { label: 'Image 3 (ID 3)', components: { edit: Components.UploadImageInput } },
                            image3_alt: { label: 'Image 3 Alt Text' },
                            image4_url: { label: 'Image 4 (ID 4)', components: { edit: Components.UploadImageInput } },
                            image4_alt: { label: 'Image 4 Alt Text' },
                            image5_url: { label: 'Image 5 (ID 5)', components: { edit: Components.UploadImageInput } },
                            image5_alt: { label: 'Image 5 Alt Text' },
                            image6_url: { label: 'Image 6 (ID 6)', components: { edit: Components.UploadImageInput } },
                            image6_alt: { label: 'Image 6 Alt Text' },
                            text2_title: { label: 'Text Block 2 Title (ID 7)' },
                            text2_content: { type: 'textarea', label: 'Text Block 2 Content (ID 7)' },
                            image7_url: { label: 'Image 7 (ID 8)', components: { edit: Components.UploadImageInput } },
                            image7_alt: { label: 'Image 7 Alt Text' },
                            image8_url: { label: 'Image 8 (ID 9)', components: { edit: Components.UploadImageInput } },
                            image8_alt: { label: 'Image 8 Alt Text' },
                            image9_url: { label: 'Image 9 (ID 10)', components: { edit: Components.UploadImageInput } },
                            image9_alt: { label: 'Image 9 Alt Text' },
                            image10_url: { label: 'Image 10 (ID 11)', components: { edit: Components.UploadImageInput } },
                            image10_alt: { label: 'Image 10 Alt Text' },
                            text3_title: { label: 'Text Block 3 Title (ID 12)' },
                            text3_content: { type: 'textarea', label: 'Text Block 3 (ID 12)' },
                            image11_url: { label: 'Image 11 (ID 13)', components: { edit: Components.UploadImageInput } },
                            image11_alt: { label: 'Image 11 Alt Text' },
                            image12_url: { label: 'Image 12 (ID 14)', components: { edit: Components.UploadImageInput } },
                            image12_alt: { label: 'Image 12 Alt Text' },
                            image13_url: { label: 'Image 13 (ID 15)', components: { edit: Components.UploadImageInput } },
                            image13_alt: { label: 'Image 13 Alt Text' },
                            image14_url: { label: 'Image 14 (ID 16)', components: { edit: Components.UploadImageInput } },
                            image14_alt: { label: 'Image 14 Alt Text' },
                            text4_title: { label: 'Text Block 4 Title (ID 17)' },
                            text4_content: { type: 'textarea', label: 'Text Block 4 Content (ID 17)' },
                            image15_url: { label: 'Image 15 (ID 18)', components: { edit: Components.UploadImageInput } },
                            image15_alt: { label: 'Image 15 Alt Text' },
                            image16_url: { label: 'Image 16 (ID 19)', components: { edit: Components.UploadImageInput } },
                            image16_alt: { label: 'Image 16 Alt Text' },
                            image17_url: { label: 'Image 17 (ID 20)', components: { edit: Components.UploadImageInput } },
                            image17_alt: { label: 'Image 17 Alt Text' },
                            text5_title: { label: 'Text Block 5 Title (ID 21)' },
                            text5_content: { type: 'textarea', label: 'Text Block 5 Content (ID 21)' },
                            image18_url: { label: 'Image 18 (ID 22)', components: { edit: Components.UploadImageInput } },
                            image18_alt: { label: 'Image 18 Alt Text' },
                            image19_url: { label: 'Image 19 (ID 23)', components: { edit: Components.UploadImageInput } },
                            image19_alt: { label: 'Image 19 Alt Text' },
                            image20_url: { label: 'Image 20 (ID 24)', components: { edit: Components.UploadImageInput } },
                            image20_alt: { label: 'Image 20 Alt Text' },
                            image21_url: { label: 'Image 21 (ID 25)', components: { edit: Components.UploadImageInput } },
                            image21_alt: { label: 'Image 21 Alt Text' },
                        },
                        editProperties: [
                            'text1_title', 'text1_content',
                            'image1_url', 'image1_alt',
                            'image2_url', 'image2_alt',
                            'image3_url', 'image3_alt',
                            'image4_url', 'image4_alt',
                            'image5_url', 'image5_alt',
                            'image6_url', 'image6_alt',
                            'text2_title', 'text2_content',
                            'image7_url', 'image7_alt',
                            'image8_url', 'image8_alt',
                            'image9_url', 'image9_alt',
                            'image10_url', 'image10_alt',
                            'text3_title', 'text3_content',
                            'image11_url', 'image11_alt',
                            'image12_url', 'image12_alt',
                            'image13_url', 'image13_alt',
                            'image14_url', 'image14_alt',
                            'text4_title', 'text4_content',
                            'image15_url', 'image15_alt',
                            'image16_url', 'image16_alt',
                            'image17_url', 'image17_alt',
                            'text5_title', 'text5_content',
                            'image18_url', 'image18_alt',
                            'image19_url', 'image19_alt',
                            'image20_url', 'image20_alt',
                            'image21_url', 'image21_alt',
                        ],
                        actions: {
                            edit: { pageTitle: 'Edit Homepage Content', recordTitle: 'Homepage Configuration' },
                            new: { isAccessible: false },
                            delete: { isAccessible: false },
                            bulkDelete: { isAccessible: false },
                            show: { isAccessible: false }
                        }
                    }
                },
                {
                    resource: SnakeConfig,
                    options: {
                        navigation: { name: 'Content', icon: 'Image' },
                        actions: {
                            new: { isAccessible: false },
                            delete: { isAccessible: false },
                            bulkDelete: { isAccessible: false },
                        },
                        // ------------------------

                        properties: {
                            image1_top: { label: 'Item 1 - Top Image', components: { edit: Components.UploadImageInput } },
                            image1_bottom: { label: 'Item 1 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image2_top: { label: 'Item 2 - Top Image', components: { edit: Components.UploadImageInput } },
                            image2_bottom: { label: 'Item 2 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image3_top: { label: 'Item 3 - Top Image', components: { edit: Components.UploadImageInput } },
                            image3_bottom: { label: 'Item 3 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image4_top: { label: 'Item 4 - Top Image', components: { edit: Components.UploadImageInput } },
                            image4_bottom: { label: 'Item 4 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image5_top: { label: 'Item 5 - Top Image', components: { edit: Components.UploadImageInput } },
                            image5_bottom: { label: 'Item 5 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image6_top: { label: 'Item 6 - Top Image', components: { edit: Components.UploadImageInput } },
                            image6_bottom: { label: 'Item 6 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image7_top: { label: 'Item 7 - Top Image', components: { edit: Components.UploadImageInput } },
                            image7_bottom: { label: 'Item 7 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image8_top: { label: 'Item 8 - Top Image', components: { edit: Components.UploadImageInput } },
                            image8_bottom: { label: 'Item 8 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image9_top: { label: 'Item 9 - Top Image', components: { edit: Components.UploadImageInput } },
                            image9_bottom: { label: 'Item 9 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image10_top: { label: 'Item 10 - Top Image', components: { edit: Components.UploadImageInput } },
                            image10_bottom: { label: 'Item 10 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image11_top: { label: 'Item 11 - Top Image', components: { edit: Components.UploadImageInput } },
                            image11_bottom: { label: 'Item 11 - Bottom Image', components: { edit: Components.UploadImageInput } },
                            image12_top: { label: 'Item 12 - Top Image', components: { edit: Components.UploadImageInput } },
                            image12_bottom: { label: 'Item 12 - Bottom Image', components: { edit: Components.UploadImageInput } },
                        },
                        listProperties: ['id', 'updatedAt'],
                        editProperties: [
                            'image1_top', 'image1_bottom', 'image2_top', 'image2_bottom', 'image3_top', 'image3_bottom',
                            'image4_top', 'image4_bottom', 'image5_top', 'image5_bottom', 'image6_top', 'image6_bottom',
                            'image7_top', 'image7_bottom', 'image8_top', 'image8_bottom', 'image9_top', 'image9_bottom',
                            'image10_top', 'image10_bottom', 'image11_top', 'image11_bottom', 'image12_top', 'image12_bottom',
                        ],
                    }
                },
                {
                    resource: MobileSliderConfig,
                    options: {
                        navigation: { name: 'Content', icon: 'Mobile' },
                        actions: {
                            new: { isAccessible: false },
                            delete: { isAccessible: false },
                            bulkDelete: { isAccessible: false },
                        },
                        properties: {
                            slide1_image: { label: 'Slide 1 - Image', components: { edit: Components.UploadImageInput } },
                            slide2_image: { label: 'Slide 2 - Image', components: { edit: Components.UploadImageInput } },
                            slide3_image: { label: 'Slide 3 - Image', components: { edit: Components.UploadImageInput } },
                            slide4_image: { label: 'Slide 4 - Image', components: { edit: Components.UploadImageInput } },
                        },
                        editProperties: [
                            'slide1_image',
                            'slide2_image',
                            'slide3_image',
                            'slide4_image',
                        ],
                    }
                },
                {
                    resource: ReelGalleryConfig,
                    options: {
                        navigation: { name: 'Content', icon: 'Images' },
                        actions: {
                            new: { isAccessible: false },
                            delete: { isAccessible: false },
                            bulkDelete: { isAccessible: false },
                        },
                        properties: {
                            image1: { label: 'Image 1', components: { edit: Components.UploadImageInput } },
                            image2: { label: 'Image 2', components: { edit: Components.UploadImageInput } },
                            image3: { label: 'Image 3', components: { edit: Components.UploadImageInput } },
                            image4: { label: 'Image 4', components: { edit: Components.UploadImageInput } },
                            image5: { label: 'Image 5', components: { edit: Components.UploadImageInput } },
                            image6: { label: 'Image 6', components: { edit: Components.UploadImageInput } },
                            image7: { label: 'Image 7', components: { edit: Components.UploadImageInput } },
                            image8: { label: 'Image 8', components: { edit: Components.UploadImageInput } },
                            image9: { label: 'Image 9', components: { edit: Components.UploadImageInput } },
                            image10: { label: 'Image 10', components: { edit: Components.UploadImageInput } },
                            image11: { label: 'Image 11', components: { edit: Components.UploadImageInput } },
                            image12: { label: 'Image 12', components: { edit: Components.UploadImageInput } },
                            image13: { label: 'Image 13', components: { edit: Components.UploadImageInput } },
                            image14: { label: 'Image 14', components: { edit: Components.UploadImageInput } },
                            image15: { label: 'Image 15', components: { edit: Components.UploadImageInput } },
                            image16: { label: 'Image 16', components: { edit: Components.UploadImageInput } },
                        },
                        listProperties: ['id', 'updatedAt'],
                        editProperties: [
                            'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7', 'image8',
                            'image9', 'image10', 'image11', 'image12', 'image13', 'image14', 'image15', 'image16',
                        ],
                    }
                },
                {
                    resource: IconLinksConfig,
                    options: {
                        navigation: { name: 'Content', icon: 'Link' },
                        actions: {
                            new: { isAccessible: false },
                            delete: { isAccessible: false },
                            bulkDelete: { isAccessible: false },
                        },
                        properties: {
                            icon1_image: { label: 'Icon 1 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
                            icon2_image: { label: 'Icon 2 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
                            icon3_image: { label: 'Icon 3 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
                            icon4_image: { label: 'Icon 4 - Image (SVG/PNG)', components: { edit: Components.UploadImageInput } },
                        },
                        editProperties: [
                            'icon1_image',
                            'icon2_image',
                            'icon3_image',
                            'icon4_image',
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
                                isVisible: { list: false, show: false, edit: true, filter: false },
                                components: { edit: Components.SimpleTest }
                            },
                            email: { isRequired: true }
                        },
                        listProperties: ['id', 'email', 'createdAt'],
                        editProperties: ['email', 'password'],
                        showProperties: ['id', 'email', 'createdAt', 'updatedAt'],
                        actions: {
                            new: {
                                before: [hashPasswordHook],
                            },
                            edit: {
                                before: [hashPasswordHook],
                            },
                        },
                    },
                },
                {
                    resource: OrderItem,
                    options: {
                        navigation: { name: 'Orders', icon: 'ShoppingCart' },
                        parent: { name: 'Orders' },
                        listProperties: ['id', 'orderId', 'productId', 'productName', 'quantity', 'priceAtOrder'],
                        showProperties: ['id', 'orderId', 'productId', 'productName', 'productSku', 'quantity', 'priceAtOrder', 'createdAt'],
                        actions: { // Ограничим действия
                            new: { isAccessible: false },
                            edit: { isAccessible: false },
                        }
                    }
                },
                {
                    resource: Order,
                    options: {
                        navigation: { name: 'Orders', icon: 'ShoppingCart' },
                        parent: { name: 'Orders' },
                        properties: {
                            status: { /* ... availableValues ... */ },
                            customerAddress: { type: 'textarea' },
                            customerComment: { type: 'textarea' },
                            items: {
                                label: 'Order Items',
                            },
                            statusHistory: {
                                label: 'Status History',
                            }
                        },
                        listProperties: ['id', 'customerName', 'customerEmail', 'totalAmount', 'status', 'createdAt'],
                        editProperties: [
                            'customerName', 'customerEmail', 'customerPhone', 'customerAddress',
                            'deliveryMethod', 'deliveryCost', 'customerComment', 'paymentMethod',
                            'totalAmount', 'status'
                        ],
                        showProperties: [
                            'id', 'customerName', 'customerEmail', 'customerPhone', 'customerAddress',
                            'deliveryMethod', 'deliveryCost', 'customerComment', 'paymentMethod',
                            'totalAmount', 'status',
                            'items',
                            'statusHistory',
                            'createdAt', 'updatedAt'
                        ],
                        actions: {
                            new: { isAccessible: false },
                            edit: { isAccessible: false },
                            delete: { isAccessible: false },
                            bulkDelete: { isAccessible: false },
                        }
                    }
                },
                {
                    resource: OrderStatusLog,
                    options: {
                        navigation: { name: 'Orders', icon: 'Report' },
                        parent: { name: 'Orders' },
                        actions: {
                            new: { isAccessible: false },
                            edit: { isAccessible: false },
                            delete: { isAccessible: false },
                            bulkDelete: { isAccessible: false },
                        },
                        properties: {
                            adminId: { label: 'Changed By Admin' },
                            orderId: { label: 'Order ID' },
                            adminEmail: { label: 'Changed By (Email)' }
                        },
                        listProperties: ['id', 'orderId', 'adminEmail', 'previousStatus', 'newStatus', 'changedAt', 'comment'],
                        showProperties: ['id', 'orderId', 'adminId', 'adminEmail', 'previousStatus', 'newStatus', 'changedAt', 'comment', 'createdAt'],
                        sort: { sortBy: 'changedAt', direction: 'desc' },
                    }
                },
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

        const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
            adminJs,
            authOptions,
            null,
            {
                resave: false,
                saveUninitialized: true,
                secret: process.env.ADMIN_SESSION_SECRET,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24
                }
            }
        );
        app.use(adminJs.options.rootPath, adminJsRouter);
        if (process.env.NODE_ENV !== 'production') {
            adminJs.watch();
            console.log('👨‍💻 AdminJS watch mode enabled.');
        }
        console.log(`✅ AdminJS setup complete. Panel available at http://localhost:${process.env.PORT || 5000}${adminJs.options.rootPath}`);

    } catch (error) {
        console.error('❌ Failed to setup AdminJS:', error);
        console.error(error.stack);
        setupAdminPanel.error = error;
    }
};

export default setupAdminPanel;