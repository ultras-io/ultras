/* eslint-disable max-len */

const pattern = /^\+[\d\s]+$/;

/**
 * Validate phone number.
 */
const validatePhone = (phone: string): boolean => {
  if (!phone) {
    return false;
  }

  return pattern.test(phone);
};

export default validatePhone;
