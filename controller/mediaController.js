export const uploadMedia = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" })
    res.status(200).json({ url: req.file.location })
}
