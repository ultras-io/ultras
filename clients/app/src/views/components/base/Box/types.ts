import { ThemeInterface } from 'styled-components';
import { ColorKey } from 'themes/styled';

export interface IBoxProps {
  theme: ThemeInterface;
  bgColor?: ColorKey;
  borderColor?: ColorKey;
}
