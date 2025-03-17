'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, CircularProgress } from '@mui/material';
import { LoginCredentials } from '../utils/auth.types';
import { PhoneInput } from '@/features/core/components/phone-input.component';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { createUser } from '../actions/create-user.action';

interface CreateUserFormProps {
  onSuccess: (credentials: LoginCredentials) => void;
}

export function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      phoneNumber: '04',
      cedula: '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^04\d{9}$/, 'Phone must be 11 digits starting with 04'),
      cedula: Yup.string()
        .required('Cedula is required')
        .matches(/^\d{5,10}$/, 'Cedula must be between 5 and 10 digits'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await createUser(values);
        
        if (!result.success) {
          throw new Error(result.error);
        }

        // Call onSuccess with the credentials
        onSuccess(values);
        
        // Reset form
        formik.resetForm();
        
      } catch (err) {
        console.error('Error creating user:', err);
        setError(err instanceof Error ? err.message : 'Failed to create user');
      } finally {
        setIsLoading(false);
      }
    },
  });

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
      <PhoneInput
        value={formik.values.phoneNumber}
        onChange={(value) => formik.setFieldValue('phoneNumber', value)}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber ? formik.errors.phoneNumber : undefined}
      />
      
      <TextField
        fullWidth
        id="cedula"
        name="cedula"
        label="Cedula"
        type="password"
        variant="outlined"
        value={formik.values.cedula}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '').trim();
          const truncatedValue = value.slice(0, 10);
          formik.setFieldValue('cedula', truncatedValue);
        }}
        onBlur={formik.handleBlur}
        error={formik.touched.cedula && Boolean(formik.errors.cedula)}
        helperText={formik.touched.cedula && formik.errors.cedula}
        disabled={isLoading}
        inputProps={{
          maxLength: 10,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          minLength: 5
        }}
      />

      {error && (
        <Box sx={{ color: 'error.main', mt: 1, fontSize: '0.875rem' }}>
          {error}
        </Box>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Create User'}
      </Button>
    </Box>
  );
} 