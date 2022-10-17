import { SizeType } from 'native-base/lib/typescript/components/types';
import type { Asset } from 'react-native-image-picker';

export type ImageType = Asset;

export interface IImageItem {
  id: string;
  image: null | ImageType;
}

export interface ISize {
  width: number | SizeType;
  height: number | SizeType;
}

export interface IAttacheImageProps {
  title: string;
  multiple?: boolean;
  rounded?: boolean;
  size?: null | number | SizeType;
  onRemovePress?(): void;
}

export interface IImagePreviewProps {
  computedSize: ISize;
  imageItem: IImageItem;
  rounded: boolean;
  onRemove(id: string): void;
}

export interface ITapToAddProps {
  imageItem: IImageItem;
  onChoose(id: string, image: ImageType): void;
}
