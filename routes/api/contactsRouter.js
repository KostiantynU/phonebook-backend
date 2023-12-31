const phoneBookBackend = require('../../app');
const { RequestError } = require('../../helpers');

const contactsRouter = phoneBookBackend.Router();

contactsRouter.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    res.send(`Here will be all contacts by user id = ${userId}`);
  } catch (error) {
    RequestError(404);
  }
});

module.exports = contactsRouter;
