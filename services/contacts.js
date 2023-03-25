const { WrongParamsError, NotFoundError } = require('../helpers/error');
const { Contact } = require('../models')

const getAllContacts = async (owner, query) => {
    const { page = 1, limit = 20, favorite } = query;
    const skip = (page - 1) * limit;

    const where = { owner, ...favorite === undefined ? {} : { owner, favorite } }
    console.log(where)

    return await Contact.find(where, "", { skip, limit: Number(limit) })
        .populate("owner", "_id email subscription")
}

const getContactById = async (id) => {

    const result = await Contact.findById(id)
    if (!result) {
        throw new WrongParamsError(`Not with  ${id} id found!`)
    }
    return result
}
const addContact = async (body) => {
    return Contact.create(body)

}
const deleteContact = async (id) => {
    const result = await Contact.findByIdAndRemove(id)
    if (!result) {
        throw new NotFoundError("Not found!")
    }
    return result;
}
const updateContact = async (id, body) => {
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true })
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