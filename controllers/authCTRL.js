const { UserModel } = require('../models/users');
const { RequestError } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const registration = async (req, res) => {
  try {
    const { userPassword, userEmail } = req.body;
    const existingUser = await UserModel.findOne({ userEmail: userEmail });

    if (existingUser) {
      return res.status(409).json({ message: 'Maybe you are already registered?' });
    }

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
    expiresIn: '30m',
  });

  existingUser.token = token;
  const updatedExistingUser = await UserModel.findByIdAndUpdate(
    existingUser._id,
    { token: token },
    {
      new: true,
    }
  );

  return res.status(200).json({
    token: token,
    user: { userName: existingUser.userName, userEmail: existingUser.userEmail },
  });
};

const logOut = async (req, res) => {
  const existingUser = await UserModel.findById(req.user._id);
  if (!existingUser.token) {
    return res.status(401).json({ message: 'User has already logged out!' });
  }

  const clearedTokenUser = await UserModel.findOneAndUpdate(
    { _id: req.user._id },
    { token: null },
    {
      new: true,
      projection: {
        userEmail: false,
        createdAt: false,
        updatedAt: false,
        userPassword: false,
        userName: true,
        contacts: false,
      },
    }
  );

  res.status(200).json({ message: 'Logout successful', exitedUser: clearedTokenUser });
};

const currentUser = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { authController: { registration, login, logOut, currentUser } };
