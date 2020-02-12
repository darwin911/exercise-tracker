const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    userId: { type: String, required: true },
    duration: { type: Number, required: true },
    note: { type: String, required: true },
    date: { type: Date, required: true },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
