import Cart from "../models/Cart.js"
import Product from "../models/Product.js"
import ProductImage from "../models/ProductImage.js"

class CartService {
    async getCart(account_id) {
        return await Cart.findAll({
            where: { account_id: account_id },
            include: {
                model: Product,
                attributes: ["id", "product_name", "stock", "price", "product_status", "is_delivery", "toko_id"],
                include: ProductImage
            }
        })
    }

    async createCart(payload) {
        return await Cart.create(payload)
    }

    async updateCart(payload, id) {
        return await Cart.update(payload, { where: { id: id } })
    }

    async destroyCart(id) {
        return await Cart.destroy({ where: { id: id } })
    }

    async destroyCartByAccountIdAndProductId(account_id, product_id) {
        return await Cart.destroy({ where: { account_id, product_id } })
    }
}

export default CartService