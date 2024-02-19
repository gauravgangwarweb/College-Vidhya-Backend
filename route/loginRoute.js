import Express from "express"
import { login } from "../controller/loginController.js"
const router = Express.Router()
// Login User
router.post("/", login)
export default router
