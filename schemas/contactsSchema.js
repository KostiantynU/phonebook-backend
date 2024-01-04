const joi = require('joi');

const contactsSchemaJoi = joi.object({
  contactName: joi.string().required(),
  phoneNumber: joi.string().required(),
  favorite: joi.bool(),
});

module.exports = contactsSchemaJoi;
