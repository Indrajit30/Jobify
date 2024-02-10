import {Router} from "express"
import {register,login,logout} from "../controllers/authControllers.js"
import { validUser , validLogin } from "../middleware/validationMiddleware.js"

const router = Router()

router.route("/register").post(validUser,register)
router.route("/login").post(validLogin,login)
router.route("/logout").get(logout)

export default router