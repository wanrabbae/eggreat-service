import Sequelize from "sequelize"
import db from "../../config/db-conf.js"

const Admin = db.define('admins', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    fullname: Sequelize.STRING,
    foto: Sequelize.STRING,
    phone: Sequelize.STRING,
    nik: Sequelize.INTEGER,
    address: Sequelize.TEXT,
    role: Sequelize.STRING,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

export default Admin;