import Account from "./Account.js";
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

export { Toko, Account, OrderDetail }