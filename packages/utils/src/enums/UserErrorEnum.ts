enum UserErrorEnum {
  /**
   * Verification code is not a valid.
   */
  invalidVerificationCode = 'invalid-verification-code',

  /**
   * Username already taken.
   */
  usernameTaken = 'username-taken',

  /**
   * Email address already taken.
   */
  emailTaken = 'email-taken',

  /**
   * Phone number already taken.
   */
  phoneTaken = 'phone-taken',

  /**
   * Email address is incorrect.
   */
  incorrectEmail = 'incorrect-email',

  /**
   * Phone number is incorrect.
   */
  incorrectPhone = 'incorrect-phone',

  /**
   * Email address or phone number is required.
   */
  requiredEmailOrPhone = 'email-phone-required',

  /**
   * Unknown error rejected.
   */
  unknown = 'unknown-error',
}

export default UserErrorEnum;
