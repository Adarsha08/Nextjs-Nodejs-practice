import {Router} from "express";
import {registerUser,userLogin} from '../controllers/signup'
import {refreshToken} from '../controllers/refreshToken'

const router=Router()
 
router.post('/register',registerUser)
router.post('/login' ,userLogin)
router.post('/refresh', refreshToken)

export default router