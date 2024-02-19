import { configDotenv } from "dotenv"
import Express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./route/userRoute.js"
import loginRoute from "./route/loginRoute.js"
import instRoute from "./route/instRoute.js"
import reviewRoute from "./route/reviewRoute.js"
import courseRoute from "./route/courseRoute.js"
import blogRoute from "./route/blogRoute.js"
import mediaRoute from "./route/mediaRoute.js"

// Configs
configDotenv()
const app = new Express()
// app.use(cors({ credentials: true, origin: false, methods: "*" }))
app.use(Express.json())
app.use(cookieParser())
// Routes
app.use("/user", userRoute)
app.use("/login", loginRoute)
app.use("/institute", instRoute)
app.use("/review", reviewRoute)
app.use("/course", courseRoute)
app.use("/blog", blogRoute)
app.use("/media", mediaRoute)

const port = process.env.PORT || 3000

// Listner
app.listen(port, () => {
    try {
        console.log("🟢 Server is running...")
    } catch (error) {
        console.log("🔴 There is error...", error)
    }
})
