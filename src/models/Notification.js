import Sequelize from "sequelize"
import db from "../../config/db-conf.js"
import Account from "./Account.js"

const Notification = db.define('notifications', {
    message: Sequelize.STRING,
    account_id: Sequelize.INTEGER,
    is_read: Sequelize.BOOLEAN,
    type: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Notification.belongsTo(Account, {
    foreignKey: "account_id"
})

export default Notification;