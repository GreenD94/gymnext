'use client';

import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { PhoneInput } from './phone-input.component';
import { usePhoneValidation } from '../hooks/use-phone-validation.hook';

export function PhoneInputExample() {
  const [phone, setPhone] = useState('');
  const { error, helperText, validatePhone } = usePhoneValidation();

  // Validate on mount to ensure "04" is set
  useEffect(() => {
    validatePhone(phone);
  }, []);

  // Validate on phone change
  useEffect(() => {
    validatePhone(phone);
  }, [phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhone(phone)) {
      console.log('Valid phone number:', phone);
      // Handle form submission
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        maxWidth: '600px'
      }}
    >
      <PhoneInput
        value={phone}
        onChange={setPhone}
        error={error}
        helperText={helperText}
      />
      <Button 
        type="submit" 
        variant="contained"
        disabled={error || phone.length !== 11}
      >
        Submit
      </Button>
    </Box>
  );
} 