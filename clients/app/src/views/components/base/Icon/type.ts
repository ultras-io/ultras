import {ThemeInterface} from 'styled-components';
import {IconNamesEnum} from 'assets/icons';
import {ColorKey} from 'themes/styled';

export interface IIconProps {
  theme?: ThemeInterface;
  name: IconNamesEnum;
  color?: ColorKey;
  size?: number;
}
