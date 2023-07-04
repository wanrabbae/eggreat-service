import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import ProductCategory from "./ProductCategory.js";
import ProductImage from "./ProductImage.js";
import ProductRating from "./ProductRating.js";
import Toko from "./Toko.js";

const Product = db.define('products', {
    toko_id: Sequelize.INTEGER,
    category_id: Sequelize.INTEGER,
    product_name: Sequelize.STRING,
    description: Sequelize.TEXT,
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    quantity_unit: Sequelize.STRING,
    stock: Sequelize.INTEGER,
    is_delivery: Sequelize.BOOLEAN,
    shipping_costs: Sequelize.INTEGER,
    product_status: Sequelize.ENUM('proses', 'lolos', 'tidak lolos'),
    product_report: Sequelize.TEXT,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Product.belongsTo(ProductCategory, {
    foreignKey: 'category_id'
})

Product.belongsTo(Toko, {
    foreignKey: 'toko_id'
})

Product.hasMany(ProductImage, {
    foreignKey: 'product_id'
})

Product.hasMany(ProductRating, {
    foreignKey: 'product_id'
})

export default Product;