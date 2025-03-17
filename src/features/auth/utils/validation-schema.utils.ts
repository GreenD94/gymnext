import * as yup from 'yup';

export const loginSchema = yup.object({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^04\d{2}-\d{7}$/, 'Phone number must be in format: 04XX-XXXXXXX'),
  cedula: yup
    .string()
    .required('Cédula is required')
    .matches(/^\d{1,7}$/, 'Cédula must be at most 7 digits')
}); 