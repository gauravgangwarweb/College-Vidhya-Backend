import prisma from "../libs/db/dbConfig.js"

// Create article

export const createArticle = async (req, res) => {
    const { title, content, thumbnail } = req.body

    const article = await prisma.blog.create({
        data: {
            title,
            content,
            thumbnail,
            userId: req.userId,
        },
    })

    res.status(201).json(article)
}

//  Get Articles

export const getAllArticles = async (req, res) => {
    const articles = await prisma.blog.findMany({})
    res.status(200).json(articles)
}

// Get Article by Id

export const getArticleById = async (req, res) => {
    const { id } = req.params
    const idInt = parseInt(id)

    const article = await prisma.blog.findUnique({
        where: {
            id: idInt,
        },
    })

    res.status(200).json(article)
}

// Update Article

export const updateArticle = async (req, res) => {
    const { id } = req.params
    const idInt = parseInt(id)
    const { title, content, thumbnail } = req.body

    const article = await prisma.blog.update({
        where: {
            id: idInt,
        },
        data: {
            title,
            content,
            thumbnail,
        },
    })

    res.status(200).json(article)
}

// Delete Article

export const deleteArticle = async (req, res) => {
    const { id } = req.params
    const idInt = parseInt(id)
    const article = await prisma.blog.delete({
        where: {
            id: idInt,
        },
    })

    res.status(200).json(article)
}
