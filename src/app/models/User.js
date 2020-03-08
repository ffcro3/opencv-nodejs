import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 8);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

export default mongoose.model('User', UserSchema);
