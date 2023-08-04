import AccountService from '../../services/AccountService.js';

const service = new AccountService();

export const getPenggunaAll = async (req, res) => {
    try {
        const current = Number(req.query.current) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (current - 1) * limit;
        const keyword = req.query.keyword

        const count = await service.getCountByQuery(keyword);
        const list = await service.getPenggunaAll(limit, offset, keyword);

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

export const blockPengguna = async (req, res) => {
    try {
        const findData = await service.getAccount(req.params.id)

        if (findData == null) return res.errorNotFound("Pengguna tidak ditemukan")

        await service.updateAccount({ is_blocked: true }, req.params.id)

        return res.jsonSuccess("Pengguna blocked")
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export const unBlockPengguna = async (req, res) => {
    try {
        const findData = await service.getAccount(req.params.id)

        if (findData == null) return res.errorNotFound("Pengguna tidak ditemukan")

        await service.updateAccount({ is_blocked: false }, req.params.id)

        return res.jsonSuccess("Pengguna unblocked")
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}