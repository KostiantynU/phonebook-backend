require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const contactsRouter = require('./routers/contactsRouter/contactsRouter');

const phoneBookBackend = express();

phoneBookBackend.use(express.json());
phoneBookBackend.use(logger('combined'));

phoneBookBackend.use((req, res, next) => {
  console.log('This is my own middleware');

  next();
});

phoneBookBackend.get('/', (req, res) => {
  res.send('Hello World!');
});

phoneBookBackend.use('/contacts', contactsRouter);

module.exports = { phoneBookBackend };
