import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../libs/db/dbConfig.js"

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (!user) return res.status(400).json({ message: "User does not exist or Not verified" })

    const userData = {
        id: user.id,
        role: user.role,
        email: user.email,
        phone: user.phone,
        name: user.name,
        city: user.city,
        state: user.state,
        gender: user.gender,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

    const token = jwt.sign({ id: user.id }, process.env.JWT_ACC_SECRET, { expiresIn: "1h" })

    res.cookie("token", token, { httpOnly: false, secure: false, sameSite: "strict", maxAge: 60 * 60 * 1000 })
    res.cookie("user", JSON.stringify(userData), { httpOnly: false, secure: false, sameSite: "strict", maxAge: 60 * 60 * 1000 })

    if (user.isEmailVerified == false) {
        return res.status(200).json({ next: 1, message: "OTP verification pending", user: userData })
    }
    return res.status(200).json({ next: 0, message: "Logged in successfully", user: userData })
}
