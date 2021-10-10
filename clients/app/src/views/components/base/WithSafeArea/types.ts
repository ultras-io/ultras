import {ThemeInterface} from 'styled-components';

export interface IWithSafeAreaProps {
  theme?: ThemeInterface;
  children: React.ReactNode;
  disableSafeArea?: boolean;
}
