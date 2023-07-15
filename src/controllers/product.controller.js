import ProductService from '../services/ProductService.js'
import { deleteFile, handleUpload } from '../utils/handleUpload.js';

const service = new ProductService();

const getProducts = async (req, res) => {
    const ProductToko = await service.getProduct(req.query.category, req.query.search_key)
    return res.jsonData(ProductToko)
}

const getProductByToko = async (req, res) => {
    const ProductToko = await service.getProductByToko(req.account.toko_id, req.query.status)
    return res.jsonData(ProductToko)
}

const getDetailProduct = async (req, res) => {
    const ProductToko = await service.getDetailProduct(req.params.id)
    return res.jsonData(ProductToko)
}

const postProduct = async (req, res) => {
    try {
        if (!req.files[0]) {
            return res.errorBadRequest('Minimal upload 1 foto produk')
        }

        const product = await service.createProduct({
            toko_id: req.account.toko_id,
            category_id: req.body.category_id,
            product_name: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            quantity_unit: req.body.quantity_unit,
            stock: req.body.stock,
            is_delivery: req.body.is_delivery,
            shipping_costs: req.body.shipping_costs,
        })

        for (let index = 0; index < req.files.length; index++) {
            let file = req.files[index];
            let uploaded = await handleUpload(file)
            await service.createProductImage({ product_id: product.id, image: uploaded.Location })
        }

        return res.jsonSuccessCreated('Product created')
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
    const product = await service.getSingleProduct(req.params.id)

    if (product == null) return res.errorNotFound("Produk tidak ditemukan")

    const productImage = await service.getProductImage(req.params.id)

    if (productImage != null) {
        // delete files from S3
        for (let index = 0; index < productImage.length; index++) {
            const file = productImage[index];
            await deleteFile(file.image)
        }

        await service.destroyProductImage(req.params.id)
        await service.destroyProduct(req.params.id)
        return res.jsonSuccess()
    }

    return res.errorBadRequest()
}

const getCategories = async (req, res) => {
    const data = await service.getProductCategory()
    return res.jsonData(data)
}

export { getProducts, getProductByToko, getDetailProduct, postProduct, putProduct, deleteProduct, getCategories }