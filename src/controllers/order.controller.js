import OrderService from '../services/OrderService.js'
import { generateInv } from '../utils/functions.js';

const service = new OrderService();

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

    try {
        const createOrder = await service.createOrder({
            account_id: req.account.id,
            address_id: address_account_id,
            toko_id: toko_id,
            total_harga: total_harga_produk,
            delivery_costs: delivery_costs,
            payment_type: payment_type,
            discount_amount: discount_amount,
            invoice: generateInv(),
        })

        if (createOrder) {
            for (let index = 0; index < order_detail.length; index++) {
                const orderDetail = order_detail[index];
                await service.createOrderDetail({
                    order_id: createOrder.id,
                    product_id: orderDetail.product_id,
                    quantity: orderDetail.quantity,
                    is_picked: orderDetail.is_picked
                })
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

export { getAccountOrder, getOrderDetailAccount, postOrder, getTokoOrder, updateStatusOrder }