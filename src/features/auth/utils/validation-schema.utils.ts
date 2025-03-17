import * as yup from 'yup';

export const loginSchema = yup.object({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  cedula: yup
    .string()
    .required('Cédula is required')
    .matches(/^\d{10}$/, 'Cédula must be exactly 10 digits')
}); 