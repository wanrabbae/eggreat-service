import Account from "./Account.js";
import Toko from "./Toko.js";

// DEFINE REF YANG ERROR DISIINI AGAR TIDAK ERROR

Toko.belongsTo(Account, {
    foreignKey: "account_id"
})

export { Toko, Account }