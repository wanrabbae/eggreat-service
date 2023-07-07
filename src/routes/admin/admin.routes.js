import { Router } from 'express'
import { getAdminAll } from '../../controllers/admin/admin.controller.js'
import { verifyAdmin } from '../../middleware/verifyAdmin.js'

const router = Router();

router.get("/list", verifyAdmin, getAdminAll);

export default router