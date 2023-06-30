import Sequelize from "sequelize"
import db from "../../config/db-conf.js"

const Address = db.define('addresses', {
    account_id: Sequelize.INTEGER,
    toko_id: Sequelize.INTEGER,
    nama_alamat: Sequelize.STRING,
    detail_alamat: Sequelize.STRING,
    provinsi: Sequelize.STRING,
    kota: Sequelize.STRING,
    kecamatan: Sequelize.STRING,
    kelurahan: Sequelize.STRING,
    kodepos: Sequelize.INTEGER,
    is_selected: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

export default Address;