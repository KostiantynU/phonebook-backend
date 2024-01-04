const express = require('express');
const { addContact, getContactById, deleteContactById } = require('../../controllers/contactsCTRL');
const contactsSchemgaJoi = require('../../schemas/contactsSchema');
const { validateBody } = require('../../middlewares');

const contactsRouter = express.Router();

contactsRouter.get('/:contactId', getContactById);

contactsRouter.post('/:contactId', validateBody(contactsSchemaRouter), addContact);

      message: `Here will be all contacts by user id = ${contactId}`,
      contactById: contactById,
    });
  } catch (error) {
    RequestError(404);
contactsRouter.delete('/:contactId', deleteContactById);

module.exports = contactsRouter;
