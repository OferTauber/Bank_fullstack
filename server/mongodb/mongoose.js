const PASSWORD = require('../config/password');
const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://ofer_bank:${PASSWORD}@ofer-bank.0lrwfds.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log('Atlas erver is cnnected');
  })
  .catch((err) => {
    console.log('Connaction failed: ', err);
  });
