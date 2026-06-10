import { ApiError } from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    throw new ApiError(400, errorMessage);
  }
  next();
};

export default validate;
