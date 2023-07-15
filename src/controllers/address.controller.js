import AlamatService from '../services/AlamatService.js'

const service = new AlamatService();

const getAlamat = async (req, res) => {
    const alamatToko = await service.getAlamat(req.account.id)
    return res.jsonData(alamatToko)
}

const getAlamatToko = async (req, res) => {
    const alamatToko = await service.getAlamatByToko(req.account.toko_id)
    return res.jsonData(alamatToko)
}

const postAlamat = async (req, res) => {
    const { nama_alamat, detail_alamat, provinsi, kota, kecamatan, kelurahan, kodepos } = req.body

    try {
        await service.createAlamat({
            account_id: req.account.id,
            nama_alamat: nama_alamat,
            detail_alamat: detail_alamat,
            provinsi: provinsi,
            kota: kota,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            kodepos: kodepos,
        })

        return res.jsonSuccessCreated()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const putAlamat = async (req, res) => {
    const { nama_alamat, detail_alamat, provinsi, kota, kecamatan, kelurahan, kodepos, is_selected } = req.body
    try {
        await service.updateAlamat({
            nama_alamat: nama_alamat,
            detail_alamat: detail_alamat,
            provinsi: provinsi,
            kota: kota,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            kodepos: kodepos,
            is_selected: is_selected
        }, req.params.id)

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const deleteAlamat = async (req, res) => {
    await service.destroyAlamat(req.params.id)
    return res.jsonSuccess()
}

const setAlamatToko = async (req, res) => {
    const { nama_alamat, detail_alamat, provinsi, kota, kecamatan, kelurahan, kodepos } = req.body

    try {
        const checkAddr = await service.getAlamatByToko(req.account.toko_id)

        if (checkAddr != null) {
            await service.updateAlamatByToko({
                nama_alamat: nama_alamat,
                detail_alamat: detail_alamat,
                provinsi: provinsi,
                kota: kota,
                kecamatan: kecamatan,
                kelurahan: kelurahan,
                kodepos: kodepos,
            }, req.account.toko_id)
        } else {
            await service.createAlamat({
                toko_id: req.account.toko_id,
                nama_alamat: nama_alamat,
                detail_alamat: detail_alamat,
                provinsi: provinsi,
                kota: kota,
                kecamatan: kecamatan,
                kelurahan: kelurahan,
                kodepos: kodepos,
            })
        }

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export { getAlamat, postAlamat, putAlamat, deleteAlamat, getAlamatToko, setAlamatToko }