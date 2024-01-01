const express = require('express');
const { RequestError } = require('../../helpers');
const { addContact, getContactById } = require('../../controllers/contactsCTRL');

const contactsRouter = express.Router();

contactsRouter.get('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    console.log('contactId', contactId);
    const contactById = await getContactById(contactId);

    if (!contactById) {
      res.status(404).json({ message: `Not found contacts with id ${contactId}` });
    }

    res.status(200).json({
      message: `Here will be all contacts by user id = ${contactId}`,
      contactById: contactById,
    });
  } catch (error) {
    RequestError(404);
  }
});

contactsRouter.post('/:contactId', async (req, res) => {
  try {
    const newContact = await addContact({ ...req.body });
    res.json({ newContact });
  } catch (error) {
    RequestError(500, 'Internal sever error');
  }
});

module.exports = contactsRouter;
