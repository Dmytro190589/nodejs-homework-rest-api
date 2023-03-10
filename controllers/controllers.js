const { Contact } = require('../models/contact')

const getContact = async (req, res) => {
    const result = await Contact.find({});
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
    const result = await Contact.findById({ _id: contactId })
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
    const { name, email, phone, favorite = false } = req.body
    const result = await Contact.create({ name, email, phone, favorite })
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
    const contact = await Contact.findByIdAndRemove({ _id: contactId })
    if (!contact) {
        return res.status(404).send({ message: 'Not found' })
    }
    return res.json({ message: "contact deleted" })
}
const updateContact = async (req, res) => {
    const { name, email, phone } = req.body
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } })
    const result = await Contact.find({})
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
        code: 200,
        data: { result },
    })

}
const updateStatusContact = async (req, res) => {
    const { favorite = false } = req.body;
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite })
    if (!result) {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found contact id: ${contactId}`,
            data: 'Not Found',
        })
        res.json({
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
