import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import Product from './Product.js'

const OrderDetail = db.define('order_detail', {
    order_id: Sequelize.INTEGER,
    product_id: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    is_picked: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

OrderDetail.belongsTo(Product, {
    foreignKey: 'product_id'
})

export default OrderDetail;