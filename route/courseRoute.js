import Express from "express"
import { createCourse, getAllCourses } from "../controller/courseController.js"
import auth from "../auth.js"

const router = Express.Router()

// Create course
router.post("/", auth, createCourse)
// Get All
router.get("/", getAllCourses)

export default router
