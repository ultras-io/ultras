import { ThemeInterface } from 'styled-components';

export interface IFourDigitsInputProps {
  theme?: ThemeInterface;
  onFill: (code: string) => void;
}
