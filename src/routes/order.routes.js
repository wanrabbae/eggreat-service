import { Router } from 'express'

import { verify, verifyToko } from '../middleware/verify.js'
import { getAccountOrder, postOrder, getOrderDetailAccount, getTokoOrder, updateStatusOrder } from '../controllers/order.controller.js'

const router = Router();

router.post("/order/confirm/:id", verify, updateStatusOrder);
router.get("/order/:id", verify, getOrderDetailAccount);
router.get("/order", verify, getAccountOrder);
router.post("/order", verify, postOrder);

// TOKO ORDER
router.get("/toko/order", verify, verifyToko, getTokoOrder);
router.put("/toko/order/:id", verify, verifyToko, updateStatusOrder);

export default router