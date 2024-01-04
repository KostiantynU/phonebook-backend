require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const contactsRouter = require('./routes/api/contactsRouter');

const phoneBookBackend = express();

phoneBookBackend.use(express.json());
phoneBookBackend.use(cors());
// phoneBookBackend.use('/public', express.static(__dirname + '/public')); // Middleware for sending public files, maybe I use it later

const logFileStream = fs.createWriteStream(path.join(__dirname, './log/server.log'), {
  flags: 'a',
});
const formatLogger = phoneBookBackend.get('env') === 'development' ? 'combined' : 'short';
phoneBookBackend.use(logger(formatLogger, { stream: logFileStream }));

phoneBookBackend.use(async (req, res, next) => {
  console.log('This is my own middleware');

  next();
});

phoneBookBackend.get('/', (req, res) => {
  res.send('Hello World!');
});

phoneBookBackend.use('/api/contacts', contactsRouter);

phoneBookBackend.use((_, res, __) => {
  res.status(404).json({ message: 'Not Found!' });
});

phoneBookBackend.use((error, _, res, __) => {
  const { status = 500, message = 'Internal server error' } = error;
  console.log(error.stack);
  res.status(status).json({ message, data: error.message });
});

module.exports = { phoneBookBackend, mongoose };
