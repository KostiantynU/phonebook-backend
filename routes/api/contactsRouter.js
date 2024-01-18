const express = require('express');
const {
  addContact,
  updateContact,
  getContactById,
  deleteContactById,
  getAllContacts,
} = require('../../controllers/contactsCTRL');
const contactsJoiSchema = require('../../schemas/contactsJoiSchema');
const { validateBody, validateToken } = require('../../middlewares');
const { controllerWrapper } = require('../../helpers');

const contactsRouter = express.Router();

contactsRouter.get('/', controllerWrapper(validateToken), getAllContacts);
contactsRouter.get('/:contactId', controllerWrapper(validateToken), getContactById);

contactsRouter.post(
  '/',
  controllerWrapper(validateToken),
  validateBody(contactsJoiSchema),
  addContact
);

contactsRouter.patch('/:contactId', controllerWrapper(validateToken), updateContact);

contactsRouter.delete('/:contactId', controllerWrapper(validateToken), deleteContactById);

module.exports = contactsRouter;
