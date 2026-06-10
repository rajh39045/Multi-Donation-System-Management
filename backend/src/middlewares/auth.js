import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import UserRepository from '../repositories/UserRepository.js';
import AuthService from '../services/AuthService.js';

export const protect = asyncWrapper(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, AuthService.getJwtSecret());

    req.user = await UserRepository.findById(decoded.id);

    if (!req.user) {
      throw new ApiError(404, 'No user found with this id');
    }

    next();
  } catch (err) {
    throw new ApiError(401, 'Not authorized to access this route');
  }
});

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `User role ${req.user.role} is not authorized to access this route`
      );
    }
    next();
  };
};
