const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error('Email is invalid');
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  name: {
    type: String,
    defalt: 'Anonymous',
    trim: true,
  },
  accouts: {
    type: Array,
  },
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error('Unable to login');

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) throw new Error('Unable to login');

  return user;
};

// userSchema.pre('save', async function (next) {
//   const user = this;

//   if (user.isModified('password')) {
//     user.password = await bcryptjs.hash(user.password, 8);
//   }

//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
