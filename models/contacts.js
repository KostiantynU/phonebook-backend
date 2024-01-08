// const { mongoose } = require('../app');
const { Schema, model, Types } = require('mongoose');

const contactsSchema = new Schema(
  {
    contactName: { type: String, required: [true, 'Name of contact is required!'] },
    phoneNumber: { type: String, required: [true, 'Number of contact is required!'] },
    favorite: { type: Boolean, default: false },
    category: { type: String, default: 'All' },
    owner: { type: Types.ObjectId, rel: 'user', required: true },
  },
  { versionKey: false, timestamps: true }
);

const ContactModel = model('phoneBookContact', contactsSchema);

module.exports = ContactModel;
