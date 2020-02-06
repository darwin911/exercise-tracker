const mongoose = require('mongoose');
const { hash, compare } = require('../auth');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    passwordDigest: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = async function(password) {
  const isValid = await compare(password, this.passwordDigest);
  return isValid;
};

userSchema.methods.setPassword = async function(password) {
  const digest = await hash(password);
  this.passwordDigest = digest;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
