/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Uzbekistan format: +998XXXXXXXXX)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+998[0-9]{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * Must be at least 8 characters
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Validate full name (at least 2 words)
 */
export const isValidFullName = (name: string): boolean => {
  return name.trim().split(' ').length >= 2 && name.trim().length >= 3;
};

/**
 * Validate OTP code (6 digits)
 */
export const isValidOtp = (code: string): boolean => {
  return /^\d{6}$/.test(code);
};

/**
 * Get validation error message
 */
export const getValidationError = (
  field: string,
  value: string
): string | null => {
  switch (field) {
    case 'email':
      return isValidEmail(value) ? null : 'Please enter a valid email address';
    case 'phone':
      return isValidPhone(value)
        ? null
        : 'Please enter a valid phone number (+998XXXXXXXXX)';
    case 'password':
      return isValidPassword(value)
        ? null
        : 'Password must be at least 8 characters';
    case 'fullName':
      return isValidFullName(value)
        ? null
        : 'Please enter your full name';
    case 'otp':
      return isValidOtp(value) ? null : 'Please enter a valid 6-digit code';
    default:
      return null;
  }
};
