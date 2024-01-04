const { Schema, model } = require('mongoogse');

const userSchema = new Schema(
  {
    userEmail: {
      type: String,
      unique: true,
      // match: //
    },
    userPassword: { type: String, minLength: [6, 'Password must be at least 6 characters'] },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = model('user', userSchema);

module.exports = { UserModel };
