import mongoose from 'mongoose';

const goalSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const goalModel = mongoose.model('Goal', goalSchema);

export default goalModel;