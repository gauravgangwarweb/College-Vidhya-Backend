import { parse } from "dotenv"
import prisma from "../libs/db/dbConfig.js"

// Create Institute
export const createInstitute = async (req, res) => {
    const data = req.body

    const isAdmin = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
    })

    if (!isAdmin) return res.status(401).json({ message: "Unauthorized" })

    const instituteExist = await prisma.institute.findUnique({
        where: {
            name: data.name,
        },
    })

    if (instituteExist) return res.status(400).json({ message: "Institute already exist" })

    const institute = await prisma.institute.create({
        data: {
            ...data,
            approvals: {
                create: data.approvals,
            },
            faqs: {
                create: data.faqs,
            },
        },
    })

    res.status(201).json(institute)
}

// Get Institutes
export const getAllInstitutes = async (req, res) => {
    const institutes = await prisma.institute.findMany({
        include: {
            reviews: true,
            faqs: true,
            approvals: true,
            courses: true,
        },
    })

    res.status(200).json(institutes)
}

// Get One Institute

export const getOneInstitute = async (req, res) => {
    const intId = parseInt(req.params.id)
    const institute = await prisma.institute.findUnique({
        where: {
            id: intId,
        },
        include: {
            reviews: true,
            faqs: true,
            approvals: true,
            courses: true,
        },
    })

    res.status(200).json(institute)
}
