import mongoose from 'mongoose';
import {
  CONTACT_STATUS,
} from '../../constants';

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    enum: Object.values(CONTACT_STATUS), default: CONTACT_STATUS.PENDING
  },
}, { timestamps: true });
export default mongoose.model('contact', ContactSchema);