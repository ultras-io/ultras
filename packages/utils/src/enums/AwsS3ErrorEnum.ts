enum AswS3ErrorEnum {
  /**
   * Parameter folder is missing.
   */
  folderMissing = 'folder-missing',

  /**
   * Parameter extension is missing.
   */
  extensionMissing = 'extension-missing',

  /**
   * Provided extension is not allowed.
   */
  extensionNotAllowed = 'extension-now-allowed',

  /**
   * AWS S3 service is not unavailable.
   */
  serviceUnavailable = 'service-unavailable',
}

export default AswS3ErrorEnum;
