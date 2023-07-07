import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import Account from './Account.js'
import Product from './Product.js'

const Cart = db.define('carts', {
    account_id: Sequelize.INTEGER,
    product_id: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    created_at: Sequelize.DATE
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Cart.belongsTo(Account, {
    foreignKey: 'account_id'
})

Cart.belongsTo(Product, {
    foreignKey: 'product_id'
})

export default Cart;