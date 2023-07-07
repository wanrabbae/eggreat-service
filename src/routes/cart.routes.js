import { Router } from 'express'

import { verify } from '../middleware/verify.js'
import { deleteCart, getCart, postCart, putCart } from '../controllers/cart.controller.js'

const router = Router();

router.get("/account/cart", verify, getCart);
router.post("/account/cart", verify, postCart);
router.put("/account/cart/:id", verify, putCart);
router.delete("/account/cart/:id", verify, deleteCart);

export default router