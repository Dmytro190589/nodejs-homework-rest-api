const services = require('../services')

const getContact = async (req, res) => {
    const result = await services.getAllContacts();
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
    const result = await services.getContactById(contactId)
    if (!result) {
        return res.status(404).json({ message: `Not with  ${req.params.contactId} id found!` })
    }
    return res.json({
        status: 'success',
        code: '200',
        data: {
            result
        }
    })
}
const addContact = async (req, res) => {
    const result = await services.addContact(req.body)
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
    const contact = await services.deleteContact(contactId)
    if (!contact) {
        return res.status(404).send({ message: 'Not found' })
    }
    return res.json({ message: "contact deleted" })
}
const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await services.updateContact(contactId, req.body)
    if (!contact) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found task id: ${contactId}`,
            data: 'Not Found',
        })
    }
    res.json({
        status: 'success',
        message: "Contact updated",
        code: 200,
        data: { contact: contact },
    })

}
const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite = false } = req.body
    const result = await services.updateContact(contactId, { favorite })
    if (!result) {
        return res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found contact id: ${contactId}`,
            data: 'Not Found',
        })

    } else {
        return res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        })
    }

}
module.exports = {
    getContact,
    addContact,
    deleteContact,
    getContactById,
    updateContact,
    updateStatusContact
}
