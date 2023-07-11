import Order from "../models/Order.js"
import OrderDetail from "../models/OrderDetail.js"
import sequelize from "../../config/db-conf.js"
import Toko from "../models/Toko.js"
import Address from "../models/Alamat.js"
import Product from "../models/Product.js"
import ProductImage from "../models/ProductImage.js"
import Account from "../models/Account.js"
import ProductRating from "../models/ProductRating.js"
import { Op } from "sequelize"
import moment from 'moment'

class OrderService {
    async getOrderAccount(account_id, status) {
        return await Order.findAll({
            where: { account_id: account_id, status: status },
            include: {
                model: OrderDetail,
                include: {
                    model: Product,
                    attributes: ["id", "product_name", "price"],
                    include: {
                        model: ProductImage,
                        limit: 1
                    },
                    // limit: 1
                }
            }
        })
    }

    async getOrderDetailAccount(id) {
        return await Order.findOne({
            where: { id: id },
            include: [
                {
                    model: Address
                },
                {
                    model: Toko,
                    include: {
                        model: Account,
                        attributes: ["id", "fullname"]
                    }
                },
                {
                    model: Account,
                    attributes: ["id", "fullname"]
                },
                {
                    model: OrderDetail,
                    include: {
                        model: Product,
                        attributes: ["id", "product_name", "price"],
                        include: {
                            model: ProductImage,
                            limit: 1
                        },
                    }
                }
            ]
        })
    }

    async getOrderToko(toko_id, status) {
        return await Order.findAll({
            where: { toko_id: toko_id, status: status == "new_order" ? "sudah dibayar" : status },
            include: {
                model: OrderDetail,
                include: {
                    model: Product,
                    attributes: ["id", "product_name", "price"],
                    include: {
                        model: ProductImage,
                        limit: 1
                    },
                }
            }
        })
    }

    async getSingleOrder(id) {
        return await Order.findByPk(id, {
            attributes: ["id"],
            include: [{
                model: OrderDetail,
                attributes: ["id", "product_id", "quantity"]
            }],
        })
    }

    async getOrderSales(toko_id, params) {
        let whereClause = {
            toko_id: toko_id,
            status: "selesai",
        }

        if (params.start_date && params.end_date) {
            const startDate = moment(params.start_date, 'DD/MM/YYYY').subtract(1, 'days').toDate();
            const endDate = moment(params.end_date, 'DD/MM/YYYY').add(1, 'days').toDate();
            whereClause.created_at = {
                [Op.between]: [startDate, endDate]
            }
        }

        return await Order.findAll({
            where: whereClause,
            attributes: [["id", "order_id"], ["created_at", "tanggal"], "invoice", ["total_harga", "penjualan"]],
        })
    }

    async getOrderSaleIncome(toko_id) {
        const income = await Order.findOne({
            where: {
                toko_id: toko_id,
                status: "selesai"
            },
            attributes: [
                [sequelize.fn('SUM', sequelize.col('total_harga')), 'totalIncome']
            ],
        })
        income.dataValues.totalIncome = parseInt(income.dataValues.totalIncome) || 0
        return income
    }

    async createOrder(payload) {
        return await Order.create(payload)
    }

    async updateOrder(payload, id) {
        return await Order.update(payload, { where: { id: id } })
    }

    async createOrderDetail(payload) {
        return await OrderDetail.create(payload)
    }

    async giveRating(payload) {
        return await ProductRating.create(payload)
    }
}

export default OrderService