const express = require('express');


const { ctrlWrapper } = require('../../helpers');
const { fileController: ctrl } = require('../../controllers')

const router = new express.Router()




router.post('/', ctrl.uploadMiddleware, ctrlWrapper(ctrl.fileController))

module.exports = router;