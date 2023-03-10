// const fs = require('fs/promises')
// const path = require("node:path");
// const { v4: uuidv4 } = require('uuid');
// const {Contact} = require('../db/contactsModule');

// const contactsPath = path.join(__dirname, "./contacts.json")

// const listContacts = async () => {
//   const contacts = await Contact.find({});
//   return contacts
// }

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   return contacts.filter(item => item.id === contactId);
// }

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const arrayContact = contacts.filter(item => item.id !== contactId)
//   fs.writeFile(contactsPath, JSON.stringify(arrayContact, null, 2))
//   return arrayContact
// }

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const newContact = { id: uuidv4(), ...body }
//   contacts.push(newContact)
//   fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
//   return newContact;
// }

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const contact = contacts.map(item => item.id === contactId ? { ...item, ...body } : item)
//   fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
//   return contact;
// }

// module.exports = {
//   listContacts,
//   // getContactById,
//   // removeContact,
//   // addContact,
//   // updateContact,
// }
