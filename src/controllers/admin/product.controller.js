import ProductService from '../../services/ProductService.js';

const service = new ProductService();

export const getProductAll = async (req, res) => {
    try {
        const current = Number(req.query.current) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (current - 1) * limit;
        const keyword = req.query.keyword

        const count = await service.getCountByQuery(keyword, "lolos");
        const list = await service.getProductPaginate(limit, offset, keyword, "lolos");

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

export const getProductProblemAll = async (req, res) => {
    try {
        const current = Number(req.query.current) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (current - 1) * limit;
        const keyword = req.query.keyword

        const count = await service.getCountByQuery(keyword, "tidak lolos");
        const list = await service.getProductPaginate(limit, offset, keyword, "tidak lolos");

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

export const getProductCheckAll = async (req, res) => {
    try {
        const current = Number(req.query.current) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (current - 1) * limit;
        const keyword = req.query.keyword

        const count = await service.getCountByQuery(keyword, "proses");
        const list = await service.getProductPaginate(limit, offset, keyword, "proses");

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

export const getDetailProduct = async (req, res) => {
    const ProductToko = await service.getDetailProduct(req.params.id)
    return res.jsonData(ProductToko)
}

export const stopProduct = async (req, res) => {
    try {
        const findData = await service.getSingleProduct(req.params.id)

        if (findData == null) return res.errorNotFound("Product tidak ditemukan")

        await service.updateProduct({ product_status: "tidak lolos", product_report: req.body.reason }, req.params.id)

        return res.jsonSuccess("Product stopped")
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export const acceptProduct = async (req, res) => {
    try {
        const findData = await service.getSingleProduct(req.params.id)

        if (findData == null) return res.errorNotFound("Product tidak ditemukan")

        await service.updateProduct({ product_status: "lolos", product_report: req.body.reason }, req.params.id)


        return res.jsonSuccess("Product accepted")
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}