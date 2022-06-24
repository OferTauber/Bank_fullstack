const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
    validate(val) {
      if (val < 0) throw new Error('Cennot set negativ credit');
    },
  },
  owner: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
