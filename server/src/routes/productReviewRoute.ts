import { Router } from "express";
import {createReview} from '../controllers/productReview'
import {verifyToken} from '../middlewares/authMiddleware'
const router=Router()

router.post('/:id',verifyToken,createReview)

export default router