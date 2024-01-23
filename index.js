const { phoneBookBackend, mongoose } = require('./app');

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    phoneBookBackend.listen(3000, () => {
      console.log('Server started!');
    });
  })
  .catch(error => {
    console.log('Something goes wrong');
    process.exit(1);
  });
