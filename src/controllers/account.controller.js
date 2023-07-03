import AccountService from '../services/AccountService.js'
import { hashPassword } from '../utils/functions.js'
import { handleUpload } from '../utils/handleUpload.js'

const service = new AccountService();

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

        const upload = await handleUpload(req.file)

        await service.updateAccount({ foto: upload.Location }, req.account.id)

        return res.jsonSuccess('success update profile')
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export { getProfile, updateProfileFoto, updateProfile }