'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      title_ru: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subtitle_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      subtitle_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_ru: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name_en: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });

    await queryInterface.createTable('delivery_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      isForRussia: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('payment_methods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      isForRussia: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      isEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_ru: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name_en: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      material_ru: {
        type: Sequelize.STRING,
        allowNull: false
      },
      material_en: {
        type: Sequelize.STRING,
        allowNull: false
      },
      weight: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stockQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      previewImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image3: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image4: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isVisible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      collectionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'collections',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerAddress: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      deliveryMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deliveryCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      },
      customerComment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false
      },
      totalAmount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(
            'new',
            'accepted',
            'paid',
            'processing',
            'shipped',
            'ready_for_pickup',
            'completed',
            'cancelled',
            'refunded'
        ),
        allowNull: false,
        defaultValue: 'new'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      priceAtOrder: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productSku: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable('order_status_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      previousStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      newStatus: {
        type: Sequelize.STRING,
        allowNull: false
      },
      changedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      adminEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      adminId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admins',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable('homepage_config', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text1_title_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text1_title_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text1_content_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text1_content_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image1_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image1_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image2_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image2_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image3_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image3_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image4_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image4_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image5_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image5_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image6_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image6_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text2_title_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text2_title_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text2_content_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text2_content_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image7_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image7_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image8_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image8_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image9_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image9_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image10_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image10_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text3_title_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text3_title_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text3_content_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text3_content_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image11_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image11_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image12_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image12_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image13_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image13_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image14_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image14_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text4_title_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text4_title_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text4_content_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text4_content_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image15_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image15_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image16_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image16_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image17_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image17_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text5_title_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text5_title_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text5_content_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      text5_content_en: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image18_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image18_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image19_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image19_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image20_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image20_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image21_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image21_alt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('icon_links_config', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      icon1_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      icon2_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      icon3_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      icon4_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('mobile_slider_config', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slide1_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      slide2_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      slide3_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      slide4_image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('reel_gallery_config', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image3: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image4: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image5: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image6: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image7: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image8: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image9: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image10: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image11: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image12: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image13: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image14: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image15: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image16: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('snake_config', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image1_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image1_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image2_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image2_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image3_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image3_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image4_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image4_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image5_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image5_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image6_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image6_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image7_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image7_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image8_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image8_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image9_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image9_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image10_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image10_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image11_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image11_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image12_top: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image12_bottom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('snake_config');
    await queryInterface.dropTable('reel_gallery_config');
    await queryInterface.dropTable('mobile_slider_config');
    await queryInterface.dropTable('icon_links_config');
    await queryInterface.dropTable('homepage_config');
    await queryInterface.dropTable('order_status_logs');
    await queryInterface.dropTable('order_items');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('payment_methods');
    await queryInterface.dropTable('delivery_options');
    await queryInterface.dropTable('collections');
    await queryInterface.dropTable('Categories');
    await queryInterface.dropTable('admins');
  }
};