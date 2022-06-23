/* eslint-disable max-len */

/**
 * Validation rules:
 * 1) starts/ends with alphanumeric characters, numeric values or underscore (a-z, A-Z, _)
 * 2) contains alphanumeric characters, numeric values, underscore and dot
 * 3) total length of username must be between 5 and 30
 */
const pattern = /^[a-zA-Z0-9_][a-zA-Z0-9_.]{3,28}[a-zA-Z0-9_]$/;

/**
 * Validate username address.
 */
const validateUsername = (username: string): boolean => {
  if (!username) {
    return false;
  }

  return pattern.test(username);
};

export default validateUsername;
