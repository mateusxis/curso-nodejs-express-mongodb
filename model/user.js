const moongose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = moongose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type:  String, required: true, select: false },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
  const user = this;

  if(!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, (err, encrypted) => {
    user.password = encrypted;
    return next();
  })
} );

UserSchema.pre('findOneAndUpdate', function (next) {
  const user = this;
  if (!user._update.password) return next()

  bcrypt.hash(user._update.password, 10, (err, encrypted) => {
    user._update.password = encrypted;
    return next();
  })
} );

module.exports = moongose.model('User', UserSchema);
