const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    date: { type: Date, required: true },
    distance: { type: Number },
    duration: { type: Number, required: true },
    note: { type: String },
    time: { type: Number },
    type: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

exerciseSchema.methods.toClient = function() {
  return {
    id: this._id,
    date: this.date,
    distance: this.distance,
    duration: this.duration,
    note: this.note,
    time: this.time,
    userId: this.userId,
    type: this.type,
  };
};

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
