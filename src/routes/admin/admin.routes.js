import { Router } from 'express'
import { createAdmin, deleteAdmin, getAdminAll, updateAdmin } from '../../controllers/admin/admin.controller.js'
import { verifyAdmin } from '../../middleware/verifyAdmin.js'
import { upload } from '../../utils/handleUpload.js';

const router = Router();

router.get("/admin/list", verifyAdmin, getAdminAll);
router.post("/admin", verifyAdmin, upload.single('foto'), createAdmin);
router.put("/admin/:id", verifyAdmin, upload.single('foto'), updateAdmin);
router.delete("/admin/:id", verifyAdmin, deleteAdmin);

export default router