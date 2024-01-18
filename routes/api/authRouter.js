const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../controllers');
const { controllerWrapper } = require('../../helpers');
const { validateToken, validateBody } = require('../../middlewares');
const { usersAuthSchemas } = require('../../schemas/usersJoiSchema');

authRouter.post(
  '/register',
  validateBody(usersAuthSchemas.usersRegisterJoiSchema),
  controllerWrapper(authController.registration)
);
authRouter.post(
  '/login',
  validateBody(usersAuthSchemas.usersLoginJoiSchema),
  controllerWrapper(authController.login)
);
authRouter.post(
  '/logout',
  controllerWrapper(validateToken),
  controllerWrapper(authController.logOut)
);
authRouter.get('/current', controllerWrapper(validateToken), authController.currentUser);

module.exports = authRouter;
