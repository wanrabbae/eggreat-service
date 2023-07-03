import TokoService from '../services/TokoService.js'

const service = new TokoService();

const getRekening = async (req, res) => {
    const rekening = await service.getRekening(req.account.toko_id)
    return res.jsonData(rekening)
}

const postRekening = async (req, res) => {
    const { bank_name, bank_hold_name, bank_no } = req.body
    try {
        await service.createRekening({
            toko_id: req.account.toko_id,
            bank_name,
            bank_hold_name,
            bank_no
        })

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const putRekening = async (req, res) => {
    const { bank_name, bank_hold_name, bank_no } = req.body
    try {
        await service.updateRekening({
            bank_name,
            bank_hold_name,
            bank_no
        }, req.params.id)

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const deleteRekening = async (req, res) => {
    await service.destroyRekening(req.params.id)
    return res.jsonSuccess()
}

export { getRekening, postRekening, putRekening, deleteRekening }