const { controllerWrapper } = require('../helpers/index');
const { UserModel } = require('../models/users');

const getContacts = async (req, res) => {
  const { user } = req;
  const { contacts } = user;

  return res.json({ data: contacts });
};

const addUserContact = async (req, res) => {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push(contactId);

  await UserModel.findByIdAndUpdate(user._id, user);

  return res.status(201).json({ contacts: user.contacts, user });
};

const getInfo = async (req, res) => {
  const { user } = req;

  res.status(200).json({ user });
};

module.exports = {
  usersController: {
    getContacts: controllerWrapper(getContacts),
    getInfo: controllerWrapper(getInfo),
    addUserContact: controllerWrapper(addUserContact),
  },
};
