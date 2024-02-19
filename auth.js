import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) return res.status(401).json({ message: "Unauthorized" })

        const verified = jwt.verify(token, process.env.JWT_ACC_SECRET)
        if (!verified) return res.status(401).json({ message: "Unauthorized" })

        req.userId = verified.id
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export default auth
