import Express from "express"
import { uploadMedia } from "../controller/mediaController.js"
import { upload } from "../libs/s3/upload.js"

const router = Express.Router()

// upload media
router.post("/", upload.single("image"), uploadMedia)

export default router
