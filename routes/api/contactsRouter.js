const express = require('express');
const { addContact, getContactById, deleteContactById } = require('../../controllers/contactsCTRL');
const contactsSchemgaJoi = require('../../schemas/contactsSchema');
const { validateBody } = require('../../middlewares');

const contactsRouter = express.Router();

contactsRouter.get('/:contactId', getContactById);

contactsRouter.post('/:contactId', validateBody(contactsSchemaRouter), addContact);

contactsRouter.delete('/:contactId', deleteContactById);

module.exports = contactsRouter;
