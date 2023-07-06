import { Router } from 'express'

import { verify, verifyToko } from '../middleware/verify.js'
import { deleteProduct, getCategories, getDetailProduct, getProductByToko, getProducts, postProduct, putProduct } from '../controllers/product.controller.js'
import { upload } from '../utils/handleUpload.js';

const router = Router();

router.get("/products/category", getCategories); // CATEGORIES

// ETALASE / GLOBAL PRODUCTS
router.get("/products", getProducts);
router.get("/products/:id", getDetailProduct);

// TOKO PRODUCTS
router.get("/toko/product", verify, verifyToko, getProductByToko);
router.post("/toko/product", verify, verifyToko, upload.array('image'), postProduct);
router.put("/toko/product/:id", verify, verifyToko, putProduct);
router.delete("/toko/product/:id", verify, verifyToko, deleteProduct);


export default router