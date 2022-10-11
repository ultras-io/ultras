import type { Asset } from 'react-native-image-picker';

export type ImageType = Asset;

export interface IImageItem {
  id: string;
  image: null | ImageType;
}

export interface IAttacheImageProps {
  title: string;
  multiple?: boolean;
  rounded?: boolean;

  onRemovePress?(): void;
}

export interface IImagePreviewProps {
  imageItem: IImageItem;
  rounded: boolean;
  onRemove(id: string): void;
}

export interface ITapToAddProps {
  imageItem: IImageItem;
  onChoose(id: string, image: ImageType): void;
}
