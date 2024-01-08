const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { UserModel } = require('../models/users');
const { RequestError } = require('../helpers');

const validateToken = async (req, res, next) => {
  const header = req.headers.authorization || '';

  const [type = '', token = ''] = header.split(' ');

  if (type !== 'Bearer') {
    throw RequestError(401, 'Token type is not valid');
  }

  if (!token) {
    throw RequestError(401, 'Token is absent');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const existingUser = await UserModel.findById(payload.id, {
      createdAt: 0,
      updatedAt: 0,
      userPassword: 0,
    });

    if (token !== existingUser.token) {
      throw new Error('Tokens not equal');
    }

    req.user = existingUser;
    // req.body.owner = existingUser._id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw RequestError(401, 'Token expired');
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw RequestError(401, 'Invalid token');
    }
    if (error.message === 'Tokens not equal') {
      throw RequestError(401, 'Please sign in!');
    }
  }

  next();
};

module.exports = validateToken;
