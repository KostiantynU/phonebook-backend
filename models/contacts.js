const { mongoose } = require('../app');

const Schema = mongoose.Schema;

const contactsSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name of contact is required!'] },
    phoneNumber: { type: Number, required: [true, 'Number of contact is required!'] },
    favorite: Boolean,
    category: String,
    owner: { type: Objectid },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('phoneBookContact', contactsSchema);

module.exports = Contact;
