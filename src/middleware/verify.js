import jwt from 'jsonwebtoken'
import AccountService from '../services/AccountService.js'

const service = new AccountService();

const verify = async (req, res, next) => {
    const header = req.header('Authorization')
    if (!header) {
        return res.errorUnauthorized("Unauthorized")
    }
    try {
        const token = header.split(' ')
        const verified = jwt.verify(token[1], process.env.JWT_SECRET)
        req.account = verified

        return next()
    } catch (err) {
        return res.errorUnauthorized("Unauthorized")
    }
}

const verifyToko = async (req, res, next) => {
    const account = await service.getAccount(req.account.id)
    if (account && account.toko != null) {
        req.account.toko_id = account.toko.id
        return next()
    }
    return res.errorUnauthorized("Unauthorized, only Penjual!")
}

export { verify, verifyToko }