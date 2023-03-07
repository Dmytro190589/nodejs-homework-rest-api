const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts')



const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts)
  } catch (error) {
    res.status(500).send('Something broken!')
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = await getContactById(req.params.contactId);
    const [contact] = contactId.filter(item => item.id === req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: `Not with  ${req.params.contactId} id found!` })
    }
    res.json(contact)
  } catch (error) {
    res.status(500).send({ message: 'Something broken!' })
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const contacts = await addContact({ name, email, phone });
    res.status(201).json(contacts)
  } catch (error) {
    res.status(404).send({ message: 'GGG' })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId)
    res.json(contacts)
  } catch (error) {
    res.status(500).send({ message: 'Something broken!' })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;

  try {
    const contacts = await updateContact(contactId, { name, email, phone })
    res.json(contacts)
  } catch (error) {
    res.json({ message: 'template message' })

  }
})

module.exports = router
