const { getAllContacts, getContactById, addContact, deleteContactById } = require('./contactsCTRL');
const { authController } = require('./authCTRL');
const { usersController } = require('./usersCTRL');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  authController,
  usersController,
};
