import Product from "../models/Product.js"
import { Op } from 'sequelize'
import sequelize from "../../config/db-conf.js"
import ProductImage from "../models/ProductImage.js"
import ProductCategory from "../models/ProductCategory.js"
import ProductRating from "../models/ProductRating.js"
import OrderDetail from "../models/OrderDetail.js"
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

        const products = await Product.findAll({
            attributes: ["id", "product_name", "price", "product_status", "created_at", "stock", "category_id", [sequelize.literal('(SELECT SUM(quantity) FROM `order_detail` WHERE `order_detail`.`product_id` = `products`.`id`)'), 'sold']],
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
                {
                    model: ProductRating,
                    attributes: [
                        [sequelize.fn('AVG', sequelize.col('rate')), 'averageRating'],
                    ],
                    required: false,
                },
            ],
            group: ['products.id', 'product_category.id', 'product_images.id', 'product_ratings.id'],
        });

        const productsWithRatings = products.map((product) => {
            const averageRating = parseFloat(product.product_ratings[0]?.dataValues.averageRating) || 0;

            return {
                id: product.id,
                product_name: product.product_name,
                price: product.price,
                stock: product.stock,
                product_status: product.product_status,
                created_at: product.created_at,
                product_images: product.product_images,
                product_category: product.product_category,
                averageRating: averageRating,
                sold: parseInt(product.dataValues.sold)
            };
        });

        return productsWithRatings;
    }

    async getProductByToko(toko_id, status) {
        let whereCond = { toko_id: toko_id }

        if (status == 'stok_habis') whereCond.stock = 0
        if (status == 'oncheck') whereCond.product_status = "proses"

        const products = await Product.findAll({
            attributes: ["id", "product_name", "stock", "product_status", "price", "created_at", "category_id", [sequelize.literal('(SELECT SUM(quantity) FROM `order_detail` WHERE `order_detail`.`product_id` = `products`.`id`)'), 'sold']],
            where: whereCond,
            include: [
                {
                    model: ProductImage
                },
                {
                    model: ProductCategory,
                    attributes: ["id", "category_name"],
                },
                {
                    model: ProductRating,
                    attributes: [
                        [sequelize.fn('AVG', sequelize.col('rate')), 'averageRating'],
                    ],
                    required: false,
                },
            ],
            group: ['products.id', 'product_category.id', 'product_images.id', 'product_ratings.id'],
        })

        const productsWithRatings = products.map((product) => {
            const averageRating = parseFloat(product.product_ratings[0]?.dataValues.averageRating) || 0;

            return {
                id: product.id,
                product_name: product.product_name,
                price: product.price,
                stock: product.stock,
                product_status: product.product_status,
                created_at: product.created_at,
                product_images: product.product_images,
                product_category: product.product_category,
                averageRating: averageRating,
                sold: parseInt(product.dataValues.sold),
            };
        });

        return productsWithRatings;
    }

    async getDetailProduct(id) {
        const product = await Product.findOne({
            where: { id: id },
            attributes: ['id', 'toko_id', 'category_id', 'product_name', 'description', 'price', 'quantity', 'quantity_unit', 'stock', 'is_delivery', 'shipping_costs', 'product_status', 'product_report', 'created_at', [sequelize.literal('(SELECT SUM(quantity) FROM `order_detail` WHERE `order_detail`.`product_id` = `products`.`id`)'), 'sold'], [sequelize.literal('(SELECT AVG(rate) FROM `product_ratings` WHERE `product_ratings`.`product_id` = `products`.`id`)'), 'averageRating']],
            include: [
                {
                    model: ProductImage
                },
                {
                    model: ProductCategory
                },
                {
                    model: ProductRating,
                    attributes: ["id", "message", "rate"],
                    include: {
                        model: Account,
                        attributes: ["id", "fullname", "foto"]
                    }
                },
                {
                    model: Toko,
                    attributes: ["id", "account_id", "is_delivery_product", "is_picked_product"],
                    include: [
                        // {
                        //     model: Address
                        // },
                        {
                            model: Account,
                            attributes: ["id", "fullname"]
                        },
                    ]
                }
            ]
        })

        product.dataValues.sold = parseInt(product.dataValues.sold) || 0
        product.dataValues.averageRating = parseFloat(product.dataValues.averageRating) || 0

        return product
    }

    async getSingleProduct(id) {
        return await Product.findByPk(id, { attributes: ["id", "toko_id", "stock"], raw: true, nest: true })
    }

    async getProductPaginate(limit, offset, keyword, status = "lolos") {
        let where = {}

        if (keyword != null || keyword != undefined) where = {
            product_name: { [Op.like]: `%${keyword}%` },
        }

        return await Product.findAll({
            where: { ...where, product_status: status },
            attributes: ["id", "product_name", "price", "quantity", "quantity_unit", "product_status", "product_report", "created_at"],
            include: [
                {
                    model: ProductImage,
                    attributes: ["id", "image"],
                    limit: 1
                },
                {
                    model: Toko,
                    attributes: ["id", "account_id"],
                    include: [
                        {
                            model: Account,
                            attributes: ["id", "fullname"]
                        },
                    ]
                }
            ],
            raw: true,
            nest: true,
            limit,
            offset
        })
    }

    async getCountByQuery(keyword, status = "lolos") {
        let where = {}

        if (keyword != null || keyword != undefined) where = {
            product_name: { [Op.like]: `%${keyword}%` },
        }

        return await Product.count({ where: { ...where, product_status: status } })
    }

    async createProduct(payload) {
        return await Product.create(payload)
    }

    async updateProduct(payload, id) {
        return await Product.update(payload, { where: { id: id } })
    }

    async updateProductStock(stock, id, options) {
        return await Product.update({ stock }, { where: { id: id }, ...options })
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