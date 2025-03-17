'use client';

import { Box, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

export function PhoneInput({ value, onChange, error, helperText }: PhoneInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(11).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize with "04" in the first two positions
  useEffect(() => {
    if (digits[0] !== '0' || digits[1] !== '4') {
      const newDigits = [...digits];
      newDigits[0] = '0';
      newDigits[1] = '4';
      setDigits(newDigits);
      onChange(newDigits.join(''));
    }
  }, []);

  // Update digits when value prop changes
  useEffect(() => {
    if (value) {
      const newDigits = value.split('').slice(0, 11);
      while (newDigits.length < 11) newDigits.push('');
      setDigits(newDigits);
    }
  }, [value]);

  const handleDigitChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return; // Only allow digits

    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    onChange(newDigits.join(''));

    // Move to next input if a digit was entered
    if (digit && index < 10) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 1) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      {digits.map((digit, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleDigitChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={index < 2} // Disable first two inputs (04)
          inputProps={{
            maxLength: 1,
            style: { 
              textAlign: 'center',
              width: '2rem',
              padding: '0.5rem'
            }
          }}
          size="small"
          error={error}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& input': {
                p: 1
              }
            }
          }}
        />
      ))}
      {helperText && (
        <Box sx={{ width: '100%', mt: 1, color: error ? 'error.main' : 'text.secondary', fontSize: '0.75rem' }}>
          {helperText}
        </Box>
      )}
    </Box>
  );
} 