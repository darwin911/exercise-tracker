const mongoose = require('mongoose');
const { hash, compare, encode } = require('../auth');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordDigest: {
      type: String,
    },
    weight: {
      type: Number,
    },
    unitSystem: {
      type: String,
      default: 'IMPERIAL',
    },
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = async function (password) {
  const isValid = await compare(password, this.passwordDigest);
  return isValid;
};

userSchema.methods.setPassword = async function (password) {
  const digest = await hash(password);
  this.passwordDigest = digest;
};

userSchema.methods.toAuthJSON = async function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    email: this.email,
    token: await this.generateJWT(),
  };
};

userSchema.methods.toClient = async function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    email: this.email,
    unitSystem: this.unitSystem,
    weight: this.weight,
  };
};

userSchema.methods.generateJWT = async function () {
  const data = {
    id: this._id,
    username: this.username,
    passwordDigest: this.passwordDigest,
  };
  return await encode(data);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
