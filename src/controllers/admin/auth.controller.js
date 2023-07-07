import AdminService from '../../services/AdminService.js';
import bcrypt from 'bcrypt'

const service = new AdminService();

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await service.getAdminUsername(username)

        if (!admin) {
            throw new Error('Oops! Username yang Anda masukkan tidak terdaftar!')
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            throw new Error('Oops! Password yang Anda masukkan keliru!')
        }

        const token = await service.getAuthToken(admin.id, admin.email, admin.fullname)

        return res.status(200).json({
            message: 'Login successfuly',
            token: token
        })
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}