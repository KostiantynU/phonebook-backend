const ContactModel = require('../models/contacts');
const { RequestError, controllerWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const allContacts = await ContactModel.find().skip(skip).limit(limit);

  if (!allContacts) {
    throw RequestError(404);
  }

  res.status(200).json({ allContacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await ContactModel.findById(contactId);

  if (!contactById) {
    throw RequestError(404);
  }

  res.status(200).json({ contactById });
};

const addContact = async (req, res) => {
  // const { userId } = req.user;

  const newContact = await ContactModel.create({ ...req.body });

  res.status(201).json(newContact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await ContactModel.findOneAndDelete(contactId);

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
