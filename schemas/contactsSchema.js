const joi = require('joi');

const contactsSchemaJoi = joi.object({
  contactName: joi.string().required(),
  phoneNumber: joi.string().required(),
});

module.exports = contactsSchemaJoi;
