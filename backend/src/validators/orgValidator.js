import Joi from 'joi';

const createOrgSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  description: Joi.string().required(),
});

const updateOrgSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  description: Joi.string(),
  // Allow and strip read-only/internal fields sent by the frontend
  _id: Joi.any().strip(),
  email: Joi.any().strip(),
  ownerId: Joi.any().strip(),
  isVerified: Joi.any().strip(),
  volunteers: Joi.any().strip(),
  createdAt: Joi.any().strip(),
  __v: Joi.any().strip(),
});

export { createOrgSchema, updateOrgSchema };
