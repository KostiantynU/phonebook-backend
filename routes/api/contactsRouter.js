const express = require('express');
const { addContact, getContactById, deleteContactById } = require('../../controllers/contactsCTRL');
const contactsSchemaJoi = require('../../schemas/contactsSchema');
const { validateBody } = require('../../middlewares');

const contactsRouter = express.Router();

contactsRouter.get('/:contactId', getContactById);

contactsRouter.post('/:contactId', validateBody(contactsSchemaJoi), addContact);

contactsRouter.delete('/:contactId', deleteContactById);

module.exports = contactsRouter;
