import { Router } from 'express'

import { verify, verifyToko } from '../middleware/verify.js'
import { deleteProduct, getDetailProduct, getProductByToko, getProducts, postProduct, putProduct } from '../controllers/product.controller.js'

const router = Router();

// ETALASE / GLOBAL PRODUCTS
router.get("/products", getProducts);
router.get("/products/:id", getDetailProduct);

// TOKO PRODUCTS
router.get("/toko/product", verify, verifyToko, getProductByToko);
router.post("/toko/product", verify, verifyToko, postProduct);
router.put("/toko/product/:id", verify, verifyToko, putProduct);
router.delete("/toko/product/:id", verify, verifyToko, deleteProduct);

export default router