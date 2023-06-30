import Sequelize from "sequelize"
import db from "../../config/db-conf.js"

const Account = db.define('accounts', {
    fullname: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
    foto: Sequelize.STRING,
    verified_at: Sequelize.DATE,
    created_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Account.belongsTo(Employee, {
//   foreignKey: "employeeId",
// });

export default Account;