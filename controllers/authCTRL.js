const { UserModel } = require('../models/users');
const { RequestError } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const registration = async (req, res) => {
  try {
    const { userPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const newUser = await UserModel.create({ ...req.body, userPassword: hashedPassword });

    res.json({ ok: true, newUser: { id: newUser._id, userName: newUser.userName } });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key')) {
      throw RequestError(409, 'User with this email already exists');
    }
  }
};

const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const existingUser = await UserModel.findOne({ userEmail: userEmail });

  if (!existingUser) {
    throw RequestError(404, 'Email is not valid');
  }

  const checkedPassword = await bcrypt.compare(userPassword, existingUser.userPassword);

  if (!checkedPassword) {
    throw RequestError(401, 'Wrong credentials');
  }

  const token = jwt.sign({ id: existingUser._id, userEmail: existingUser.userEmail }, JWT_SECRET, {
    expiresIn: '15m',
  });

  return res.status(200).json({ token: token });
};

module.exports = { authController: { registration, login } };
