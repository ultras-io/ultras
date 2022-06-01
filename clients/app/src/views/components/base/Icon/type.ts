import { IconNamesEnum } from 'assets/icons';
import { ColorKey } from 'themes/types';
import { InterfaceIconProps } from 'native-base/lib/typescript/components/primitives/Icon/types';

export interface IIconProps extends Omit<InterfaceIconProps, 'name' | 'color'> {
  color?: ColorKey;
  name: IconNamesEnum;
}
