import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import Rekening from "./Rekening.js";
import Address from "./Alamat.js";

const Toko = db.define('toko', {
    account_id: Sequelize.INTEGER,
    address_id: Sequelize.INTEGER,
    is_delivery_product: Sequelize.BOOLEAN,
    is_picked_product: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Toko.hasMany(Rekening, {
    foreignKey: 'toko_id'
})

Toko.belongsTo(Address, {
    foreignKey: 'toko_id'
})

export default Toko;