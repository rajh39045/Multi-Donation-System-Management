import CreditRepository from '../repositories/CreditRepository.js';
import Reward from '../models/Reward.js';
import ClaimedReward from '../models/ClaimedReward.js';
import UserRepository from '../repositories/UserRepository.js';
import { ApiError } from '../utils/ApiError.js';

class CreditService {
  async getCredits(userId) {
    const user = await UserRepository.findById(userId);
    return { credits: user.credits };
  }

  async getCreditHistory(userId) {
    return await CreditRepository.find({ userId });
  }

  async getRewards() {
    return await Reward.find({});
  }

  async claimReward(rewardId, userId) {
    const reward = await Reward.findById(rewardId);
    if (!reward) throw new ApiError(404, 'Reward not found');

    const user = await UserRepository.findById(userId);
    if (user.credits < reward.cost) {
      throw new ApiError(400, 'Insufficient credits');
    }

    user.credits -= reward.cost;
    await user.save();

    const claimed = await ClaimedReward.create({
      rewardId,
      userId,
    });

    await CreditRepository.create({
      userId,
      amount: -reward.cost,
      reason: `Claimed reward: ${reward.name}`,
    });

    return claimed;
  }
}

export default new CreditService();
