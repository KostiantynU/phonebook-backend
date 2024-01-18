const joi = require('joi');

const contactsJoiSchema = joi.object({
  contactName: joi.string().required(),
  phoneNumber: joi.string().required(),
  favorite: joi.bool(),
  owner: joi.object().required(),
});

module.exports = contactsJoiSchema;
