import { S3Client } from "@aws-sdk/client-s3"
import multer from "multer"
import multerS3 from "multer-s3"
import path from "path"
const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
})

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "collegevidya",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            const extension = path.extname(file.originalname)
            const fileName = `${Date.now().toString()}${extension}`
            cb(null, fileName)
            return fileName
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: "inline",
    }),
})
