const express = require('express');

const { ctrlWrapper } = require('../../helpers')
const { auth: ctrl } = require('../../controllers')
const { addUserValidation } = require('../../middleware/validationUsers')

const router = express.Router()


router.post('/register', addUserValidation, ctrlWrapper(ctrl.register))
router.post('/login',addUserValidation,ctrlWrapper(ctrl.login))


module.exports = router