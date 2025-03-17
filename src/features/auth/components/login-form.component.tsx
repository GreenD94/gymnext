import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/validation-schema.utils';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Phone, Badge } from '@mui/icons-material';

interface LoginFormData {
  phoneNumber: string;
  cedula: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
}

export const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        Welcome Back
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" mb={4}>
        Please enter your credentials to continue
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          placeholder="04XX-XXXXXXX"
          {...register('phoneNumber')}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="cedula"
          label="Cédula"
          placeholder="Enter your cédula"
          {...register('cedula')}
          error={!!errors.cedula}
          helperText={errors.cedula?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>
    </Paper>
  );
}; 