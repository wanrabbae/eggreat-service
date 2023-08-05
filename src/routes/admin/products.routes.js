import { Router } from 'express'
import { stopProduct, getDetailProduct, getProductAll, getProductProblemAll, acceptProduct, getProductCheckAll, } from '../../controllers/admin/product.controller.js'
import { verifyAdmin } from '../../middleware/verifyAdmin.js'

const router = Router();

router.get("/admin/product/all", verifyAdmin, getProductAll);
router.get("/admin/product/problem", verifyAdmin, getProductProblemAll);
router.post("/admin/product/stop/:id", verifyAdmin, stopProduct);

router.get("/admin/product/check", verifyAdmin, getProductCheckAll);
router.get("/admin/product/rejected", verifyAdmin, getProductProblemAll);
router.post("/admin/product/accepted/:id", verifyAdmin, acceptProduct);
router.post("/admin/product/reject/:id", verifyAdmin, stopProduct);

router.get("/admin/product/:id", verifyAdmin, getDetailProduct);

export default router