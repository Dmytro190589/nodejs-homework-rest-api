const { Contact } = require('../models');

const getAllContacts = async () => {
    return Contact.find()
}

const getContactById = async (id) => {
    return Contact.findById(id)
}
const addContact = async (body) => {
    return Contact.create(body)
}
const deleteContact = async (id) => {
    return Contact.findByIdAndRemove(id)
}
const updateContact = async (id, body) => {
    return Contact.findByIdAndUpdate({_id:id}, body, { new: true })
}
module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact
}