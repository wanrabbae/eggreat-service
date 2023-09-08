import { Router } from 'express'
import { login } from '../../controllers/admin/auth.controller.js'

const router = Router();

router.post("/admin/login", login);

export default router