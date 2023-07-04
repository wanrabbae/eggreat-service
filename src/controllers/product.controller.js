import ProductService from '../services/ProductService.js'

const service = new ProductService();

const getProducts = async (req, res) => {
    const ProductToko = await service.getProduct(req.query.category)
    return res.jsonData(ProductToko)
}

const getProductByToko = async (req, res) => {
    const ProductToko = await service.getProductByToko(req.account.toko_id)
    return res.jsonData(ProductToko)
}

const getDetailProduct = async (req, res) => {
    const ProductToko = await service.getDetailProduct(req.params.id)
    return res.jsonData(ProductToko)
}

const postProduct = async (req, res) => {
    const { nama_Product, detail_Product, provinsi, kota, kecamatan, kelurahan, kodepos } = req.body

    try {
        await service.createProduct({
            account_id: req.account.id,
            nama_alamat: nama_alamat,
            detail_alamat: detail_alamat,
            provinsi: provinsi,
            kota: kota,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            kodepos: kodepos,
        })

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const putProduct = async (req, res) => {
    const { nama_alamat, detail_alamat, provinsi, kota, kecamatan, kelurahan, kodepos, is_selected } = req.body
    try {
        await service.updateProduct({
            nama_alamat: nama_alamat,
            detail_alamat: detail_alamat,
            provinsi: provinsi,
            kota: kota,
            kecamatan: kecamatan,
            kelurahan: kelurahan,
            kodepos: kodepos,
            is_selected: is_selected
        }, req.params.id)

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const deleteProduct = async (req, res) => {
    await service.destroyProduct(req.params.id)
    return res.jsonSuccess()
}

export { getProducts, getProductByToko, getDetailProduct, postProduct, putProduct, deleteProduct }