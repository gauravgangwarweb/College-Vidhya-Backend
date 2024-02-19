import Express from "express"
import { createUser, getUser, passResendCode, verifyOtp, resetPassword } from "../controller/userController.js"
import auth from "../auth.js"

const router = Express.Router()

// Create User
router.post("/", createUser)
// Verify OTP
router.post("/verify", auth, verifyOtp)
// Get User
router.get("/", auth, getUser)
// Pass Reset Code
router.post("/resend", passResendCode)
// Reset Password
router.post("/reset", resetPassword)

export default router
