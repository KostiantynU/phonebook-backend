const { phoneBookBackend, mongoose } = require('./app');

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    phoneBookBackend.listen(80, () => {
      console.log('Server started!');
    });
  })
  .catch(error => {
    console.log('Something goes wrong');
    process.exit(1);
  });
