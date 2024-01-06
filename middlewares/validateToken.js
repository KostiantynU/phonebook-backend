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
    const user = await UserModel.findById(payload.id, {
      createdAt: 0,
      updatedAt: 0,
      userPassword: 0,
    });

    req.user = user;
    req.body.owner = user._id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw RequestError(401, 'Token expired');
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw RequestError(401, 'Invalid token');
    }
  }

  next();
};

module.exports = validateToken;
