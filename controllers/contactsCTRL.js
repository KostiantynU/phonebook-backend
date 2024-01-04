const Contact = require('../models/contacts');
const { RequestError, controllerWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const { userId } = req.user;
  const allContacts = await Contact.find({ owner: userId });

  if (!allContacts) {
    throw RequestError(404);
  }

  res.status(200).json({ allContacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  if (!contactById) {
    RequestError(404);
  }

  res.status(200).json({ contactById });
};

const addContact = async (req, res) => {
  // const { userId } = req.user;

  const newContact = await Contact.create({ ...reqBody });

  res.status(201).json(newContact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findOneAndDelete(contactId);

  if (!deletedContact) {
    throw RequestError(404);
  }

  res.status(200).json(deletedContact);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContactById: controllerWrapper(deleteContactById),
};
