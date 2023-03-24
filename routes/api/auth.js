const express = require('express');

const { ctrlWrapper } = require('../../helpers')
const { auth: ctrl } = require('../../controllers')
const { addUserValidation } = require('../../middleware/validationUsers')
const { authMiddleware } = require('../../middleware/authMiddleware')

const router = express.Router()


router.post('/register', addUserValidation, ctrlWrapper(ctrl.register))

router.post('/login', addUserValidation, ctrlWrapper(ctrl.login))

router.post('/current', authMiddleware, ctrlWrapper(ctrl.current))

router.patch('/', authMiddleware, addUserValidation, ctrlWrapper(ctrl.subscription))

router.get('/logout', authMiddleware, ctrlWrapper(ctrl.logout))


module.exports = router