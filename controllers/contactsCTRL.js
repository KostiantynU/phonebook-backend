const Contact = require('../models/contacts');

const getAllContacts = async (req, res) => {
  const { userId } = req.user;
  const allContacts = await Contact.find({ owner: userId });

  if (!allContacts) {
    res.status(400).json({ message: 'Not found contacts!' });
  }

  return allContacts;
};

const getContactById = async contactId => {
  const contactById = await Contact.findOne({ _id: contactId });

  if (!contactById) {
    return null;
  }

  return contactById;
};

const addContact = async reqBody => {
  // const { userId } = req.user;
  const newContact = await Contact.create({ ...reqBody });
  console.log(newContact);

  return newContact;
};

const deleteContactById = async (req, res) => {};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
};
