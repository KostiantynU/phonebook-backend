const Contact = require('../models/contacts');

const getAllContacts = async (req, res) => {
  const { userId } = req.user;
  const allContacts = await Contact.find({ owner: userId });

  if (!allContacts) {
    res.status(400).json({ message: 'Not found contacts!' });
  }

  return allContacts;
};

const getContactById = async contactId => {
  try {
    const contactById = await Contact.findById(contactId);

    if (!contactById) {
      return null;
    }

    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async reqBody => {
  // const { userId } = req.user;
  const newContact = await Contact.create({ ...reqBody });
  console.log(newContact);

  return newContact;
};

const deleteContactById = async contactId => {
  try {
    const deletedContact = await Contact.findOneAndDelete(contactId);

    if (!deletedContact) {
      return 'There is no such contact!';
    }

    return deletedContact;
  } catch (error) {
    RequestError(400);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
};
