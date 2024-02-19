import prisma from "../libs/db/dbConfig.js"

// Create Course
export const createCourse = async (req, res) => {
    const data = req.body

    const isAdmin = await prisma.user.findUnique({
        where: {
            id: req.userId,
            role: "admin",
        },
    })

    if (!isAdmin) return res.status(401).json({ message: "Unauthorized" })

    const institute = await prisma.institute.findUnique({
        where: { id: data.iid },
    })
    if (!institute) {
        return res.status(400).json({ message: "Institute not found" })
    }

    const course = await prisma.course.create({
        data: {
            ...data,
            faqs: {
                create: data.faqs,
            },
        },
    })

    res.status(201).json(course)
}

// Get All Courses

export const getAllCourses = async (req, res) => {
    const courses = await prisma.course.findMany({})

    res.status(200).json(courses)
}
