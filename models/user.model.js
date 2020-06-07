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
    friends: [String],
    friendRequests: [String],
    friendRequestsSent: [String],
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
  const user = this.toClient();
  return {
    ...user,
    token: await this.generateJWT(),
  };
};

userSchema.methods.toClient = function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    email: this.email,
    unitSystem: this.unitSystem,
    weight: this.weight,
    friends: this.friends,
    friendRequests: this.friendRequests,
    friendRequestsSent: this.friendRequestsSent,
  };
};

userSchema.methods.toFriendData = function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
  };
};
// TODO REMOVE ASYNC/AWAIT
userSchema.methods.generateJWT = async function () {
  const data = {
    id: this._id,
    passwordDigest: this.passwordDigest,
  };
  return await encode(data);
};

userSchema.methods.addFriendRequest = function (requesterId) {
  this.friendRequests.push(requesterId);
  return this.toClient();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
