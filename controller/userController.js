import bcrypt from "bcrypt"
import prisma from "../libs/db/dbConfig.js"
import { resendOtpMail, sendMail } from "../libs/mailer/mailerConfig.js"

// Create User
const createUser = async (req, res) => {
    const { email, password, name } = req.body
    const newOtp = Math.floor(1000 + Math.random() * 9000)

    const userExist = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userExist) return res.status(400).json({ message: "User already exist" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            otp: newOtp,
        },
        select: {
            id: true,
            email: true,
            name: true,
            gender: true,
            city: true,
            state: true,
            createdAt: true,
            updatedAt: true,
        },
    })

    res.status(201).json(user)

    sendMail(email, name, newOtp)
}

// Verify OTP
const verifyOtp = async (req, res) => {
    const { otp } = req.body
    const inNum = parseInt(otp)
    const newOtp = Math.floor(1000 + Math.random() * 9000)
    const updatedUser = await prisma.user
        .update({
            where: { id: req.userId, otp: inNum },
            data: {
                otp: newOtp,
                isEmailVerified: true,
            },
            select: {
                role: true,
                email: true,
                name: true,
                phone: true,
                gender: true,
                city: true,
                state: true,
                isEmailVerified: true,
                isPhoneVerified: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        .catch((err) => {
            console.log(err)
        })
    if (!updatedUser) {
        return res.status(400).json({ message: "Email not exist or Invalid OTP or Already Verified" })
    }

    res.status(200).json({ next: 0, message: "OTP verified successfully", user: updatedUser })
}

// Get User
const getUser = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            role: true,
            email: true,
            name: true,
            phone: true,
            gender: true,
            city: true,
            state: true,
            isEmailVerified: true,
            isPhoneVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    })

    if (!user) return res.status(404).json({ message: "User not found" })

    res.status(200).json(user)
}

// Pass Resend
const passResendCode = async (req, res) => {
    const { email } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (!user) return res.status(404).json({ message: "User not found" })
    resendOtpMail(email, user.name, user.otp)
    res.status(200).json({ message: "OTP sent successfully" })
}

// Reset Password
const resetPassword = async (req, res) => {
    const { email, newPass, otp } = req.body
    const newOtp = Math.floor(1000 + Math.random() * 9000)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPass, salt)

    const user = await prisma.user.update({
        where: {
            email,
            otp: parseInt(otp),
        },
        data: {
            password: hashedPassword,
            otp: newOtp,
        },
        select: {
            role: true,
            email: true,
            name: true,
            phone: true,
            gender: true,
            city: true,
            state: true,
            isEmailVerified: true,
            isPhoneVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    })

    if (!user) return res.status(404).json({ message: "User not found" })

    res.status(200).json({ message: "Password reset successfully", user })
}

export { createUser, verifyOtp, getUser, passResendCode, resetPassword }
