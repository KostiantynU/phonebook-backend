// const { mongoose } = require('../app');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = new Schema(
  {
    contactName: { type: String, required: [true, 'Name of contact is required!'] },
    phoneNumber: { type: Number, required: [true, 'Number of contact is required!'] },
    favorite: { type: Boolean, default: false },
    category: { type: String, default: 'All' },
    // owner: { type: mongoose.ObjectId },
  },
  { versionKey: false, timestamps: true }
);

const ContactModel = mongoose.model('phoneBookContact', contactsSchema);

module.exports = ContactModel;
