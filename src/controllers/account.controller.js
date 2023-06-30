import AccountService from '../services/AccountService.js'
import { hashPassword } from '../utils/functions.js'

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
    console.log(req.file);
    res.send('success update profile')
}

export { getProfile, updateProfileFoto, updateProfile }