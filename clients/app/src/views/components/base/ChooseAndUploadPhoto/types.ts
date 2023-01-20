import { AwsS3FolderEnum } from '@ultras/utils';
import { IAttachImageProps } from 'views/components/compositions/AttachImage';

export interface IChooseAndUploadPhotoProps extends Omit<IAttachImageProps, 'onChange'> {
  folder: AwsS3FolderEnum;
  onUploadStart?(): void;
  onChange(newImages: Array<string>, oldImages: Array<string>): void;
}
