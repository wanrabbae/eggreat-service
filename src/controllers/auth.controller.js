import AccountService from '../services/AccountService.js'
import bcrypt from 'bcrypt'

const service = new AccountService();

export const login = async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        const account = await service.getAccountEmailOrPhone(emailOrPhone)

        if (!account) {
            throw new Error('Oops! No. Telepon atau Email yang Anda masukkan tidak terdaftar!')
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

        const account = await service.createAccount({
            fullname,
            phone,
            password
        })

        return res.jsonSuccess('Register successfuly')
    } catch (error) {
        return res.errorBadRequest(error.message.toString())
    }
}