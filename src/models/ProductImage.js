import Sequelize from "sequelize"
import db from "../../config/db-conf.js"

const ProductImage = db.define('product_images', {
    product_id: Sequelize.INTEGER,
    image: Sequelize.STRING,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

export default ProductImage;