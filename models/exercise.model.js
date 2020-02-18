const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    type: { type: String },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    note: { type: String },
    userId: { type: String, required: true },
    distance: { type: Number },
  },
  { timestamps: true }
);

exerciseSchema.methods.toClient = function() {
  return {
    id: this._id,
    userId: this.userId,
    date: this.date,
    duration: this.duration,
    note: this.note,
    type: this.type,
    distance: this.distance,
  };
};

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
