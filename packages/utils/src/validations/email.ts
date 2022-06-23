/* eslint-disable max-len */

const pattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validate email address.
 */
const validateEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }

  return pattern.test(email.toLowerCase());
};

export default validateEmail;
