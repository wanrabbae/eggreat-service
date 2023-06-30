import { Router } from 'express'

import { verify } from '../middleware/verify.js'
import { getProfile, updateProfile, updateProfileFoto } from '../controllers/account.controller.js'
import { upload } from '../utils/handleUpload.js';

const router = Router();

router.get("/account/profile", verify, getProfile);
router.put("/account/profile", verify, updateProfile);
router.put("/account/profile/foto", verify, upload.single('foto'), updateProfileFoto);

export default router