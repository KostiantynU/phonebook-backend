const { phoneBookBackend, mongoose } = require('./app');

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    phoneBookBackend.listen(PORT, () => {
      console.log('Server started!');
    });
  })
  .catch(error => {
    console.log('Something goes wrong');
    process.exit(1);
  });
