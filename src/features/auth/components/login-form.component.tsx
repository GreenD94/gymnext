import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'
import { LoginCredentials } from '../utils/auth.types'

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^04\d{2}-\d{7}$/, 'Invalid phone format (e.g., 0412-1234567)')
    .required('Phone is required'),
  cedula: Yup.string()
    .matches(/^\d{1,7}$/, 'Identity number must be up to 7 digits')
    .required('Identity number is required'),
})

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>
  isLoading: boolean
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      cedula: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit({
        phoneNumber: values.phoneNumber,
        cedula: values.cedula,
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        placeholder="0412-1234567"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        disabled={isLoading}
      />
      <TextField
        fullWidth
        id="cedula"
        name="cedula"
        label="Cédula"
        type="password"
        value={formik.values.cedula}
        onChange={formik.handleChange}
        error={formik.touched.cedula && Boolean(formik.errors.cedula)}
        helperText={formik.touched.cedula && formik.errors.cedula}
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
} 