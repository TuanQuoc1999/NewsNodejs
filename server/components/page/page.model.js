import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},{ timestamps: true });

export default mongoose.model('Page', PageSchema);