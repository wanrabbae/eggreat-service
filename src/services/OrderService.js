import Order from "../models/Order.js"
import OrderDetail from "../models/OrderDetail.js"
import Toko from "../models/Toko.js"
import Address from "../models/Alamat.js"
import Product from "../models/Product.js"
import ProductImage from "../models/ProductImage.js"

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
                    model: Toko
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

    async createOrder(payload) {
        return await Order.create(payload)
    }

    async updateOrder(payload, id) {
        return await Order.update(payload, { where: { id: id } })
    }

    async createOrderDetail(payload) {
        return await OrderDetail.create(payload)
    }
}

export default OrderService