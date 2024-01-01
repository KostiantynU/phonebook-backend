const express = require('express');
const { RequestError } = require('../../helpers');
const { addContact, getContactById } = require('../../controllers/contactsCTRL');

const contactsRouter = express.Router();

contactsRouter.get('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;

    const contactById = await getContactById(contactId);

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
    console.log(req.body);
    const newContact = await addContact({ ...req.body });
    res.json({ newContact });
  } catch (error) {
    RequestError(500, 'Internal sever error');
  }
});

module.exports = contactsRouter;
