import CartService from '../services/CartService.js'

const service = new CartService();

const getCart = async (req, res) => {
    const Cart = await service.getCart(req.account.id)
    return res.jsonData(Cart)
}

const postCart = async (req, res) => {
    const { product_id, quantity } = req.body
    try {
        await service.createCart({
            account_id: req.account.id,
            product_id,
            quantity,
        })

        return res.jsonSuccessCreated()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const putCart = async (req, res) => {
    const { quantity } = req.body
    try {
        await service.updateCart({
            quantity,
        }, req.params.id)

        return res.jsonSuccess()
    } catch (error) {
        return res.errorBadRequest(error.message)
    }
}

const deleteCart = async (req, res) => {
    await service.destroyCart(req.params.id)
    return res.jsonSuccess()
}

export { getCart, postCart, putCart, deleteCart }