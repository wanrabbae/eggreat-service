import { Router } from 'express'

import { verify, verifyToko } from '../middleware/verify.js'
import { getAccountOrder, postOrder, getOrderDetailAccount, getTokoOrder, updateStatusOrder, cancelOrder, confirmOrder, prosesOrder, reviewOrder } from '../controllers/order.controller.js'

const router = Router();

router.get("/order/:id", verify, getOrderDetailAccount);
router.get("/order", verify, getAccountOrder);
router.post("/order", verify, postOrder);

router.post("/order/:id/confirm", verify, confirmOrder);
router.post("/order/:id/cancel", verify, cancelOrder);
router.post("/order/:id/review", verify, reviewOrder);

// TOKO ORDER
router.get("/toko/order", verify, verifyToko, getTokoOrder);
router.get("/toko/order/:id", verify, getOrderDetailAccount);
router.post("/toko/order/:id/proses", verify, verifyToko, prosesOrder);

export default router