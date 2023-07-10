import { Router } from 'express'

import { verify, verifyToko } from '../middleware/verify.js'
import { getAccountOrder, postOrder, getOrderDetailAccount, getTokoOrder, updateStatusOrder, cancelOrder, confirmOrder, prosesOrder } from '../controllers/order.controller.js'

const router = Router();

router.post("/order/confirm/:id", verify, confirmOrder);
router.post("/order/cancel/:id", verify, cancelOrder);
router.get("/order/:id", verify, getOrderDetailAccount);
router.get("/order", verify, getAccountOrder);
router.post("/order", verify, postOrder);

// TOKO ORDER
router.get("/toko/order", verify, verifyToko, getTokoOrder);
router.post("/toko/order/proses/:id", verify, verifyToko, prosesOrder);

export default router