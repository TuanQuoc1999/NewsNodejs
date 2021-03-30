import mongoose from 'mongoose';
import {
  IS_SUBSCRIBE,
} from '../../constants';
const SubscribeSchema = new mongoose.Schema({
  isSubscribe: {
    type: Boolean,
    enum: Object.values(IS_SUBSCRIBE), default: IS_SUBSCRIBE.false
  },
}, { timestamps: true });
export default mongoose.model('subscribe', SubscribeSchema);