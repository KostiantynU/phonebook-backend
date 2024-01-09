const ContactModel = require('../models/contacts');
const { RequestError, controllerWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const { page = 0, limit = 0 } = req.query;
  const skip = (page - 1) * limit;

  const allContacts = await ContactModel.find({ owner: req.user._id }).skip(skip).limit(limit);

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
  const newContact = await ContactModel.create({ ...req.body, owner: req.user._id });

  res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const updateInfo = {};
  req.body.contactName && (updateInfo.contactName = req.body.contactName);
  req.body.phoneNumber && (updateInfo.phoneNumber = req.body.phoneNumber);
  req.body.favorite && (updateInfo.favorite = req.body.favorite);
  req.body.category && (updateInfo.category = req.body.cateogry);

  const updatedContact = await ContactModel.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    { ...updateInfo },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await ContactModel.findOneAndDelete({
    _id: contactId,
    owner: req.user._id,
  });

  if (!deletedContact) {
    throw RequestError(404);
  }

  res.status(200).json({ message: 'successfull', deletedContact });
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContact: controllerWrapper(updateContact),
};
