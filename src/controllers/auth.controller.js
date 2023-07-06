import AccountService from '../services/AccountService.js'
import TokoService from '../services/TokoService.js'
import { hashPassword } from '../utils/functions.js'
import bcrypt from 'bcrypt'

const service = new AccountService();
const tokoService = new TokoService();

export const login = async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        const account = await service.getAccountEmailOrPhone(emailOrPhone)

        if (!account) {
            throw new Error('Oops! No. Telepon atau Email yang Anda masukkan tidak terdaftar!')
        }

        if (account.is_blocked == true) {
            throw new Error('Maaf akun anda sudah terblokir')
        }

        const isPasswordValid = await bcrypt.compare(password, account.password);

        if (!isPasswordValid) {
            throw new Error('Oops! Password yang Anda masukkan keliru!')
        }

        const token = await service.getAuthToken(account.id, account.email, account.fullname)

        return res.status(200).json({
            message: 'Login successfuly',
            token: token
        })
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export const register = async (req, res) => {
    const { fullname, phone, password, password_confirm } = req.body
    try {
        // validation
        // ...

        const hashedPassword = await hashPassword(password)

        const account = await service.createAccount({
            fullname,
            phone,
            password: hashedPassword
        })

        if (account) {
            await tokoService.createToko({
                account_id: account.id,
                address_id: 0
            })
        }

        return res.jsonSuccess('Register successfuly')
    } catch (error) {
        return res.errorBadRequest(error.message.toString())
    }
}