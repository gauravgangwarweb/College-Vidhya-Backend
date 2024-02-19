import prisma from "../libs/db/dbConfig.js"

// Create Review
export const createReview = async (req, res) => {
    const { instituteId, rating, content } = req.body

    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
    })

    if (!user) return res.status(401).json({ message: "Unauthorized" })

    const institute = await prisma.institute.findUnique({
        where: {
            id: instituteId,
        },
    })

    if (!institute) return res.status(400).json({ message: "Institute not found" })

    const reviewExist = await prisma.review.findMany({
        where: {
            userId: user.id,
            instituteId,
        },
    })
    console.log(reviewExist)

    if (reviewExist.length != 0) return res.status(400).json({ message: "Review already exist" })

    const newReview = await prisma.review.create({
        data: {
            rating,
            content,
            instituteId,
            userId: user.id,
        },
    })

    res.status(201).json(newReview)
}

// Get Reviews of Institute
export const getAllReviews = async (req, res) => {
    const { instituteId } = req.params

    const reviews = await prisma.review.findMany({
        where: {
            instituteId,
        },
    })

    res.status(200).json(reviews)
}
