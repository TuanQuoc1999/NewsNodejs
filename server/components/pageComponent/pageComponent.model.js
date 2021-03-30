import mongoose from 'mongoose';

const PageComponentSchema = new mongoose.Schema({
  idPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'page',
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
  description: {
    type: String,
    required: true,
  },
},{ 
  timestamps: true,
});

export default mongoose.model('pageComponent', PageComponentSchema);