import CreditService from '../services/CreditService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class CreditController {
  getCredits = asyncWrapper(async (req, res) => {
    const credits = await CreditService.getCredits(req.user._id);
    res.status(200).json(new ApiResponse(200, credits));
  });

  getCreditHistory = asyncWrapper(async (req, res) => {
    const history = await CreditService.getCreditHistory(req.user._id);
    res.status(200).json(new ApiResponse(200, history));
  });

  getRewards = asyncWrapper(async (req, res) => {
    const rewards = await CreditService.getRewards();
    res.status(200).json(new ApiResponse(200, rewards));
  });

  claimReward = asyncWrapper(async (req, res) => {
    const result = await CreditService.claimReward(req.params.rewardId, req.user._id);
    res.status(200).json(new ApiResponse(200, result, 'Reward claimed successfully'));
  });
}

export default new CreditController();
