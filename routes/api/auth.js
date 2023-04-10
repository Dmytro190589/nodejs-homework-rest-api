const express = require('express');

const { ctrlWrapper } = require('../../helpers')
const { auth: ctrl } = require('../../controllers')
const { addUserValidation, addSubscriptionValidation } = require('../../middleware/validationUsers')
const { authMiddleware } = require('../../middleware/authMiddleware')
const { upload } = require('../../middleware/uploadMiddleware')

const router = express.Router()


router.post('/register', addUserValidation, ctrlWrapper(ctrl.register))

router.post('/login', addUserValidation, ctrlWrapper(ctrl.login))

router.post('/current', authMiddleware, ctrlWrapper(ctrl.current))

router.patch('/', authMiddleware, addSubscriptionValidation, ctrlWrapper(ctrl.subscription))

router.get('/logout', authMiddleware, ctrlWrapper(ctrl.logout))

router.patch('/avatars', authMiddleware, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar))

router.get('/verify/:verificationToken',ctrlWrapper(ctrl.verifyEmail))


module.exports = router