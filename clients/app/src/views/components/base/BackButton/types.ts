import type { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import type { IFontSize } from 'native-base/lib/typescript/theme/base/typography';
import { ColorKey } from 'themes/types';

type CommonProps<T> = T & {
  action: 'close' | 'back';
  position?: 'left' | 'right';
  color?: ColorKey;
  onPress?(): void;
};

export type IconButtonProps = CommonProps<{
  type: 'icon';
  iconSize?: ThemeComponentSizeType<'Icon'>;
}>;

export type TextButtonProps = CommonProps<{
  type: 'text';
  fontSize?: IFontSize;
}>;

export type BothButtonProps = CommonProps<{
  type: 'both';
  iconSize?: ThemeComponentSizeType<'Icon'>;
  fontSize?: IFontSize;
}>;

export type ButtonProps = BothButtonProps | IconButtonProps | TextButtonProps;
