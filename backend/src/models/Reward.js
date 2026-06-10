import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Reward', rewardSchema);
