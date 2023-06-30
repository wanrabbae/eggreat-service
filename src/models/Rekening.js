import Sequelize from "sequelize"
import db from "../../config/db-conf.js"

const Rekening = db.define('rekening', {
    toko_id: Sequelize.INTEGER,
    account_id: Sequelize.INTEGER,
    bank_name: Sequelize.STRING,
    bank_hold_name: Sequelize.STRING,
    bank_no: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

export default Rekening;