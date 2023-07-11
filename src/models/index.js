import Account from "./Account.js";
import Product from "./Product.js";
import Toko from "./Toko.js";
import Order from "./Order.js";
import OrderDetail from "./OrderDetail.js";

// DEFINE REF YANG ERROR DISIINI AGAR TIDAK ERROR

Toko.belongsTo(Account, {
    foreignKey: "account_id"
})

OrderDetail.belongsTo(Order, {
    foreignKey: 'order_id'
})

Product.hasOne(OrderDetail, {
    sourceKey: "id",
    foreignKey: "product_id"
})

OrderDetail.belongsTo(Product, {
    foreignKey: 'product_id'
})

export { Toko, Account, OrderDetail, Product }