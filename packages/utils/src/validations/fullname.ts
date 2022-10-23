/* eslint-disable max-len */

const pattern = /^[a-zA-Z'\-\s]+$/;

/**
 * Validate fullname.
 */
const validateFullname = (fullname: string): boolean => {
  if (!fullname) {
    return false;
  }

  return pattern.test(fullname.toLowerCase());
};

export default validateFullname;
