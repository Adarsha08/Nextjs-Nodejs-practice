import {Router} from "express";
import {registerUser} from '../controllers/signup'
const router=Router()
 
router.post('/register',registerUser)

export default router