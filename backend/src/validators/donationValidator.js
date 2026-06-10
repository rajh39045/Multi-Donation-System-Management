import Joi from 'joi';

const createDonationSchema = Joi.object({
  itemType: Joi.string().valid('food', 'clothes', 'electronics', 'books', 'others').required(),
  description: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  pickupAddress: Joi.string().required(),
  pickupDate: Joi.date().required(),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'assigned', 'picked', 'picked_up', 'delivered', 'completed', 'cancelled').required(),
});

export { createDonationSchema, updateStatusSchema };
