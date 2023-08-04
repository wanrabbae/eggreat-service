import { Router } from 'express'
import { blockPengguna, getPenggunaAll, unBlockPengguna } from '../../controllers/admin/pengguna.controller.js'
import { verifyAdmin } from '../../middleware/verifyAdmin.js'

const router = Router();

router.get("/admin/pengguna/list", verifyAdmin, getPenggunaAll);
router.post("/admin/pengguna/block/:id", verifyAdmin, blockPengguna);
router.post("/admin/pengguna/unblock/:id", verifyAdmin, unBlockPengguna);

export default router