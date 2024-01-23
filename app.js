require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const contactsRouter = require('./routes/api/contactsRouter');
const authRouter = require('./routes/api/authRouter');
const usersRouter = require('./routes/api/usersRouter');

const corsConfig = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const phoneBookBackend = express();

phoneBookBackend.use(express.json());
phoneBookBackend.use(cors(corsConfig));
// phoneBookBackend.use('/public', express.static(__dirname + '/public')); // Middleware for sending public files, maybe I use it later

// const logFileStream = fs.createWriteStream(path.join(__dirname, './log/server.log'), {
//   flags: 'a',
// });
const formatLogger = phoneBookBackend.get('env') === 'development' ? 'combined' : 'short';
// phoneBookBackend.use(logger(formatLogger, { stream: logFileStream }));
phoneBookBackend.use(logger(formatLogger));

// let count = 0;
// phoneBookBackend.use(async (req, res, next) => {
//   console.log(`This is my own middleware started: ${(count += 1)}`);

//   next();
// });
// phoneBookBackend.options('*', cors());
phoneBookBackend.get('/', (req, res) => {
  res.send('Hello World! This is learning project! This is backend for phonebook!');
});

phoneBookBackend.use('/api/contacts', contactsRouter);

phoneBookBackend.use('/api/auth', authRouter);

phoneBookBackend.use('/api/users', usersRouter);

phoneBookBackend.use((_, res, __) => {
  res.status(404).json({ message: 'Not Found!' });
});

phoneBookBackend.use((error, _, res, __) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Incorrect data (ValidationError)' });
  }

  if (error.message.includes('E11000 duplicate key')) {
    return res.status(409).json({ message: 'Object with this data already exists' });
  }

  const { status = 500, message = 'Internal server error' } = error;
  console.log(error.stack);
  res.status(status).json({ message, data: error.message });
});

module.exports = { phoneBookBackend, mongoose };
