import AlamatService from '../services/AlamatService.js'

const service = new AlamatService();

const getAlamat = async (req, res) => {
    const rekening = await service.getAlamat(req.account.id)
    return res.jsonData(rekening)
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

        return res.jsonSuccess()
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

export { getAlamat, postAlamat, putAlamat, deleteAlamat }