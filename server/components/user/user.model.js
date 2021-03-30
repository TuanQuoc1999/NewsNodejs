import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  DEFAULT_LANGUAGE,
  USER_JWT_DEFAULT_EXPIRE_DURATION,
  USER_STATUS,
} from '../../constants';
import { JWT_SECRET_KEY } from '../../config';

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      email:
 *        type: string
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      fullName:
 *        type: string
 *      language:
 *        type: string
 *      avatar:
 *        type: string
 */
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  fullName: { type: String },
  password: { type: String, required: true },
  language: { type: String, default: DEFAULT_LANGUAGE },
  avatar: { type: String },
  status: { type: String, enum: Object.values(USER_STATUS), default: USER_STATUS.PENDING },
}, {
  timestamps: true,
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.signJWT = function (expiresIn) {
  return jwt.sign({
    _id: this._id,
    role: this.role,
  }, JWT_SECRET_KEY, {
    expiresIn: expiresIn || USER_JWT_DEFAULT_EXPIRE_DURATION,
  });
};

UserSchema.pre('save', function (next) {
  if (typeof this.email === 'string') {
    this.email = this.email.toLowerCase();
  }
  if (this.firstName && this.lastName) {
    this.fullName = (`${this.firstName} ${this.lastName}`).trim();
  }
  return next();
});

UserSchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    if (!ret.fullName) {
      ret.fullName = (`${ret.firstName} ${ret.lastName}`).trim();
    }
    delete ret.__v;
    delete ret.password;
  },
});

export default mongoose.model('User', UserSchema);
