import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true,
    enum: ['food', 'clothes', 'electronics', 'books', 'others'],
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  donorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organization',
  },
  volunteerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'picked', 'picked_up', 'delivered', 'completed', 'cancelled'],
    default: 'pending',
  },
  creditsAwarded: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Donation', donationSchema);
