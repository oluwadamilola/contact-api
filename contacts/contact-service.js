const contacts = require('./contact-model');

async function getAllContacts() {
  return contacts.getAllContacts();
}

async function getContact(contactID) {
  const contact = contacts.findContactByID(contactID);

  if (!contact) {
    throw new Error('Contact not found');
  }

  return contact;
}

async function createNewContact(contact) {
  try {
    return contacts.createContact(contact);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateContactDetails(contactID, contactDetails) {
  const contact = contacts.findContactByID(contactID);

  if (!contact) {
    throw new Error('Contact not found');
  }

  return contacts.updateContactById(contactID, contactDetails);
}

async function deleteContactDetails(contactID) {
  const contact = contacts.findContactByID(contactID);

  if (!contact) {
    throw new Error('Contact not found');
  }

  return contacts.deleteContactById(contactID);
}

module.exports = {
  getAllContacts,
  getContact,
  createNewContact,
  updateContactDetails,
  deleteContactDetails,
};
