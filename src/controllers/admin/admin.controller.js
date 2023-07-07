import AdminService from '../../services/AdminService.js';

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