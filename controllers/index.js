const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContact,
} = require('./contactsCTRL');
const { authController } = require('./authCTRL');
const { usersController } = require('./usersCTRL');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContactById,
  authController,
  usersController,
};
