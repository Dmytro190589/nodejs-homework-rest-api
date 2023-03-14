const express = require('express');
const ctrl = require('../../controllers');
const { ctrlWrapper } = require('../../helpers');
const { addPostValidation, favoriteSchema } = require('../../middleware/validationMidlware');

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.getContact))
router.get('/:contactId', ctrlWrapper(ctrl.getContactById))
router.post('/', addPostValidation, ctrlWrapper(ctrl.addContact))
router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact))
router.put('/:contactId', addPostValidation, ctrlWrapper(ctrl.updateContact))
router.patch('/:contactId/favorite', favoriteSchema, ctrlWrapper(ctrl.updateStatusContact))

module.exports = router
