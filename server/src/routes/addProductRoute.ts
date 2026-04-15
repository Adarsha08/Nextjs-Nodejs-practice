import { Router } from "express";
import {addProduct} from '../controllers/addProduct'
import {verifyToken} from '../middlewares/authMiddleware'

const router =Router()
router.post('/',verifyToken,addProduct)
export default router