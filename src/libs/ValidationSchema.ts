import * as yup from 'yup';

export const ProductSchema = yup.object().shape({
  customer: yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
  }),
  paymentMethod: yup.object().shape({
    type: yup.string().optional(),
    cardNumber: yup
      .string()
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, 'Invalid card number')
      .required('Card number is required')
      .max(16),
    expirationDate: yup
      .string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date')
      .required('Expiration date is required'),
    cvv: yup
      .string()
      .matches(/^\d{3}$/, 'Invalid CVV')
      .required('CVV is required'),
  }),
});

export type CheckoutFormData = yup.InferType<typeof ProductSchema>;

export default ProductSchema;
