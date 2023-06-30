import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import Toko from "./Toko.js";
import Address from "./Alamat.js";

const Account = db.define('accounts', {
    fullname: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
    foto: Sequelize.STRING,
    fcm: Sequelize.STRING,
    verified_at: Sequelize.DATE,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Account.hasOne(Toko, {
    foreignKey: "account_id",
})

Account.hasMany(Address, {
    foreignKey: 'account_id'
})

export default Account;