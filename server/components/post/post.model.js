import mongoose, { Schema } from 'mongoose';

const PostSchema = new mongoose.Schema({
  idPageComponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'pageComponent',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: [
     {
      type: String
  }]
}, { timestamps: true })

export default mongoose.model('post', PostSchema);