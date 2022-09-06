const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ACIVITY_TYPES = {
  AEROBIC: "AEROBIC",
  FLEXIBILITY: "FLEXIBILITY",
  STRENGTH_TRAINING: "STRENGTH_TRAINING",
};

const exerciseSchema = new Schema(
  {
    activityType: { type: String },
    date: { type: Date, required: true },
    distance: { type: Number },
    duration: { type: Number },
    note: { type: String },
    repetitions: { type: Number },
    time: { type: Number },
    type: { type: String },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

exerciseSchema.methods.setActivityType = function (type) {
  switch (type.toLowerCase()) {
    case "run":
    case "cycling":
    case "rock climbing":
    case "swimming":
    case "tennis":
      this.activityType = ACIVITY_TYPES.AEROBIC;
      break;
    case "yoga":
      this.activityType = ACIVITY_TYPES.FLEXIBILITY;
      break;
    case "gym":
    case "push-ups":
      this.activityType = ACIVITY_TYPES.STRENGTH_TRAINING;
      break;
    default:
      this.activityType = null;
      break;
  }
  return this;
};

exerciseSchema.methods.toClient = function () {
  return {
    activityType: this.activityType,
    id: this._id,
    date: this.date,
    distance: this.distance,
    duration: this.duration,
    repetitions: this.repetitions,
    note: this.note,
    time: this.time,
    userId: this.userId,
    type: this.type,
  };
};

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
