const express = require('express');
const { listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts');

const Joi = require('joi');


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts)
  } catch (error) {
    return res.status(500).send('Something went wrong!')
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = await getContactById(req.params.contactId);
    const [contact] = contactId.filter(item => item.id === req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: `Not with  ${req.params.contactId} id found!` })
    }
    return res.json(contact)
  } catch (error) {
    return res.status(500).send({ message: 'Something went wrong!' })
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    email: Joi.string()
      .email({ maxDomainSegments: 2, tlds: { deny: ['ru'] } })
      .required(),
    phone: Joi.number()
      .min(7)
      .required(),
  })
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details })
  }
  try {
    const contacts = await addContact({ name, email, phone });
    return res.status(201).json(contacts)
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!" })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId)
    if (!contacts) {
      return res.status(404).send({ message: 'Not found' })
    }
    return res.status(200).send({ message: "contact deleted" })
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong!' })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .optional(),
    email: Joi.string()
      .email({ maxDomainSegments: 2, tlds: { deny: ['ru'] } })
      .optional(),
    phone: Joi.number()
      .min(7)
      .optional(),
  })
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details })
  }
  try {
    const contacts = await updateContact(contactId, { name, email, phone })
    return res.status(200).json(contacts)
  } catch (error) {
    res.json({ message: 'Something went wrong!' })
  }
})

module.exports = router
