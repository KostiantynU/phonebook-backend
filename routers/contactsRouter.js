const express = require('express');

const contactsRouter = express.Router();

contactsRouter.get('/:userId', (req, res) => {
  console.log(req.query);
  const { userId } = req.params;
  res.send(`Here will be all contacts by user id = ${userId}`);
});

module.exports = contactsRouter;
