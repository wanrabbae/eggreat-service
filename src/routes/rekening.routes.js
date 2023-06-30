import { Router } from 'express'

import { verify, verifyToko } from '../middleware/verify.js'
import { deleteRekening, getRekening, postRekening, putRekening } from '../controllers/rekening.controller.js'

const router = Router();

router.get("/toko/rekening", verify, verifyToko, getRekening);
router.post("/toko/rekening", verify, verifyToko, postRekening);
router.put("/toko/rekening/:id", verify, verifyToko, putRekening);
router.delete("/toko/rekening/:id", verify, verifyToko, deleteRekening);

export default router