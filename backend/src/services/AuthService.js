import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import OrganizationRepository from '../repositories/OrganizationRepository.js';
import { ApiError } from '../utils/ApiError.js';

class AuthService {
  getJwtSecret() {
    return process.env.JWT_SECRET || 'dev-jwt-secret';
  }

  getRefreshJwtSecret() {
    return process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
  }

  getJwtExpire() {
    return process.env.JWT_EXPIRE || '7d';
  }

  getRefreshJwtExpire() {
    return process.env.JWT_REFRESH_EXPIRE || '30d';
  }

  async register(userData) {
    const userExists = await UserRepository.findOne({ email: userData.email });
    if (userExists) {
      throw new ApiError(400, 'User already exists');
    }
    const user = await UserRepository.create(userData);

    // If role is organization, create an organization profile
    if (userData.role === 'organization') {
      await OrganizationRepository.create({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        description: 'Organization registered via platform.',
        ownerId: user._id,
        isVerified: userData.isVerified ?? true,
      });
    }

    const token = this.generateToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);
    
    user.refreshToken = refreshToken;
    await user.save();

    return { user, token, refreshToken };
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await user.matchPassword(password))) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = this.generateToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, token, refreshToken };
  }

  async refreshToken(token) {
    if (!token) throw new ApiError(401, 'Refresh Token is required');
    
    try {
      const decoded = jwt.verify(token, this.getRefreshJwtSecret());
      const user = await UserRepository.findById(decoded.id);

      if (!user || user.refreshToken !== token) {
        throw new ApiError(403, 'Invalid Refresh Token');
      }

      const newToken = this.generateToken(user._id);
      const newRefreshToken = this.generateRefreshToken(user._id);

      user.refreshToken = newRefreshToken;
      await user.save();

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new ApiError(403, 'Invalid Refresh Token');
    }
  }

  generateToken(id) {
    return jwt.sign({ id }, this.getJwtSecret(), {
      expiresIn: this.getJwtExpire(),
    });
  }

  generateRefreshToken(id) {
    return jwt.sign({ id }, this.getRefreshJwtSecret(), {
      expiresIn: this.getRefreshJwtExpire(),
    });
  }
}

export default new AuthService();
