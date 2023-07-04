import Sequelize from "sequelize"
import db from "../../config/db-conf.js"

const ProductCategory = db.define('product_categories', {
    category_name: Sequelize.STRING,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

export default ProductCategory;