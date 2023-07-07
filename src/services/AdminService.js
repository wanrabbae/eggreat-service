import Admin from "../models/Admin.js"
import jwt from "jsonwebtoken"
import { Op } from 'sequelize'

class AdminService {
    async getAdmin(id) {
        return await Admin.findByPk(id, {
            attributes: {
                exclude: ['password']
            },
            raw: true,
            nest: true
        })
    }

    async getAdminAll(limit, offset) {
        return await Admin.findAll({
            attributes: {
                exclude: ['password']
            },
            raw: true,
            nest: true,
            limit,
            offset
        })
    }

    async getCountByQuery() {
        return await Admin.count()
    }

    async getAdminUsername(username) {
        return await Admin.findOne({
            where: {
                username: username
            },
        });
    }

    getAuthToken(id, username, fullname) {
        return jwt.sign(
            {
                id: id,
                username: username,
                fullname: fullname,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );
    }

    async getSingleAdmin(id) {
        return await Admin.findByPk(id, {
            attributes: ["id", "username"],
            raw: true,
            nest: true
        })
    }

    async createAdmin(payload) {
        return await Admin.create(payload)
    }

    async updateAdmin(payload, id) {
        return await Admin.update(payload, { where: { id: id } })
    }

    async destroyAdmin(id) {
        return await Admin.destroy({ where: { id: id } })
    }
}

export default AdminService