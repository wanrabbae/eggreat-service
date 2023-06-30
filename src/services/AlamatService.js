import Alamat from "../models/Alamat.js"
import { Op } from 'sequelize'

class AlamatService {
    async getAlamat(account_id) {
        return await Alamat.findAll({ where: { account_id: account_id } })
    }

    async createAlamat(payload) {
        return await Alamat.create(payload)
    }

    async updateAlamat(payload, id) {
        return await Alamat.update(payload, { where: { id: id } })
    }

    async destroyAlamat(id) {
        return await Alamat.destroy({ where: { id: id } })
    }
}

export default AlamatService