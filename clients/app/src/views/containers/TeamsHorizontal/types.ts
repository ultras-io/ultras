import { ThemeInterface } from 'styled-components';

export interface ITeamsContainerProps {
  theme?: ThemeInterface;
  data: Array<any>; //@TODO
  withBounce?: boolean;
}

export interface ITeamsComponentProps {
  data: Array<any>; //@TODO
  withBounce: boolean;
  onPress: (id: string) => void;
}
