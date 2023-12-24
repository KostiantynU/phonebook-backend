const express = require('express');
const contactsRouter = require('./routers/contactsRouter/contactsRouter');

const phoneBookBackend = express();

phoneBookBackend.use(express.json());

phoneBookBackend.use((req, res, next) => {
  console.log('This is my own middleware');

  next();
});

phoneBookBackend.get('/', (req, res) => {
  res.send('Hello World!');
});

phoneBookBackend.use('/contacts', contactsRouter);

module.exports = { phoneBookBackend };
