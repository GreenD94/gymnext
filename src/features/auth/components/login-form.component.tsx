'use client';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, TextField, CircularProgress } from '@mui/material'
import { LoginCredentials } from '../utils/auth.types'
import { useTranslations } from 'next-intl'

interface LoginFormProps {
  onSubmit: (values: LoginCredentials) => void
  isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const t = useTranslations('auth.login')

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      cedula: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .required(t('errors.phoneRequired'))
        .matches(/^\d{10}$/, t('errors.phoneFormat')),
      cedula: Yup.string()
        .required(t('errors.cedulaRequired'))
        .matches(/^\d{10}$/, t('errors.cedulaFormat')),
    }),
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '')
    formik.setFieldValue('phoneNumber', value)
  }

  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '')
    formik.setFieldValue('cedula', value)
  }

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <TextField
        fullWidth
        id="phoneNumber"
        name="phoneNumber"
        label={t('phoneNumber')}
        variant="outlined"
        value={formik.values.phoneNumber}
        onChange={handlePhoneChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        disabled={isLoading}
        inputProps={{
          maxLength: 10,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      <TextField
        fullWidth
        id="cedula"
        name="cedula"
        label={t('cedula')}
        type="password"
        variant="outlined"
        value={formik.values.cedula}
        onChange={handleCedulaChange}
        onBlur={formik.handleBlur}
        error={formik.touched.cedula && Boolean(formik.errors.cedula)}
        helperText={formik.touched.cedula && formik.errors.cedula}
        disabled={isLoading}
        inputProps={{
          maxLength: 10,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{
          mt: 2,
          height: 48,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : t('submit')}
      </Button>
    </Box>
  )
} 