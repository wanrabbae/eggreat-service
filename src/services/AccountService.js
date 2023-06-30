import Account from "../models/Account.js"
import Toko from "../models/Toko.js"
import jwt from "jsonwebtoken"
import { Op } from 'sequelize'

class AccountService {
    async getAccount(id) {
        return await Account.findByPk(id, {
            attributes: {
                exclude: ['password']
            },
            include: Toko,
            raw: true,
            nest: true
        })
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

    async updateAccount(payload, id) {
        return await Account.update(payload, { where: { id: id } })
    }
}

export default AccountService