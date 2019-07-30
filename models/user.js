const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
});

UserSchema.pre('save', function encrypt(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt
      .hash(user.password, 9)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

UserSchema.methods.toJSON = function remoePassword() {
  const user = this.toObject();
  delete user.password;
  return { ...user };
};

UserSchema.methods.createAndSaveJWT = async function createJwt() {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();
  return user.toObject();
};

const User = mongoose.model('Users', UserSchema);

module.exports = User;
