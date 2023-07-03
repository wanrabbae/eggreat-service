import { Router } from 'express'

import { verify, verifyToko } from '../middleware/verify.js'
import { deleteAlamat, getAlamat, getAlamatToko, postAlamat, putAlamat, setAlamatToko } from '../controllers/address.controller.js'

const router = Router();

router.get("/account/alamat", verify, getAlamat);
router.post("/account/alamat", verify, postAlamat);
router.put("/account/alamat/:id", verify, putAlamat);
router.delete("/account/alamat/:id", verify, deleteAlamat);

router.get("/toko/alamat", verify, verifyToko, getAlamatToko);
router.post("/toko/alamat", verify, verifyToko, setAlamatToko);

export default router