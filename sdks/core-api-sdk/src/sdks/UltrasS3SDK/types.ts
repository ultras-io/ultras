export type FileBinaryType = any;

export interface ISigningUrlParams {
  folder: string;
  extension: string;
}

export interface IUploadViaSignedUrlParams {
  file: FileBinaryType;
  signedUrl: string;
  mimeType: string;
}

export interface IUploadParams {
  file: FileBinaryType;
  fileName: string;
  folder: string;
}
