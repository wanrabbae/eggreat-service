import Product from "../models/Product.js"
import { Op } from 'sequelize'
import ProductImage from "../models/ProductImage.js"
import ProductCategory from "../models/ProductCategory.js"
import ProductRating from "../models/ProductRating.js"
import { Toko, Account } from "../models/index.js"
import Address from "../models/Alamat.js"

class ProductService {
    async getProduct(category_name) {
        let whereCond = {
            category_name: category_name
        }

        if (category_name == 'all' || !category_name) whereCond = {}

        return await Product.findAll({
            attributes: ["id", "product_name", "price", "product_status", "created_at"],
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

    async getProductByToko(toko_id) {
        return await Product.findAll({
            attributes: ["id", "product_name", "price", "created_at"],
            where: { toko_id: toko_id },
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

    async createProduct(payload) {
        return await Product.create(payload)
    }

    async updateProduct(payload, id) {
        return await Product.update(payload, { where: { id: id } })
    }

    async destroyProduct(id) {
        return await Product.destroy({ where: { id: id } })
    }
}

export default ProductService