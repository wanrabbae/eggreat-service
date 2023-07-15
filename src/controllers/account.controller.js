import AccountService from '../services/AccountService.js'
import TokoService from '../services/TokoService.js'
import { hashPassword } from '../utils/functions.js'
import { deleteFile, handleUpload } from '../utils/handleUpload.js'

const service = new AccountService();
const tokoService = new TokoService();

const getProfile = async (req, res) => {
    const profile = await service.getAccount(req.account.id)
    return res.jsonData(profile)
}

const updateProfile = async (req, res) => {
    const { fullname, phone, password, email } = req.body
    try {
        const payload = { fullname, phone, email }

        if (password || password != null) {
            payload.password = await hashPassword(password)
        }

        await service.updateAccount(payload, req.account.id)

        return res.jsonSuccess('success update profile')
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const updateProfileFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.errorBadRequest('foto is required!')
        }

        const account = await service.getSingleAccount(req.account.id)

        const upload = await handleUpload(req.file)

        if (account.foto != null) await deleteFile(account.foto)

        await service.updateAccount({ foto: upload.Location }, req.account.id)

        return res.jsonSuccess('success update profile')
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const updateOrderSettingToko = async (req, res) => {
    try {
        await tokoService.updateToko({
            is_delivery_product: req.body.is_delivery_product, is_picked_product: req.body.is_picked_product
        }, req.account.toko_id)

        return res.jsonSuccess('success update toko order setting')
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export { getProfile, updateProfileFoto, updateProfile, updateOrderSettingToko }