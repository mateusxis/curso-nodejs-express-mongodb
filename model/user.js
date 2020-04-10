const moongose = require('mongoose');

const Schema = moongose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type:  String, required: true, select: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = moongose.model('User', UserSchema);