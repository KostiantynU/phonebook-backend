const { getAllContacts, getContactById, addContact, deleteContactById } = require('./contactsCTRL');
const { authController } = require('./auth');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  authController,
};
