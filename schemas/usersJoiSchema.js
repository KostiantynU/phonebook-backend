const Joi = require('joi');

const usersRegisterJoiSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().required(),
  userPassword: Joi.string().required(),
});

const usersLoginJoiSchema = Joi.object({
  userEmail: Joi.string().required(),
  userPassword: Joi.string().required(),
});

module.exports = { usersAuthSchemas: { usersRegisterJoiSchema, usersLoginJoiSchema } };
