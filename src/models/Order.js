import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import Account from './Account.js'
import Toko from './Toko.js'
import OrderDetail from './OrderDetail.js'
import Address from './Alamat.js'

const Order = db.define('orders', {
    account_id: Sequelize.INTEGER,
    toko_id: Sequelize.INTEGER,
    address_id: Sequelize.INTEGER,
    invoice: Sequelize.STRING,
    total_harga: Sequelize.INTEGER,
    status: Sequelize.ENUM('belum dibayar', 'sudah dibayar', 'proses', 'diterima', 'dibatalkan', 'selesai'),
    payment_type: Sequelize.STRING,
    delivery_costs: Sequelize.INTEGER,
    discount_amount: Sequelize.INTEGER,
    created_at: Sequelize.DATE
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Order.belongsTo(Account, {
    foreignKey: 'account_id'
})

Order.belongsTo(Toko, {
    foreignKey: 'toko_id'
})

Order.belongsTo(Address, {
    foreignKey: 'address_id'
})

Order.hasMany(OrderDetail, {
    foreignKey: 'order_id'
})

export default Order;