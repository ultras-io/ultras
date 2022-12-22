import { SizeType } from 'native-base/lib/typescript/components/types';
import type { Asset } from 'react-native-image-picker';

export type UploadStatusType = 'idle' | 'uploading' | 'success' | 'error';
export type ImageType = Asset;

export interface IImageItem {
  id: string;
  image: null | ImageType;
}

export interface ISize {
  width: number | SizeType;
  height: number | SizeType;
}

export interface IAttachImageProps {
  insideOfInputSection?: boolean;
  title?: string;
  multiple?: boolean;
  rounded?: boolean;
  centered?: boolean;
  size?: null | number | SizeType;
  initialImages?: Array<ImageType>;
  removable?: boolean;
  uploadStatuses?: Record<string, UploadStatusType>;
  onChange?(images: Array<IImageItem>): void;
}

export interface IImagePreviewProps {
  computedSize: ISize;
  imageItem: IImageItem;
  rounded: boolean;
  removable: boolean;
  uploadStatus: UploadStatusType;
  onRemove(id: string): void;
}

export interface ITapToAddProps {
  imageItem: IImageItem;
  onChoose(id: string, image: ImageType): void;
}
