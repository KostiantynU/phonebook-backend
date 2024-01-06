const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../controllers');
const { controllerWrapper } = require('../../helpers');
const { validateToken } = require('../../middlewares');

authRouter.post('/', controllerWrapper(authController.registration));
authRouter.post('/login', controllerWrapper(authController.login));
authRouter.post(
  '/logout',
  controllerWrapper(validateToken),
  controllerWrapper(authController.logOut)
);

module.exports = authRouter;
