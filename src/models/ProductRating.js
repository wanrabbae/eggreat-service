import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import Account from "./Account.js";

const ProductRating = db.define('product_ratings', {
    product_id: Sequelize.INTEGER,
    account_id: Sequelize.INTEGER,
    order_id: Sequelize.INTEGER,
    message: Sequelize.STRING,
    rate: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

ProductRating.belongsTo(Account, {
    foreignKey: 'account_id'
})

export default ProductRating;