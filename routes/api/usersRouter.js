const express = require('express');
const usersRouter = express.Router();
const { usersController } = require('../../controllers');
const { validateToken } = require('../../middlewares');
const { controllerWrapper } = require('../../helpers');

usersRouter.get('/getinfo', controllerWrapper(validateToken), usersController.getInfo);
usersRouter.get('/contacts', controllerWrapper(validateToken), usersController.getContacts);
usersRouter.post('/contacts', controllerWrapper(validateToken), usersController.addUserContact);

module.exports = usersRouter;
