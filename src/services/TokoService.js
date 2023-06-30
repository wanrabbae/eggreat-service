import Account from "../models/Account.js"
import Rekening from "../models/Rekening.js"
import Toko from "../models/Toko.js"
import jwt from "jsonwebtoken"
import { Op } from 'sequelize'

class TokoService {
    async createToko(payload) {
        return await Toko.create(payload)
    }

    async updateToko(payload, id) {
        return await Toko.update(payload, { where: { id: id } })
    }

    async getRekening(toko_id) {
        return await Rekening.findAll({ where: { toko_id: toko_id } })
    }

    async createRekening(payload) {
        return await Rekening.create(payload)
    }

    async updateRekening(payload, id) {
        return await Rekening.update(payload, { where: { id: id } })
    }

    async destroyRekening(id) {
        return await Rekening.destroy({ where: { id: id } })
    }
}

export default TokoService