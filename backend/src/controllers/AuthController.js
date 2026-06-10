import AuthService from '../services/AuthService.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

class AuthController {
  register = asyncWrapper(async (req, res) => {
    const result = await AuthService.register(req.body);
    res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
  });

  login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.status(200).json(new ApiResponse(200, result, 'Login successful'));
  });

  refresh = asyncWrapper(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await AuthService.refreshToken(refreshToken);
    res.status(200).json(new ApiResponse(200, result, 'Token refreshed successfully'));
  });

  getMe = asyncWrapper(async (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, 'User profile fetched'));
  });
}

export default new AuthController();
