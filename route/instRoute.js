import Express from "express"
import { createInstitute, getAllInstitutes, getOneInstitute } from "../controller/instituteController.js"
import auth from "../auth.js"

const router = Express.Router()

// Create Institute
router.post("/", auth, createInstitute)
// Get All
router.get("/", getAllInstitutes)
// Get One
router.get("/:id", getOneInstitute)

export default router
