import Express from "express"
import { createArticle, getAllArticles, getArticleById, deleteArticle, updateArticle } from "../controller/blogController.js"
import auth from "../auth.js"
const router = Express.Router()

// Create course
router.post("/", auth, createArticle)
// Get All
router.get("/", getAllArticles)
// Get one
router.get("/:id", getArticleById)
// Update one
router.put("/:id", updateArticle)
// Delete one
router.delete("/:id", deleteArticle)

export default router
