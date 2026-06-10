import mongoose from 'mongoose';

const claimedRewardSchema = new mongoose.Schema({
  rewardId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reward',
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('ClaimedReward', claimedRewardSchema);
