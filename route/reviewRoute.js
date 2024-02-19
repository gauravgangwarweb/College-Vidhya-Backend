import Express from "express"
import { createReview } from "../controller/reviewController.js"
import auth from "../auth.js"

const router = Express.Router()

// Create Review
router.post("/", auth, createReview)

export default router
