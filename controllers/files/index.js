const multer = require('multer');
const path = require('path');
const fs = require("fs/promises")
const { v4 } = require('uuid')
const tempDir = path.join(__dirname, "../../", 'tmp')
const avatarDir = path.join(__dirname, "../../", "public", "avatars")


const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, tempDir)
    },
    filename: (res, file, cb) => {
        cb(null, file.originalname)
    }
})
const uploadMiddleware = multer({ storage }).single("avatar")
const avatars = [];
const fileController = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const resultDir = path.join(avatarDir, originalname)
    try {
        await fs.rename(tempUpload, resultDir)
        const avatar = path.join('avatars', originalname)

        const newAvatar = {
            name: req.body.name,
            id: v4(),
            image: avatar
        }
        avatars.push(newAvatar)
        res.json(newAvatar)
    } catch (error) {
        await fs.unlink(tempDir)
    }
}
module.exports = {
    fileController,
    uploadMiddleware
}