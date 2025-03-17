import { useState, useCallback } from 'react';

interface UsePhoneValidationReturn {
  isValid: boolean;
  error: boolean;
  helperText: string;
  validatePhone: (phone: string) => boolean;
}

export function usePhoneValidation(): UsePhoneValidationReturn {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const validatePhone = useCallback((phone: string): boolean => {
    // Check if phone starts with 04
    if (!phone.startsWith('04')) {
      setError(true);
      setHelperText('Phone number must start with 04');
      return false;
    }

    // Check if phone has exactly 11 digits
    if (phone.length !== 11) {
      setError(true);
      setHelperText('Phone number must be 11 digits');
      return false;
    }

    // Check if phone contains only digits
    if (!/^\d+$/.test(phone)) {
      setError(true);
      setHelperText('Phone number must contain only digits');
      return false;
    }

    setError(false);
    setHelperText('');
    return true;
  }, []);

  return {
    isValid: !error,
    error,
    helperText,
    validatePhone
  };
}
 