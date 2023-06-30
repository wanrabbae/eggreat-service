const { Router } = require('express')

import verify from '../middleware/verifyToken.js'
import { getProfile } from '../controllers/account.controller.js'

const router = Router();

router.post("/account/profile", verify, getProfile);

module.exports = router