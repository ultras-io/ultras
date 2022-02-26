enum AswS3ErrorEnum {
  /**
   * Parameter folder is missing.
   */
  folderMissing = 'folder-missing',

  /**
   * Parameter folder name is unknown.
   */
  folderUnknown = 'folder-unknown',

  /**
   * Parameter extension is missing.
   */
  extensionMissing = 'extension-missing',

  /**
   * Provided extension is not allowed.
   */
  extensionNotAllowed = 'extension-not-allowed',

  /**
   * AWS S3 service is not unavailable.
   */
  serviceUnavailable = 'service-unavailable',
}

export default AswS3ErrorEnum;
