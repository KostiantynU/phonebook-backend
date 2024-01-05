const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../controllers');
const { controllerWrapper } = require('../../helpers');

authRouter.post('/', controllerWrapper(authController.registration));
authRouter.post('/login', controllerWrapper(authController.login));

module.exports = authRouter;
