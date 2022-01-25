enum AuthSignupErrorEnum {
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
   * Unknown error rejected.
   */
  unknown = 'unknown-error',
}

export default AuthSignupErrorEnum;
