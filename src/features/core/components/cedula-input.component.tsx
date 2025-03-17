'use client';

import { Box, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';

interface CedulaInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export function CedulaInput({ value, onChange, error, helperText, disabled }: CedulaInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(10).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update digits when value prop changes
  useEffect(() => {
    if (value) {
      const newDigits = value.split('').slice(0, 10);
      while (newDigits.length < 10) newDigits.push('');
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
    if (digit && index < 9) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
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
          disabled={disabled}
          type="password"
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
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
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