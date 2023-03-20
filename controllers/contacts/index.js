const services = require('../../services/contacts')

const getContact = async (req, res) => {
    const { id } = req.user

    const result = await services.getAllContacts(id);
    return res.json({
        status: 'success',
        code: '200',
        data: {
            result
        }
    })
}
const getContactById = async (req, res) => {
    const { contactId } = req.params
    const { id } = req.user
    const result = await services.getContactById(contactId, id)
    return res.json({
        status: 'success',
        code: '200',
        data: {
            result
        }
    })
}
const addContact = async (req, res) => {
    const { name, email, phone } = req.body
    const { id } = req.user
    const result = await services.addContact({ name, email, phone }, id)
    return res.status(201).json({
        status: 'success',
        code: '201',
        data: {
            result
        }
    })
}
const deleteContact = async (req, res) => {
    const { contactId } = req.params
    await services.deleteContact(contactId)
    return res.json({ message: "contact deleted" })
}
const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body
    const contact = await services.updateContact(contactId, { name, email, phone })
    res.json({
        status: 'success',
        message: "Contact updated",
        code: 200,
        data: { contact: contact },
    })

}
const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body
    const result = await services.updateContact(contactId, { favorite })
    return res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}


module.exports = {
    getContact,
    addContact,
    deleteContact,
    getContactById,
    updateContact,
    updateStatusContact
}
