export interface SigningUrlParamsInterface {
  folder: string;
  extension: string;
}

export interface UploadViaSignedUrlParamsInterface {
  file: File;
  signedUrl: string;
}

export interface UploadParamsInterface {
  file: File;
  folder: string;
}
