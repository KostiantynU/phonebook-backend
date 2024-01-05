const express = require('express');
const {
  addContact,
  getContactById,
  deleteContactById,
  getAllContacts,
} = require('../../controllers/contactsCTRL');
const contactsSchemaJoi = require('../../schemas/contactsSchema');
const { validateBody, validateToken } = require('../../middlewares');
const { controllerWrapper } = require('../../helpers');

const contactsRouter = express.Router();

contactsRouter.get('/', controllerWrapper(validateToken), getAllContacts);
contactsRouter.get('/:contactId', controllerWrapper(validateToken), getContactById);

contactsRouter.post('/', validateBody(contactsSchemaJoi), addContact);

contactsRouter.delete('/:contactId', deleteContactById);

module.exports = contactsRouter;
