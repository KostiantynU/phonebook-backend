const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    userEmail: {
      type: String,
      unique: true,
      required: [true, 'Please type a user email!'],
      // match: //
    },
    userName: { type: String, required: [true, 'Please type a user name!'] },
    userPassword: { type: String, minLength: [6, 'Password must be at least 6 characters!'] },
    contacts: { type: [Types.ObjectId], rel: 'phoneBookContact' },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = model('user', userSchema);

module.exports = { UserModel };
