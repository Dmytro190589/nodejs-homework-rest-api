const { WrongParamsError, NotFoundError} = require('../helpers/error');
const { Contact } = require('../models');

const getAllContacts = async () => {
    return Contact.find()
}

const getContactById = async (id) => {

    const result = await Contact.findById(id)
    if (!result) {
        throw new WrongParamsError(`Not with  ${id} id found!`)
    }
    return result
}
const addContact = async (body) => {

    return Contact.create(body);
}
const deleteContact = async (id) => {
    const result = await Contact.findByIdAndRemove(id)
    if (!result) {
        throw new NotFoundError("Not found!")
    }
    return result;
}
const updateContact = async (id, body) => {
    const contact = await Contact.findByIdAndUpdate({ _id: id }, body, { new: true })
    if (!contact) {
        throw new NotFoundError(`Not found contact id: ${id}`)
    }
    return contact;
}
module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    deleteContact,
    updateContact
}