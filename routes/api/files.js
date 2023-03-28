const express = require('express');
const multer = require('multer');
const path = require('path');

const { ctrlWrapper } = require('../../helpers');
const { fileController: ctrl } = require('../../controllers')

const router = new express.Router()

const FILE_DIR = path.resolve('public', 'avatars')
const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, FILE_DIR)
    },
    filename: (res, file, cb) => {
        const [filename, extension] = file.originalname.split('.')
        cb(null, `${filename}.${extension}`)
    }
})
const uploadMiddleware = multer({ storage })


router.post('/', uploadMiddleware.single("avatar"), ctrlWrapper(ctrl.fileController))

module.exports = router;