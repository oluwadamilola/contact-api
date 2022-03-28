const contacts = [];

function getAllContacts() {
  return contacts;
}

function findContactByID(id) {
  return contacts.find((contact) => contact.id === id);
}

function findContactByEmail(email) {
  return contacts.find((contact) => contact.email === email);
}

function createContact(contact) {
  const { email } = contact;

  if (findContactByEmail(email)) {
    throw new Error('Contact already exists');
  }

  const newContact = {
    id: (contacts.length + 1).toString(),
    ...contact,
  };

  contacts.push(newContact);

  return newContact;
}

function updateContactById(id, contact) {
  const index = contacts.findIndex((contact) => contact.id === id);
  const oldContactInfo = contacts[index];

  const newContactInfo = {
    ...oldContactInfo,
    ...contact,
  };

  contacts[index] = newContactInfo;

  return newContactInfo;
}

function deleteContactById(id) {
  const index = contacts.findIndex((contact) => contact.id === id);

  const deletedContact = contacts[index];

  contacts.splice(index, 1);

  return deletedContact;
}

module.exports = {
  getAllContacts,
  findContactByID,
  findContactByEmail,
  createContact,
  updateContactById,
  deleteContactById,
};
