import Product from "../models/Product.js"
import { Op } from 'sequelize'
import ProductImage from "../models/ProductImage.js"
import ProductCategory from "../models/ProductCategory.js"
import ProductRating from "../models/ProductRating.js"
import { Toko, Account } from "../models/index.js"
import Address from "../models/Alamat.js"

class ProductService {
    async getProduct(category_name, search_key) {
        let whereProduct = {
            product_status: "lolos"
        }
        let whereCond = {
            category_name: category_name,
        }

        if (category_name == 'all' || !category_name) whereCond = {}

        if (search_key && search_key != '') whereProduct.product_name = {
            [Op.like]: `%${search_key}%`
        }

        return await Product.findAll({
            attributes: ["id", "product_name", "price", "product_status", "created_at"],
            where: whereProduct,
            include: [
                {
                    model: ProductImage,
                    attributes: ["id", "image"],
                },
                {
                    model: ProductCategory,
                    attributes: ["id", "category_name"],
                    where: whereCond
                },
            ]
        })
    }

    async getProductByToko(toko_id, status) {
        let whereCond = { toko_id: toko_id }

        if (status == 'stok_habis') whereCond.stock = 0
        if (status == 'oncheck') whereCond.product_status = "proses"

        return await Product.findAll({
            attributes: ["id", "product_name", "product_status", "price", "created_at"],
            where: whereCond,
            include: [
                {
                    model: ProductImage
                },
                {
                    model: ProductCategory,
                    attributes: ["id", "category_name"],
                },
            ]
        })
    }

    async getDetailProduct(id) {
        return await Product.findOne({
            where: { id: id },
            include: [
                {
                    model: ProductImage
                },
                {
                    model: ProductCategory
                },
                {
                    model: ProductRating,
                    include: Account
                },
                {
                    model: Toko,
                    include: [
                        {
                            model: Address
                        },
                        {
                            model: Account
                        },
                    ]
                }
            ]
        })
    }

    async getSingleProduct(id) {
        return await Product.findByPk(id, { attributes: ["id", "toko_id", "stock"], raw: true, nest: true })
    }

    async createProduct(payload) {
        return await Product.create(payload)
    }

    async updateProduct(payload, id) {
        return await Product.update(payload, { where: { id: id } })
    }

    async destroyProduct(id) {
        return await Product.destroy({ where: { id: id } })
    }

    async getProductCategory() {
        return await ProductCategory.findAll({ raw: true, nest: true, attributes: ["id", "category_name"] })
    }

    async getProductImage(product_id) {
        return await ProductImage.findAll({ raw: true, nest: true, where: { product_id } })
    }

    async createProductImage(payload) {
        return await ProductImage.create(payload)
    }

    async destroyProductImage(product_id) {
        return await ProductImage.destroy({ where: { product_id: product_id } })
    }
}

export default ProductService