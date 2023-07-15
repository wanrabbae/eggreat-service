import AdminService from '../../services/AdminService.js';
import { handleUpload } from '../../utils/handleUpload.js';
import { hashPassword } from '../../utils/functions.js'

const service = new AdminService();

export const getAdminAll = async (req, res) => {
    try {
        const current = Number(req.query.current) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (current - 1) * limit;

        const count = await service.getCountByQuery();
        const list = await service.getAdminAll(limit, offset);

        return res.jsonData({
            pagination: {
                total: count,
                per_page: limit,
                current_page: current,
                last_page: Math.ceil(count / limit),
            },
            list: list,
        });
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export const createAdmin = async (req, res) => {
    const { fullname, username, phone, nik, address, role, password } = req.body
    try {
        let foto = null;

        if (req.file) {
            const upload = await handleUpload(req.file)
            foto = upload.Location
        }

        let newPw = await hashPassword(password)

        await service.createAdmin({ foto, fullname, username, phone, nik, address, role, password: newPw })

        return res.jsonSuccessCreated("Data created")
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}