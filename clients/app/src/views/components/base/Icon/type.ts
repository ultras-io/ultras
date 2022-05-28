import { IconNamesEnum } from 'assets/icons';
import { ColorKey } from 'themes/types';

export interface IIconProps {
  name: IconNamesEnum;
  color?: ColorKey;
  size?: number;
}
