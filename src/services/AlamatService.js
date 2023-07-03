import Alamat from "../models/Alamat.js"
import { Op } from 'sequelize'

class AlamatService {
    async getAlamat(account_id) {
        return await Alamat.findAll({ where: { account_id: account_id } })
    }

    async getAlamatByToko(toko_id) {
        return await Alamat.findOne({ where: { toko_id: toko_id } })
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

    async updateAlamatByToko(payload, toko_id) {
        return await Alamat.update(payload, { where: { toko_id: toko_id } })
    }
}

export default AlamatService