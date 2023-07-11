import OrderService from '../services/OrderService.js'
import ProductService from '../services/ProductService.js'
import { generateInv } from '../utils/functions.js';

const service = new OrderService();
const productService = new ProductService();

const getAccountOrder = async (req, res) => {
    const Order = await service.getOrderAccount(req.account.id, req.query.status)
    return res.jsonData(Order)
}

const getOrderDetailAccount = async (req, res) => {
    const Order = await service.getOrderDetailAccount(req.params.id)
    return res.jsonData(Order)
}

const getTokoOrder = async (req, res) => {
    const Order = await service.getOrderToko(req.account.toko_id, req.query.status)
    return res.jsonData(Order)
}

const postOrder = async (req, res) => {
    const { address_account_id, toko_id, total_harga_produk, delivery_costs, discount_amount, payment_type, order_detail } = req.body

    let total_harga = (parseInt(total_harga_produk) + parseInt(delivery_costs))
    if (parseInt(discount_amount) > 0) total_harga = total_harga - (total_harga * (parseInt(discount_amount) / 100))

    try {
        const createOrder = await service.createOrder({
            account_id: req.account.id,
            address_id: address_account_id,
            toko_id: toko_id,
            total_harga: total_harga,
            total_harga_produk: total_harga_produk,
            delivery_costs: delivery_costs,
            payment_type: payment_type,
            discount_amount: discount_amount,
            invoice: generateInv(),
        })

        if (createOrder) {
            for (let index = 0; index < order_detail.length; index++) {
                const orderDetail = order_detail[index];
                const checkProduct = await productService.getSingleProduct(orderDetail.product_id)

                // if(checkProduct.stock < orderDetail.quantity) {
                //     return res.errorBadRequest('Oops! Salah satu stok produk tidak mencukupi')
                // }

                await service.createOrderDetail({
                    order_id: createOrder.id,
                    product_id: orderDetail.product_id,
                    quantity: orderDetail.quantity,
                    is_picked: orderDetail.is_picked
                })

                const newStock = checkProduct.stock - orderDetail.quantity
                await productService.updateProduct({ stock: newStock }, orderDetail.product_id)
            }
        }

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const updateStatusOrder = async (req, res) => {
    const { status } = req.body
    try {
        await service.updateOrder({
            status,
        }, req.params.id)

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const cancelOrder = async (req, res) => {
    try {
        const findOrder = await service.getSingleOrder(req.params.id)
        await service.updateOrder({
            status: "dibatalkan",
        }, req.params.id)

        for (let index = 0; index < findOrder.order_details.length; index++) {
            const element = findOrder.order_details[index];
            const checkProduct = await productService.getSingleProduct(element.product_id)
            const newStock = checkProduct.stock + element.quantity
            await productService.updateProduct({ stock: newStock }, element.product_id)
        }

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const confirmOrder = async (req, res) => {
    try {
        await service.updateOrder({
            status: "diterima",
        }, req.params.id)

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const prosesOrder = async (req, res) => {
    try {
        await service.updateOrder({
            status: "proses",
        }, req.params.id)

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const reviewOrder = async (req, res) => {
    try {
        const findOrder = await service.getSingleOrder(req.params.id)

        await service.updateOrder({
            status: "selesai",
        }, req.params.id)

        for (let index = 0; index < findOrder.order_details.length; index++) {
            const element = findOrder.order_details[index];
            await service.giveRating({
                product_id: element.product_id,
                account_id: req.account.id,
                order_id: req.params.id,
                message: req.body.message,
                rate: req.body.rate,
            })
        }

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const getSalesToko = async (req, res) => {
    try {
        const params = { start_date: req.query.start_date, end_date: req.query.end_date }
        const sales = await service.getOrderSales(req.account.toko_id, params)

        return res.jsonData(sales)
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const getSalesIncomeToko = async (req, res) => {
    try {
        const sales = await service.getOrderSaleIncome(req.account.toko_id)

        return res.jsonData(sales)
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

export { getAccountOrder, getOrderDetailAccount, postOrder, getTokoOrder, updateStatusOrder, cancelOrder, confirmOrder, prosesOrder, reviewOrder, getSalesToko, getSalesIncomeToko }