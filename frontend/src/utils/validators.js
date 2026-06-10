import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  role: yup.string().oneOf(['donor', 'organization', 'volunteer'], 'Invalid role').required('Role is required'),
});

export const donationSchema = yup.object().shape({
  itemType: yup.string().oneOf(['food', 'clothes', 'books', 'medicines', 'other']).required('Item type is required'),
  description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
  quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
  pickupAddress: yup.string().required('Pickup address is required'),
  pickupDate: yup.date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Pickup date must be today or in the future')
    .required('Pickup date is required'),
});
