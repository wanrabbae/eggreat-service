import Account from "../models/Account.js"
import jwt from "jsonwebtoken"
import { Op } from 'sequelize'

class AccountService {
    async getAccount(id) {
        return await Account.scope('withoutPassword').findByPk(id)
    }

    async getAccountPhone(phone) {
        return await Account.findOne({ where: { phone: phone }, attributes: ['id', 'phone'] })
    }

    async getAccountEmailOrPhone(emailOrPhone) {
        return await Account.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrPhone },
                    { phone: emailOrPhone },
                ],
            },
        });
    }

    getAuthToken(id, email, fullname) {
        return jwt.sign(
            {
                id: id,
                email: email,
                fullname: fullname,
            },
            process.env.JWT_SECRET,
            { expiresIn: "365d" }
        );
    }

    async createAccount(payload) {
        return await Account.create(payload)
    }
}

export default AccountService