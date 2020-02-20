const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    email: { type: String, required: true },
    telephone: { type: String },
  },
  { timestamps: true }
);

contactSchema.methods.toClient = function() {
  return {
    id: this._id,
    email: this.email,
    telephone: this.telephone,
  };
};

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
