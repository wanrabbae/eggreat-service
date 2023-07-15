import { Router } from 'express'
import { createAdmin, getAdminAll } from '../../controllers/admin/admin.controller.js'
import { verifyAdmin } from '../../middleware/verifyAdmin.js'
import { upload } from '../../utils/handleUpload.js';

const router = Router();

router.get("/admin/list", verifyAdmin, getAdminAll);
router.post("/admin", verifyAdmin, upload.single('foto'), createAdmin);

export default router