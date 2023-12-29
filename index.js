const { phoneBookBackend, mongoose } = require('./app');

const { DB_HOST } = process.env;

phoneBookBackend.listen(3000, () => {
  console.log('Server started!');
});
