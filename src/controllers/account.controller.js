import AccountService from '../services/AccountService.js'

const service = new AccountService();

export const getProfile = async (req, res) => {
    const profile = await service.getAccount(req.account.id)
    return res.jsonData(profile)
}