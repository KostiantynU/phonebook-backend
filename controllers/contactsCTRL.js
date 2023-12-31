const Contact = require('../models/contacts');

const getAllContacts = async (req, res) => {
  const { userId } = req.user;
  const allContacts = await Contact.find({ owner: userId });

  if (!allContacts) {
    res.status(400).json({ message: 'Not found contacts!' });
  }

  return allContacts;
};

const getContactById = async (req, res) => {
  const { userId } = req.user;
  const { contactId } = req.params;
  const contactById = await Contact.find({ owner: userId, _id: contactId });

  if (!contactById) {
    return null;
  }

  return contactById;
};

const addContact = async (req, res) => {
  const { userId } = req.user;
  const newContact = await Contact.create({ ...req.body });

  return newContact;
};

const deleteContactById = async (req, res) => {};
