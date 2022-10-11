export interface ISigningUrlParams {
  folder: string;
  extension: string;
}

export interface IUploadViaSignedUrlParams {
  file: File;
  signedUrl: string;
}

export interface IUploadParams {
  file: File;
  folder: string;
}
