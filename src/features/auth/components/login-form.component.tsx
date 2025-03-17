import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'
import { loginAction } from '../actions/login.action'
import { useTransition } from 'react'

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^04\d{2}-\d{7}$/, 'Invalid phone format (e.g., 0412-1234567)')
    .required('Phone is required'),
  identityNumber: Yup.string()
    .matches(/^\d{1,7}$/, 'Identity number must be up to 7 digits')
    .required('Identity number is required'),
})

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition()

  const formik = useFormik({
    initialValues: {
      phone: '',
      identityNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const result = await loginAction({
          phone: values.phone,
          identityNumber: values.identityNumber,
        })

        if (result?.error) {
          formik.setFieldError('phone', result.error)
        }
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        id="phone"
        name="phone"
        label="Phone"
        placeholder="0412-1234567"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        disabled={isPending}
      />
      <TextField
        fullWidth
        id="identityNumber"
        name="identityNumber"
        label="Identity Number"
        type="password"
        value={formik.values.identityNumber}
        onChange={formik.handleChange}
        error={formik.touched.identityNumber && Boolean(formik.errors.identityNumber)}
        helperText={formik.touched.identityNumber && formik.errors.identityNumber}
        disabled={isPending}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isPending}
      >
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
} 