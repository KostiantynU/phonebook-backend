const { phoneBookBackend } = require('./app');

phoneBookBackend.listen(3000, () => {
  console.log('Server started!');
});
