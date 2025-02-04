const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { addPostValidation, favoriteSchema } = require('../../middleware/validationMiddleware');

const { authMiddleware } = require('../../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', ctrlWrapper(ctrl.getContact))
router.get('/:contactId', ctrlWrapper(ctrl.getContactById))
router.post('/', addPostValidation, ctrlWrapper(ctrl.addContact))
router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact))
router.put('/:contactId', addPostValidation, ctrlWrapper(ctrl.updateContact))
router.patch('/:contactId/favorite', favoriteSchema, ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
