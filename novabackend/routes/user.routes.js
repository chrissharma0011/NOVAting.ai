import Router from "express";
import {
    registerUser,loginUser
} from "../controllers/usercontrollers.js"


const router = Router()
router.post('/loginuser',loginUser)
router.post('/registeruser',registerUser)

export default router;