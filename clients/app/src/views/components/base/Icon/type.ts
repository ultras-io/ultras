import { ThemeInterface } from 'styled-components';
import { IconNamesEnum } from 'assets/icons';
import { ColorKey } from 'themes/types';

export interface IIconProps {
  theme?: ThemeInterface;
  name: IconNamesEnum;
  color?: ColorKey;
  size?: number;
}
